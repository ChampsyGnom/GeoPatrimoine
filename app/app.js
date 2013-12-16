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
        'GeoPatrimoine.view.template.PanelTemplateTree',
        'GeoPatrimoine.view.template.PanelTemplateList'
    ],
    models: ['lang.Lang', 'lang.LangResource', 'user.User'],
    stores: ['GeoPatrimoine.store.LangResource', 'User'],
    controllers: ['User'],
    init: function (application) {
        console.log("init");
     
    }

    ,
    launch: function ()
    {
        GeoPatrimoine.updateAdminComponentsVisibility = function () {
            var adminComponents = Ext.ComponentQuery.query("[isNonAdminHidden=true]");
            var funcSetVisibility = null;
            if (GeoPatrimoine.user === undefined)
            { funcSetVisibility = function (item) { item.hide(); }; }
            else if (Ext.isEmpty(GeoPatrimoine.user))
            { funcSetVisibility = function (item) { item.hide(); }; }
            else if (GeoPatrimoine.user.isGeoPatrimoineAdministrator() === false)
            { funcSetVisibility = function (item) { item.hide(); }; }
            else
            { funcSetVisibility = function (item) { item.show(); }; }
            for (var i = 0 ; i < adminComponents.length; i++) {
                funcSetVisibility(adminComponents[i]);
            }
        };
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