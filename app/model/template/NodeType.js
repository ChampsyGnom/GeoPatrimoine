Ext.define('GeoPatrimoine.model.template.NodeType', {
    idProperty: 'id',
    extend: 'Ext.data.Model',
    fields: [
         { name: 'id', type: 'int', mapping: 'id', useNull: true, defaultValue: null },
         { name: 'display_name', type: 'string', defaultValue: 'Nouveau modèle', mapping: 'display_name' },
        
    ],
    proxy:
    {
        pageParam: false,
        startParam: false,
        limitParam: false,
        batchActions: true,
        appendId: false,
        batchOrder: 'destroy,create,update',
        noCache: false,
        type: 'rest',
        url: './data/rest-service.php',
        extraParams: {
            schemaName: 'public',
            tableName: 'node_type',
            source: 'database',
            output: 'json',
            childTables: Ext.JSON.encode([])
        },
        reader: {
            type: 'json',
            model: 'GeoPatrimoine.model.template.NodeType',
            root: 'datas',
            idProperty: 'id',
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message'

        }
    }
});