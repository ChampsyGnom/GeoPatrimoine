Ext.define('GeoPatrimoine.model.user.Preference', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo'],
    fields: [
         { name: 'id', type: 'int', mapping: 'id', useNull: true, defaultValue: null },    
         { name: 'property', type: 'string', mapping: 'property' },
         { name: 'value', type: 'string', mapping: 'value' },
         { name: 'user__id', type: 'int', mapping: 'user__id' },
         { name: 'node__id', type: 'int', mapping: 'node__id' ,useNull :true}
    ],
  
    proxy:
    {
        pageParam: false,
        startParam: false,
        limitParam: false,
        appendId: false,
        batchActions: true,
        batchOrder: 'destroy,create,update',
        noCache: false,
        type: 'rest',
        url: './data/rest-service.php',
        extraParams: {
            source: 'database',
            output: 'json',
            schemaName: 'public',
            tableName: 'preference',
            childTables: Ext.JSON.encode(
                [
                   
                ]
            )
        },

        reader: {
            type: 'json',
            model: 'GeoPatrimoine.model.user.Preference',
            root: 'datas',
            idProperty: 'id',
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message'

        }
    }
});