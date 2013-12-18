Ext.define('GeoPatrimoine.store.NodeType', {
    extend: 'Ext.data.Store',
    requires: 'GeoPatrimoine.model.template.NodeType',
    model: 'GeoPatrimoine.model.template.NodeType',
    autoLoad: false,
    listeners: {
        beforeload: function (store, operation, eOpts)
        {
            var proxy = store.getProxy();
            proxy.extraParams.token = GeoPatrimoine.user.data.token;
        }
    }
   
});