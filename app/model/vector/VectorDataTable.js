Ext.define('GeoPatrimoine.model.vector.VectorDataTable', {
    extend: 'Ext.data.Model',

    fields: [
         { name: 'name', type: 'string', mapping: 'name', useNull: true, defaultValue: null },
         { name: 'display_name', type: 'string', mapping: 'display_name', useNull: true, defaultValue: null },
         { name: 'epsg', type: 'string', mapping: 'epsg', useNull: true, defaultValue: null }

    ]

});