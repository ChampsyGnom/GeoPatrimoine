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
                    if (GeoPatrimoine.template !== null && GeoPatrimoine.user.isGeoPatrimoineAdministrator()) {

                      menuItems.push(
                      {
                          text: 'Creer un sous-dossier',
                          handler: function ()
                          { panelTreeTemplate.fireEvent('addFolderClick', record.data.itemId); },
                          iconCls: 'menu-folder-add'
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


                        contextMenu = new Ext.menu.Menu({
                            items: [
                                {
                                    text: 'Nouveau dossier', handler: function () {
                                        panelTreeTemplate.fireEvent('addFolderClick');
                                    },
                                    iconCls: 'menu-folder-add'
                                },
                                {
                                    text: 'Nouvelle couche', handler: function () {
                                        panelTreeTemplate.fireEvent('addLayerClick');
                                    }, iconCls: 'menu-layer-add'
                                },
                                {
                                    text: 'Modifier l\'ordre des couches', handler: function () {
                                        panelTreeTemplate.fireEvent('editLayerOrderClick');
                                    }, iconCls: 'menu-layer-order'
                                }
                            ]
                        });

                      
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
    buildTreeNodes: function ()
    {
        var treePanel = this.down("treepanel");
        var rootNode = treePanel.getRootNode();
        rootNode.removeAll();
        this.recurseBuildTreeNodes(null, rootNode);

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
                else {
                   // var checkedPref = eCarto.loggedUser.getPreferenceValue(item.data.id, 'checked');
                   // var checked = checkedPref === 'true';
                    node = parentNode.appendChild({
                        text: item.data.display_name,
                        leaf: true,
                        checked: false
                    });
                    node.data.itemId = item.data.id;

                }
            }
        });

    }
});
    
