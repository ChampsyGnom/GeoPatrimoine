Ext.define('GeoPatrimoine.model.vector.VectorDataColumn', {
    extend: 'Ext.data.Model',

    fields: [
         { name: 'name', type: 'string', mapping: 'name', useNull: true, defaultValue: null },
         { name: 'display_name', type: 'string', mapping: 'display_name', useNull: true, defaultValue: null },
        { name: 'data_type', type: 'string', mapping: 'data_type', useNull: true, defaultValue: null }

    ]

});