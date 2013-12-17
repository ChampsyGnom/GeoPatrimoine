Ext.define('GeoPatrimoine.controller.User', {
    extend: 'Ext.app.Controller',
    views: ['user.WindowLogin'],
    refs: [{
        ref: 'MainPanel',
        selector: 'viewport #main-panel'
    }, {
        ref: 'TxtUserName',
        selector: 'viewport panelheader #txt-user-name'
    }],
    init: function () {

        this.control(
           {
               'windowlogin #buttton-connect': { click: this.onWindowLoginButtonOkClick },
               'panelheader #button-disconnect': { click: this.onPanelHeaderButtonDisconnectClick }
           }
       );
    },
    onPanelHeaderButtonDisconnectClick: function () {
        Ext.util.Cookies.clear('user');
        Ext.util.Cookies.clear('password');
        this.getTxtUserName().setText("Non authentifié");
        GeoPatrimoine.user = null;
        GeoPatrimoine.updateAdminComponentsVisibility();
        this.autoLogin();

    },
    onWindowLoginButtonOkClick: function (button) {
        var me = this;
        var windowLogin = button.up("windowlogin");
        var formLogin = windowLogin.down("form");
        var valuesLogin = formLogin.getValues();
        var md5Password = GeoPatrimoine.util.MD5.hex_md5(valuesLogin.user_password);
        this.login(valuesLogin.user_name, md5Password, function (user) {
            if (valuesLogin.chk_auto_login === 'on') {
                var now = new Date();
                var expiry = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
                Ext.util.Cookies.set('user', valuesLogin.user_name, expiry);
                Ext.util.Cookies.set('password', md5Password, expiry);

            }
            GeoPatrimoine.user = user;
            me.getTxtUserName().setText(GeoPatrimoine.user.data.first_name + ' ' + GeoPatrimoine.user.data.name);
            GeoPatrimoine.updateAdminComponentsVisibility();
            windowLogin.close();
            me.getMainPanel().show();
        }, function () {


        });

    },
    autoLogin: function () {
        var me = this;
        var windowLogin;
        var cookieUser = Ext.util.Cookies.get('user');
        var cookiePassword = Ext.util.Cookies.get('password');
        if (!Ext.isEmpty(cookieUser) && !Ext.isEmpty(cookiePassword)) {
            this.login(cookieUser, cookiePassword, function (user) {
                GeoPatrimoine.user = user;
                me.getTxtUserName().setText(GeoPatrimoine.user.data.first_name + ' ' + GeoPatrimoine.user.data.name);
                GeoPatrimoine.updateAdminComponentsVisibility();
                me.getMainPanel().show();
            }, function () {

                windowLogin = Ext.create('GeoPatrimoine.view.user.WindowLogin');
                windowLogin.show();
                me.getMainPanel().hide();

            });
        }
        else {
            me.getMainPanel().hide();
            windowLogin = Ext.create('GeoPatrimoine.view.user.WindowLogin');
            windowLogin.show();
        }
    },

    login: function (login, password, successCallback, failureCallback) {
        var me = this;
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
              value: 'md5_' + password
          }]);

        storeUser.load(
        {
            callback: function (records, operation, success) {
                if (success && records.length === 1) {

                    successCallback(records[0]);
                }
                else {
                    var win = Ext.Msg.show({
                        title: GeoPatrimoine.lang.WindowLoginErrorAuthentificationMessageTitle,
                        msg: GeoPatrimoine.lang.WindowLoginErrorAuthentificationMessageContent,
                        buttons: Ext.Msg.OK
                    });

                    failureCallback();

                }
            }
        });
    }
});