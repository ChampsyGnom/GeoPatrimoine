Ext.application({
    name: 'GeoPatrimoine',
    autoCreateViewport: false,
    requires: [
        'GeoPatrimoine.view.header.PanelHeader',
        'GeoPatrimoine.view.user.WindowLogin'
    ],
    models: ['Lang', 'LangResource'],
    stores: ['GeoPatrimoine.store.LangResource'],
    controllers: [],
    init: function (application) {
        console.log("init");
     
    }

    ,
    launch: function ()
    {
        var storeManager = Ext.data.StoreManager;
        console.log("launch");
        var storeLangResource = storeManager.lookup('GeoPatrimoine.store.LangResource');
        storeLangResource.load(
            {
                callback: function ()
                {
                    Ext.create('GeoPatrimoine.view.Viewport');
                    var windowLogin = Ext.create('GeoPatrimoine.view.user.WindowLogin');
                    windowLogin.show();
                }
            }
            );
       
       
        console.log(window.location);


    }

});