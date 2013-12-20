Ext.define('GeoPatrimoine.model.vector.VectorDataTable', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo', 'GeoPatrimoine.model.vector.VectorDataColumn'],
    fields: [
         { name: 'database_name', type: 'string', mapping: 'name', useNull: true, defaultValue: null },
         { name: 'name', type: 'string', mapping: 'name', useNull: true, defaultValue: null },
         { name: 'display_name', type: 'string', mapping: 'display_name', useNull: true, defaultValue: null },
         { name: 'epsg', type: 'string', mapping: 'epsg', useNull: true, defaultValue: null }

    ],
    associations: [

        {
            type: 'hasMany',
            foreignKey: 'table_name',
            primaryKey: 'name',
            associationKey: 'columns',
            name: 'columns',
            model: 'GeoPatrimoine.model.vector.VectorDataColumn'
        }
    ],

});