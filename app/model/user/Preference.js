Ext.define('eCarto.model.Preference', {
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
    /*
    associations: [

        {
            type: 'hasMany',
            foreignKey: 'style__id',
            primaryKey: 'id',
            associationKey: 'rules',
            name: 'rules',
            model: 'MAP.model.Rule'
        }
    ],*/
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
        url: './data/rest.php',
        extraParams: {
            schemaName: 'public',
            tableName: 'preference',
            childTables: Ext.JSON.encode(
                [
                   
                ]
            )
        },

        reader: {
            type: 'json',
            model: 'MAP.model.Preference',
            root: 'datas',
            idProperty: 'id',
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message'

        }
    }
});