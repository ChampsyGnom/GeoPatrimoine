Ext.define('GeoPatrimoine.controller.User', {
    extend: 'Ext.app.Controller',
    views: ['user.WindowLogin'],
    refs: [],
    init: function () {

        this.control(
           {
               'windowlogin #buttton-connect': { click: this.onWindowLoginButtonOkClick }
           }
       );
    },
    onWindowLoginButtonOkClick: function(button)
    {
        var windowLogin = button.up("windowlogin");
        var formLogin = windowLogin.down("form");
        var valuesLogin = formLogin.getValues();
        this.login(valuesLogin.user_name, valuesLogin.user_password);
    },
    login: function (login, password)
    {
        var storeUser = Ext.data.StoreManager.lookup('User');
        storeUser.getProxy().extraParams.isLogin = true;
        storeUser.getProxy().extraParams.login = login;
        storeUser.getProxy().extraParams.password = GeoPatrimoine.util.MD5.hex_md5(password);
        storeUser.load();
    }

});