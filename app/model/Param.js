Ext.define('GeoPatrimoine.model.Param', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo'],
    fields: [
         { name: 'id', type: 'int', mapping: 'id', useNull: true, defaultValue: null },
         { name: 'node__id', type: 'int', mapping: 'node__id' },
         { name: 'property', type: 'string', mapping: 'property' },
         { name: 'value', type: 'string', mapping: 'value' }
    ],
    proxy:
    {
        pageParam: false,
        startParam: false,
        batchActions: true,
        batchOrder:'destroy,create,update',
        limitParam: false,
        noCache: false,
        appendId: false,
        type: 'rest',
        url: './data/rest.php',
        extraParams: {
            schemaName: 'public',
            tableName: 'param',
            childTables: Ext.JSON.encode([])
        },
        reader: {
            type: 'json',
            model: 'GeoPatrimoine.model.Param',
            root: 'datas',
            idProperty: 'id',
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message'

        }
    }
});