Ext.define('eCarto.model.Node', {
    requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo', 'eCarto.model.Param'],
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
         { name: 'id', type: 'int', mapping: 'id', useNull: true, defaultValue: null },
         { name: 'display_name', type: 'string', defaultValue: 'Nouvelle couche', mapping: 'display_name' },
         { name: 'template__id', type: 'int', mapping: 'template__id' },         
         { name: 'parent_id', type: 'int', mapping: 'parent_id', useNull: true, defaultValue: null },
         { name: 'node_type__id', type: 'int', mapping: 'node_type__id',  useNull: true,defaultValue: null },
         { name: 'tree_order', type: 'int', mapping: 'tree_order', defaultValue: 999 },
         { name: 'map_order', type: 'int', mapping: 'map_order', defaultValue: -1 },
         { name: 'tile_source', type: 'string', defaultValue: null, mapping: 'tile_source', useNull: true },
         { name: 'tile_source_xyz_url', type: 'string', defaultValue: null, mapping: 'tile_source_xyz_url', useNull: true },
         { name: 'tile_source_wms_url', type: 'string', defaultValue: null, mapping: 'tile_source_wms_url', useNull: true },
         { name: 'tile_source_wms_layer', type: 'string', defaultValue: null, mapping: 'tile_source_wms_layer', useNull: true },
         { name: 'epsg', type: 'string', defaultValue: '4326', mapping: 'epsg', useNull: true },
         { name: 'postgre_db_id', type: 'string', defaultValue: null, mapping: 'postgre_db_id', useNull: true },
         { name: 'postgre_db_schema', type: 'string', defaultValue: null, mapping: 'postgre_db_schema', useNull: true },
         { name: 'postgre_db_table', type: 'string', defaultValue: null, mapping: 'postgre_db_table', useNull: true },
         { name: 'postgre_db_column_id', type: 'string', defaultValue: null, mapping: 'postgre_db_column_id', useNull: true },
         { name: 'postgre_db_column_geom', type: 'string', defaultValue: null, mapping: 'postgre_db_column_geom', useNull: true },
         { name: 'min_resolution', type: 'int', mapping: 'min_resolution', defaultValue:0,  useNull: true},
         { name: 'max_resolution', type: 'int', mapping: 'max_resolution', defaultValue: 1000000, useNull: true },
         { name: 'brightness', type: 'int', mapping: 'brightness', defaultValue: 0, useNull: false },
         { name: 'contrast', type: 'int', mapping: 'contrast', defaultValue: 100, useNull: false },
         { name: 'hue', type: 'int', mapping: 'hue', defaultValue: 0, useNull: false },
         { name: 'opacity', type: 'int', mapping: 'opacity', defaultValue: 100, useNull: false },
         { name: 'saturation', type: 'int', mapping: 'opacity', defaultValue: 100, useNull: false },
         { name: 'view_table_position', type: 'string', mapping: 'view_table_position', defaultValue: 'tab', useNull: true },
         { name: 'view_table_columns', type: 'string', defaultValue: null, mapping: 'view_table_columns', useNull: true },
         { name: 'view_form_columns', type: 'string', defaultValue: null, mapping: 'view_form_columns', useNull: true },
         { name: 'view_tooltip_columns', type: 'string', defaultValue: null, mapping: 'view_tooltip_columns', useNull: true },
         { name: 'view_template_columns', type: 'string', defaultValue: null, mapping: 'view_template_columns', useNull: true }
    ],
   
    associations: [
             
       {
           type: 'hasMany',
           foreignKey: 'node__id',
           primaryKey: 'id',
           associationKey: 'params',
           name: 'params',
           model: 'eCarto.model.Param'
       },
         {
             type: 'hasMany',
             foreignKey: 'node__id',
             primaryKey: 'id',
             associationKey: 'styles',
             name: 'styles',
             model: 'eCarto.model.Style'
         }
    ],
    proxy:
    {
        pageParam: false,
        startParam: false,
        limitParam: false,
        batchActions: true,
        batchOrder: 'destroy,create,update',
        noCache: false,
        appendId : false,
        type: 'rest',
        url: './data/rest.php',
        extraParams: {
            schemaName: 'public',
            tableName: 'node',
            childTables: Ext.JSON.encode([])
        },
        reader: {
            type: 'json',
            model: 'eCarto.model.Node',
            root: 'datas',
            idProperty: 'id',
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message'

        }
    }
});