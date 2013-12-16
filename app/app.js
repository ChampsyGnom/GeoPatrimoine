Ext.application({
    name: 'GeoPatrimoine',
    autoCreateViewport: false,
    requires: [
        'GeoPatrimoine.view.header.PanelHeader',
        'GeoPatrimoine.view.user.WindowLogin',
        'GeoPatrimoine.util.MD5',
        'GeoPatrimoine.view.map.ToolbarMap',
        'GeoPatrimoine.view.map.PanelMap',
        'GeoPatrimoine.view.search.PanelSearch',
        'GeoPatrimoine.view.template.PanelTemplate'
    ],
    models: ['Lang', 'LangResource', 'user.User'],
    stores: ['GeoPatrimoine.store.LangResource', 'User'],
    controllers: ['User'],
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
                    GeoPatrimoine.getApplication().getController('User').autoLogin();
                   
                    
                }
            }
            );
       
       
        console.log(window.location);


    }

});