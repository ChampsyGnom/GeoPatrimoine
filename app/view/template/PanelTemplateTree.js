Ext.define('GeoPatrimoine.view.template.PanelTemplateTree', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.paneltemplatetree',
    layout:'fit',
    items: [
        {

            xtype: 'treepanel',
            
            viewConfig: {              
             
                plugins: {
                    allowContainerDrops: true,
                    ptype: 'treeviewdragdrop'              
                    
                   
                },
                listeners: {
                    drop: function (node, data, overModel, dropPosition) {
                        this.up("paneltemplatetree").saveTreeNodes();
                        
                    },
                    notifyDrop: function (dragSource, event, data) {
                        console.log(dragSource);
                    },
                    notifyOver: function (dragSource, event, data) {
                        console.log(dragSource);
                    },
                    beforedrop: function (node, data, overModel, dropPosition, dropHandlers, eOpts) {
                        return true;

                    }
                }
            },
            rootVisible:false,
            listeners:
            {
                checkchange: function (node, checked, eOpts)
                {
                    if (checked)
                    { GeoPatrimoine.user.setPreferenceValue(node.data.itemId, "checked", "true", false); }
                    else
                    { GeoPatrimoine.user.setPreferenceValue(node.data.itemId, "checked", "false", false); }
                    
                    GeoPatrimoine.user.preferences().sync(
                        {
                            success: function ()
                            {
                                GeoPatrimoine.getApplication().fireEvent('mapLayerVisibilityChange');
                            },
                            failure: function ()
                            { }
                        }
                        );
                },
                itemcollapse : function( treeNode, eOpts )
                {
                    if (GeoPatrimoine.user !== undefined && GeoPatrimoine.user !== null)
                    {
                        GeoPatrimoine.user.setPreferenceValue(treeNode.data.itemId, "expanded", "false", false);
                        GeoPatrimoine.user.preferences().sync();
                    }
                },
                itemexpand: function (treeNode, eOpts)
                {
                    if (GeoPatrimoine.user !== undefined && GeoPatrimoine.user !== null) {
                        GeoPatrimoine.user.setPreferenceValue(treeNode.data.itemId, "expanded", "true", false);
                        GeoPatrimoine.user.preferences().sync();
                    }
                },
                containercontextmenu: function (tree, e, eOpts) {
                    e.stopEvent();
                    var panelTreeTemplate = tree.up("paneltemplatetree");
                    if (GeoPatrimoine.template !== null && GeoPatrimoine.user.isGeoPatrimoineAdministrator()) {
                        var contextMenu = new Ext.menu.Menu({
                            items: [
                                {
                                    text: 'Nouveau dossier', handler: function () {
                                        panelTreeTemplate.fireEvent('addFolderClick',null);
                                    },
                                    iconCls: 'menu-folder-add'
                                },
                                {
                                    text: 'Nouvelle couche', handler: function () {
                                        panelTreeTemplate.fireEvent('addLayerClick', null);
                                    }, iconCls: 'menu-layer-add'
                                },
                                {
                                    text: 'Modifier l\'ordre des couches', handler: function () {
                                        panelTreeTemplate.fireEvent('editLayerOrderClick');
                                    }, iconCls: 'menu-layer-order'
                                }
                            ]
                        });
                        contextMenu.showAt(e.getXY());
                    }

                },
                itemcontextmenu: function ( tree, record, item, index, e, eOpts ) {
                    e.stopEvent();
                    var contextMenu = null;
                    var panelTreeTemplate = tree.up("paneltemplatetree");
                    var menuItems = [];
                    var nodeRecord = GeoPatrimoine.template.getNodeById(record.data.itemId);
                    if (GeoPatrimoine.template !== null && GeoPatrimoine.user.isGeoPatrimoineAdministrator()) {

                        if (nodeRecord.data.node_type__id === 1)
                        {
                            menuItems.push(
                            {
                                text: 'Nouveau dossier',
                                handler: function ()
                                { panelTreeTemplate.fireEvent('addFolderClick', record.data.itemId); },
                                iconCls: 'menu-folder-add'
                            });
                            menuItems.push(
                           {
                               text: 'Nouvelle couche',
                               handler: function ()
                               { panelTreeTemplate.fireEvent('addLayerClick', record.data.itemId); },
                               iconCls: 'menu-layer-add'
                           });
                            menuItems.push({
                                xtype:'menuseparator'
                            });
                            menuItems.push(
                            {
                                text: 'Modifier ce dossier',
                                handler: function ()
                                { panelTreeTemplate.fireEvent('editFolderClick', record.data.itemId); },
                                iconCls: 'menu-folder-edit'
                            });
                            menuItems.push(
                            {
                                text: 'Supprimer ce dossier',
                                handler: function ()
                                { panelTreeTemplate.fireEvent('deleteFolderClick', record.data.itemId); },
                                iconCls: 'menu-folder-delete'
                            });

                        }
                        if (nodeRecord.data.node_type__id === 4)
                        {
                            menuItems.push(
                           {
                               text: 'Zoomer sur cette couche',
                               handler: function ()
                               { panelTreeTemplate.fireEvent('zoomLayerClick', record.data.itemId); },
                               iconCls: 'menu-layer-zoom'
                           });
                            menuItems.push(
                            {
                                text: 'Modifier cette couche',
                                handler: function ()
                                { panelTreeTemplate.fireEvent('editLayerClick', record.data.itemId); },
                                iconCls: 'menu-layer-edit'
                            });
                            menuItems.push(
                            {
                                text: 'Supprimer cette couche',
                                handler: function ()
                                { panelTreeTemplate.fireEvent('deleteLayerClick', record.data.itemId); },
                                iconCls: 'menu-layer-delete'
                            });
                        }
                        if (nodeRecord.data.node_type__id === 3) {
                            menuItems.push(
                           {
                               text: 'Zoomer sur cette couche',
                               handler: function ()
                               { panelTreeTemplate.fireEvent('zoomLayerClick', record.data.itemId); },
                               iconCls: 'menu-layer-zoom'
                           });
                            menuItems.push(
                            {
                                text: 'Modifier cette couche',
                                handler: function ()
                                { panelTreeTemplate.fireEvent('editLayerClick', record.data.itemId); },
                                iconCls: 'menu-layer-edit'
                            });
                            menuItems.push(
                            {
                                text: 'Supprimer cette couche',
                                handler: function ()
                                { panelTreeTemplate.fireEvent('deleteLayerClick', record.data.itemId); },
                                iconCls: 'menu-layer-delete'
                            });
                        }

                       

                      
                    }
                    if (menuItems.length > 0)
                    {
                        
                        contextMenu = new Ext.menu.Menu({
                            items: menuItems
                        });
                        contextMenu.showAt(e.getXY());

                    }
                }
            }

        }
    ],
    initComponent: function (config) {

        this.callParent(arguments);
        GeoPatrimoine.getApplication().on('selectedTemplateChange',this.onSelectedTemplateChange,this);
        GeoPatrimoine.getApplication().on('templateHierarchyChange', this.onTemplateHierarchyChange, this);
        this.addEvents('editLayerOrderClick', 'addLayerClick', 'addFolderClick', 'deleteFolderClick', 'editFolderClick');
    },
    onSelectedTemplateChange: function ()
    {
        this.buildTreeNodes();
    },
    onTemplateHierarchyChange: function ()
    {
        this.buildTreeNodes();
    },
    saveTreeNodes: function ()
    {
        var treePanel = this.down("treepanel");
        var rootNode = treePanel.getRootNode();
        this.recurseSaveTreeNode(rootNode);
        GeoPatrimoine.template.nodes().getProxy().extraParams.token = GeoPatrimoine.user.data.token;
        GeoPatrimoine.template.nodes().sync();
        console.log('save node hierarchy');
    },
    recurseSaveTreeNode : function(parentNode)
    {
        var me = this;
        parentNode.eachChild(function (child) {
            if (child.data.itemId !== undefined && child.data.itemId !== null)
            {
                var record = GeoPatrimoine.template.getNodeById(child.data.itemId);
                if (parentNode.data.itemId !== undefined && parentNode.data.itemId !== null)
                { record.data.parent_id = parentNode.data.itemId; }
                else
                { record.data.parent_id = null; }
                record.data.tree_order = parentNode.indexOf(child);
                record.setDirty();
                me.recurseSaveTreeNode(child);
            }
        });
    },
    buildTreeNodes: function ()
    {

        var treePanel = this.down("treepanel");
        var rootNode = treePanel.getRootNode();
        rootNode.removeAll();
        if (GeoPatrimoine.template !== null)
        {
            GeoPatrimoine.template.nodes().sort("tree_order", "ASC");
            this.recurseBuildTreeNodes(null, rootNode);
        }
      
        // sort by tree order
    },
    recurseBuildTreeNodes: function (parentId,parentNode)
    {
        var me = this;
        var node = null;
        if (GeoPatrimoine.template === null) return;
        GeoPatrimoine.template.nodes().each(function (item) {
            if (item.data.parent_id === parentId) {
                if (item.data.node_type__id === 1) {
                    var expandedPref = GeoPatrimoine.user.getPreferenceValue(item.data.id, 'expanded');
                    var expanded = expandedPref === 'true';
                     node = parentNode.appendChild({
                        text: item.data.display_name,
                        leaf: false,
                        expanded: expanded

                    });
                    node.data.itemId = item.data.id;
                    me.recurseBuildTreeNodes( item.data.id,node);
                }
                else if (item.data.node_type__id === 2) {
                    var checkedPref = GeoPatrimoine.user.getPreferenceValue(item.data.id, 'checked');
                    var checked = checkedPref === 'true';
                    node = parentNode.appendChild({
                        text: item.data.display_name,
                        leaf: true,
                        checked: checked
                    });
                    node.data.itemId = item.data.id;
                }
                else
                {
                    var checkedPref = GeoPatrimoine.user.getPreferenceValue(item.data.id, 'checked');
                     var checked = checkedPref === 'true';
                    node = parentNode.appendChild({
                        text: item.data.display_name,
                        leaf: true,
                        checked: checked
                    });
                    node.data.itemId = item.data.id;

                }
            }
        });

    }
});
    
