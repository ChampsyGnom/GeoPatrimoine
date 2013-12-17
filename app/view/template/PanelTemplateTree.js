Ext.define('GeoPatrimoine.view.template.PanelTemplateTree', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.paneltemplatetree',
    layout:'fit',
    items: [
        {
            xtype: 'treepanel',
            rootVisible:false,
            listeners:
            {
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
                    var panelTreeTemplate = tree.up("paneltemplatetree");
                    var menuItems = [];
                    if (GeoPatrimoine.template !== null && GeoPatrimoine.user.isGeoPatrimoineAdministrator()) {

                      menuItems.push(
                      {
                          text: 'Créer un sous-dossier',
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


                        var contextMenu = new Ext.menu.Menu({
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
                        var contextMenu = new Ext.menu.Menu({
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
        GeoPatrimoine.getApplication().on('templateHierarchyChange', this.onTemplateHierarchyChange,this);
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
        if (GeoPatrimoine.template === null) return;
        GeoPatrimoine.template.nodes().each(function (item) {
            if (item.data.parent_id === parentId) {
                if (item.data.node_type__id === 1) {
                   // var expandedPref = eCarto.loggedUser.getPreferenceValue(item.data.id, 'expanded');
                  //  var expanded = expandedPref === 'true';
                    var node = parentNode.appendChild({
                        text: item.data.display_name,
                        leaf: false,
                        expanded: false

                    });
                    node.data.itemId = item.data.id;
                    me.recurseBuildTreeNodes( item.data.id,node);
                }
                else {
                   // var checkedPref = eCarto.loggedUser.getPreferenceValue(item.data.id, 'checked');
                   // var checked = checkedPref === 'true';
                    var node = parentNode.appendChild({
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
    
