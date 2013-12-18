Ext.define('GeoPatrimoine.store.WfsVectorDataTable', {
    extend: 'Ext.data.Store',
    requires: 'GeoPatrimoine.model.vector.VectorDataTable',
    model: 'GeoPatrimoine.model.vector.VectorDataTable',
    autoLoad: false,
    proxy:
    {
        disableCaching: false,
        type: 'ajax',
        url: './data/wfs-proxy.php',
        extraParams: {
            url: null
        },
        reader: {
            type: 'json',
            model: 'GeoPatrimoine.model.vector.VectorDataTable',
            root: 'datas',
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message'

        }
    }

});