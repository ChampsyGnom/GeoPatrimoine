Ext.define('eCarto.model.NodeType', {
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
        url: './data/rest.php',
        extraParams: {
            schemaName: 'public',
            tableName: 'node_type',
            childTables: Ext.JSON.encode([])
        },
        reader: {
            type: 'json',
            model: 'eCarto.model.NodeType',
            root: 'datas',
            idProperty: 'id',
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message'

        }
    }
});