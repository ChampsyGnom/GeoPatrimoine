Ext.define('GeoPatrimoine.controller.User', {
    extend: 'Ext.app.Controller',
    views: ['user.WindowLogin'],
    refs: [{
        ref: 'MainPanel',
        selector: 'viewport #main-panel'
    }],
    init: function () {

        this.control(
           {
               'windowlogin #buttton-connect': { click: this.onWindowLoginButtonOkClick },
               'panelheader #button-disconnect': { click: this.onPanelHeaderButtonDisconnectClick }
           }
       );
    },
    onPanelHeaderButtonDisconnectClick: function ()
    {
        Ext.util.Cookies.clear('user');
        Ext.util.Cookies.clear('password');
        this.autoLogin();

    },
    autoLogin: function ()
    {
        var me = this;
        var windowLogin;
        var cookieUser = Ext.util.Cookies.get('user');
        var cookiePassword = Ext.util.Cookies.get('password');
        if (!Ext.isEmpty(cookieUser) && !Ext.isEmpty(cookiePassword)) {
            this.login(cookieUser, cookiePassword, function () {
                me.getMainPanel().show();
            }, function () {
              
                windowLogin = Ext.create('GeoPatrimoine.view.user.WindowLogin');
                windowLogin.show();
                me.getMainPanel().hide();

            });
        }
        else
        {
            me.getMainPanel().hide();
            windowLogin = Ext.create('GeoPatrimoine.view.user.WindowLogin');
            windowLogin.show();
        }
    },
    onWindowLoginButtonOkClick: function(button)
    {
        var me = this;
        var windowLogin = button.up("windowlogin");
        var formLogin = windowLogin.down("form");
        var valuesLogin = formLogin.getValues();
        var md5Password = GeoPatrimoine.util.MD5.hex_md5(valuesLogin.user_password);
        this.login(valuesLogin.user_name, md5Password, function () {
            if (valuesLogin.chk_auto_login === 'on')
            {
                var now = new Date();
                var expiry = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
                Ext.util.Cookies.set('user', valuesLogin.user_name, expiry);
                Ext.util.Cookies.set('password', md5Password, expiry);
            }
            windowLogin.close();
            me.getMainPanel().show();          
        }, function () {           
            windowLogin.close();
            me.getMainPanel().hide();
            windowLogin = Ext.create('GeoPatrimoine.view.user.WindowLogin');
            windowLogin.show();
        });
       
    },
    login: function (login, password,successCallback,failureCallback)
    {
        var storeUser = Ext.data.StoreManager.lookup('User');
        storeUser.clearFilter();
        storeUser.addFilter([new Ext.util.Filter(
            {
                property: 'login',
                value: login
            })]);
        storeUser.addFilter([
          {
              property: 'password',
              value: 'md5_'+ password
          }]);
     
        storeUser.load(
        {
            callback: function(records, operation, success) {                
                if (success && records.length === 1) {
                    GeoPatrimoine.user = records[0];
                    successCallback();
                }
                else {                 
                    Ext.Msg.alert(
                        GeoPatrimoine.model.Lang.langViewWindowLoginErrorAuthentificationMessageTitle,
                        GeoPatrimoine.model.Lang.langViewWindowLoginErrorAuthentificationMessageContent);
                    failureCallback();
                }
                
            }
            
        });
    }

});