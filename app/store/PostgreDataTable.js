Ext.define('GeoPatrimoine.store.PostgreDataTable', {
    extend: 'Ext.data.Store',
    requires: 'GeoPatrimoine.model.vector.VectorDataTable',
    model: 'GeoPatrimoine.model.vector.VectorDataTable',
    autoLoad: false,
    listeners: {
        beforeload: function (store, operation, eOpts) {
            var proxy = store.getProxy();
            proxy.extraParams.token = GeoPatrimoine.user.data.token;

        }
    },
    proxy:
    {
        pageParam: false,
        startParam: false,
        limitParam: false,
        appendId: false,
        noCache: false,
        type: 'rest',
        url: './data/rest-service.php',
        extraParams: {
            source: 'database',
            output: 'json',
            isMetaData: true,
            scope: 'table'
        },
        reader: {
            type: 'json',
            model: 'GeoPatrimoine.model.vector.VectorDataTable',
            root: 'datas',
            idProperty: 'id',
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message'

        }
    }

});