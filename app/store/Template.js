Ext.define('GeoPatrimoine.store.Template', {
    extend: 'Ext.data.Store',
    requires: 'GeoPatrimoine.model.template.Template',
    model: 'GeoPatrimoine.model.template.Template',
    autoLoad: false,
    sorters: [{ property: 'display_name' }],
    listeners: {
        beforeload: function (store, operation, eOpts) {
            var proxy = store.getProxy();
            proxy.extraParams.token = GeoPatrimoine.user.data.token;
        }
        
    }

});