Ext.define('GeoPatrimoine.model.template.Template', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo', 'GeoPatrimoine.model.template.Node'],
    fields: [
         { name: 'id', type: 'int', mapping: 'id', useNull: true, defaultValue: null },
         { name: 'display_name', type: 'string', defaultValue: 'Nouveau modèle', mapping: 'display_name' },
         { name: 'epsg', type: 'string', defaultValue: '3857', mapping: 'epsg' },
         { name: 'center_x', type: 'float', defaultValue: 0, mapping: 'center_x' },
         { name: 'center_y', type: 'float', defaultValue: 0, mapping: 'center_y' },
    ],
    associations: [

        {
            type: 'hasMany',
            foreignKey: 'template__id',
            primaryKey: 'id',
            associationKey: 'nodes',
            name: 'nodes',
            model: 'GeoPatrimoine.model.template.Node'
        }
    ],
    proxy:
    {
        pageParam: false,
        startParam: false,
        limitParam: false,
        noCache: false,
        appendId: false,
        type: 'rest',
        url: './data/rest-service.php',
        extraParams: {
            schemaName: 'public',
            tableName: 'template',
            source: 'database',
            output: 'json',
            childTables: Ext.JSON.encode(
                [
                    {
                        tableName: 'node',
                        childTables: [
                            {
                                tableName: 'param',
                                childTables: []
                            },
                            {
                                tableName: 'style',
                                childTables: [
                                    {
                                        tableName: 'rule',
                                        childTables: []
                                    },
                                    {
                                        tableName: 'label',
                                        childTables: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            )
        },
        reader: {
            type: 'json',
            model: 'GeoPatrimoine.model.template.Template',
            root: 'datas',
            idProperty: 'id',
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message'

        }
    },
    getNextTreeOrder: function (parentNodeId)
    {
        var maxTreeOrder = 0;
        var hasChild = false;
        if (parentNodeId === undefined)
        { parentNodeId = null; }
        this.nodes().each(function (node) {
            if (node.data.parent_id === parentNodeId)
            {
                hasChild = true;
                if (node.data.tree_order > maxTreeOrder)
                { maxTreeOrder = node.data.tree_order; }
            }
        });
        if (hasChild)
        { return maxTreeOrder + 1; }
        else { return 0;}
      
    },
    getNodeById: function (nodeId)
    {
        var findNode = null;
        this.nodes().each(function (node) {
            if (node.data.id === nodeId) findNode = node;
        });
        return findNode;
    }
});