Ext.define('GeoPatrimoine.model.WfsLayer', {
    extend: 'Ext.data.Model',
   
    fields: [
         { name: 'Name', type: 'string', mapping: 'Name', useNull: true, defaultValue: null },
         { name: 'Title', type: 'string', mapping: 'Title', useNull: true, defaultValue: null },
         { name: 'SRS', type: 'string', mapping: 'SRS', useNull: true, defaultValue: null }
        
    ],
    proxy:
    {
        disableCaching: false,
        type: 'ajax',
        url: './data/wfs-proxy.php',
        extraParams: {
            url:null
            
        },
        reader: {
            type: 'json',
            model: 'GeoPatrimoine.model.WfsLayer',
            root: 'datas',         
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message'

        }
    }
});