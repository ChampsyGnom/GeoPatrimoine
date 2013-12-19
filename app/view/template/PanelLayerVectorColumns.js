Ext.define('GeoPatrimoine.view.template.PanelLayerVectorColumns', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.panellayervectorcolumns',
    layout: {
        type: 'hbox',
        align:'stretch'
    },
    height: 600,
    width: 600,
    fillColumnsIfHiddenFieldIsSet : function()
    {
        var gridSrc = this.down("#grid-columns-src");
        var gridDst = this.down("#grid-columns-dst");
        var hiddenFieldValue = this.down("#hidden-columns-field").getValue();
        var srcCount = gridSrc.getStore().getCount();
        var dstCount = gridDst.getStore().getCount();
        if (Ext.isEmpty(hiddenFieldValue) === false && srcCount > 0 && dstCount === 0)
        {
            var values = hiddenFieldValue.split(";");
            // mieux vaut lister toutes les colonnes
            var items = [];
            for (var i = 0 ; i < values.length; i++)
            {
                var item = null;
                gridSrc.getStore().each(function (iterItem) {
                    if (iterItem.data.name === values[i])
                    { item = iterItem; }
                });
                if (item !== null)
                {
                    items.push(item);
                   
                }
            }
            for (var i = 0 ; i < items.length; i++)
            {
                gridDst.getStore().add(items[i]);
                gridSrc.getStore().remove(items[i]);
            }
          
        }
    },
    getColumns : function()
    {
        var values = [];
        var gridDst = this.down("#grid-columns-dst");
        gridDst.getStore().each(function (item) {
            values.push(item.data.name);
        });
        return values.join(";");
    },
    updateHiddenFieldValue : function()
    {
        var gridDst = this.down("#grid-columns-dst");
        var columnNames = [];
        gridDst.getStore().each(function (item) {
            columnNames.push(item.data.name);
        });
        this.down("#hidden-columns-field").setValue(columnNames.join(";"));
    },
    updateButtonsStates : function()
    {
        console.log("updateButtonsStates");
        var gridSrc = this.down("#grid-columns-src");
        var gridDst = this.down("#grid-columns-dst");
        var selectionSrc = gridSrc.getSelectionModel().getSelection();
        var selectionDst = gridDst.getSelectionModel().getSelection();
        var btAddAll = this.down("#bt-add-all");
        var btAdd= this.down("#bt-add");
        var btRemoveAll = this.down("#bt-remove-all");
        var btRemove = this.down("#bt-remove");

        var btTop = this.down("#bt-move-top");
        var btUp = this.down("#bt-move-up");
        var btDown = this.down("#bt-move-down");
        var btBottom =  this.down("#bt-move-bottom");


        btAddAll.disable();
        btAdd.disable();
        btRemoveAll.disable();
        btRemove.disable();

        btTop.disable();
        btUp.disable();
        btDown.disable();
        btBottom.disable();

        if (selectionSrc !== null && selectionSrc.length === 1 && gridSrc.getStore().getCount() > 0)
        {
            btAdd.enable();

        }
        if (gridSrc.getStore().getCount() > 0) {
            btAddAll.enable();
        }
        if (selectionDst !== null && selectionDst.length === 1 &&  gridDst.getStore().getCount() > 0) {
            btRemove.enable();

        }
        if (gridDst.getStore().getCount() > 0) {
            btRemoveAll.enable();
        }

        if (selectionDst !== null && selectionDst.length === 1 && gridDst.getStore().getCount() > 0)
        {
            var index = gridDst.getStore().indexOf(selectionDst[0]);
            if (index > 0)
            {
                btTop.enable();
                btUp.enable();
            }
            if (index < (gridDst.getStore().getCount() -1)) {
                btDown.enable();
                btBottom.enable();
            }
        }
    },
    initComponent: function (config) {
        var me = this;
        console.log(config);
        this.items = [
            {
                xtype: 'hiddenfield',
                itemId:'hidden-columns-field',
                name: me.nameHiddenField
            },
         {
             xtype: 'gridpanel',            
             width: 140,             
             itemId:'grid-columns-src',
             height: 400,
             margin: 2,
             border: true,
             forcefit: true,
             listeners: {
                 selectionchange: function (grid, selected, eOpts)
                 {
                     this.up("panellayervectorcolumns").updateButtonsStates();
                 }
             },
             store: Ext.create('Ext.data.Store', {
                 model: 'GeoPatrimoine.model.vector.VectorDataColumn',
                 listeners: {
                     clear: function (store, eOpts)
                     {
                         me.updateButtonsStates();
                     },
                     add: function (store, records, index, eOpts) {
                         me.updateButtonsStates();                         
                     }
                 }
             }),
             columns: [{ text: 'Colonnes excluses', dataIndex: 'name', menuDisabled: true, sortable: false, groupable: false, hideable: false,width:140 }]
             
         },
         {
             xtype: 'panel',             
             height: 400,
             margin: '18 2 2 2',
             layout: {
                 type: 'vbox',            
                 pack: 'center',
                 align:'middle'
             },
             items: [
                 {
                     xtype: 'button',
                     text: 'Tout ajouter',
                     itemId:'bt-add-all',
                     width: 80,
                     margin: 4,
                     handler: function ()
                     {
                         var gridSrc = this.up("panellayervectorcolumns").down("#grid-columns-src");
                         var gridDst = this.up("panellayervectorcolumns").down("#grid-columns-dst");
                         var selectionSrc = gridSrc.getSelectionModel().getSelection();
                         var selectionDst = gridDst.getSelectionModel().getSelection();
                         gridSrc.getStore().each(function (item) {
                             gridDst.getStore().add(item);
                         });
                         gridSrc.getStore().removeAll();                         
                      
                         if (selectionDst.length === 0)
                         {
                             gridDst.getSelectionModel().select(gridDst.getStore().getAt(0));
                         }
                         this.up("panellayervectorcolumns").updateButtonsStates();
                         this.up("panellayervectorcolumns").updateHiddenFieldValue();
                     }
                 },
                 {
                     xtype: 'button',
                     text: 'Ajouter',
                     itemId: 'bt-add',
                     width: 80,
                     margin: 4,
                     handler: function () {
                         var gridSrc = this.up("panellayervectorcolumns").down("#grid-columns-src");
                         var gridDst = this.up("panellayervectorcolumns").down("#grid-columns-dst");
                         var selectionSrc = gridSrc.getSelectionModel().getSelection();
                         var selectionDst = gridDst.getSelectionModel().getSelection();
                         var record = selectionSrc[0];
                         var index = gridSrc.getStore().indexOf(record);
                         gridDst.getStore().add(record);
                         gridSrc.getStore().remove(record);
                         if (gridSrc.getStore().getCount() > 0)
                         {
                             var nextSelectedRecord = gridSrc.getStore().getAt(index);
                             if (nextSelectedRecord === undefined)
                             { nextSelectedRecord = gridSrc.getStore().getAt(index - 1); }
                             gridSrc.getSelectionModel().select(nextSelectedRecord);
                         }
                         if (selectionDst.length === 0) {
                             gridDst.getSelectionModel().select(gridDst.getStore().getAt(0));
                         }
                         this.up("panellayervectorcolumns").updateButtonsStates();
                         this.up("panellayervectorcolumns").updateHiddenFieldValue();
                     }
                 },
                  {
                      xtype: 'button',
                      text: 'Retirer',
                      itemId: 'bt-remove',
                      width: 80,
                      margin: 4,
                      handler: function () {
                          var gridSrc = this.up("panellayervectorcolumns").down("#grid-columns-src");
                          var gridDst = this.up("panellayervectorcolumns").down("#grid-columns-dst");
                          var selectionSrc = gridSrc.getSelectionModel().getSelection();
                          var selectionDst = gridDst.getSelectionModel().getSelection();
                          var record = selectionDst[0];

                          
                          var index = gridDst.getStore().indexOf(record);
                          gridSrc.getStore().add(record);
                          gridDst.getStore().remove(record);
                          if (gridDst.getStore().getCount() > 0) {
                              var nextSelectedRecord = gridDst.getStore().getAt(index);
                              if (nextSelectedRecord === undefined)
                              { nextSelectedRecord = gridDst.getStore().getAt(index - 1); }
                              gridDst.getSelectionModel().select(nextSelectedRecord);
                          }

                          if (selectionSrc.length === 0) {
                              gridSrc.getSelectionModel().select(gridSrc.getStore().getAt(0));
                          }
                          this.up("panellayervectorcolumns").updateButtonsStates();
                          this.up("panellayervectorcolumns").updateHiddenFieldValue();
                      }
                  },
                  {
                      xtype: 'button',
                      text: 'Tout retirer',
                      itemId: 'bt-remove-all',
                      width: 80,
                      margin: 4,
                      handler: function () {
                          var gridSrc = this.up("panellayervectorcolumns").down("#grid-columns-src");
                          var gridDst = this.up("panellayervectorcolumns").down("#grid-columns-dst");
                          var selectionSrc = gridSrc.getSelectionModel().getSelection();
                          var selectionDst = gridDst.getSelectionModel().getSelection();
                          gridDst.getStore().each(function (item) {
                              gridSrc.getStore().add(item);
                          });
                          gridDst.getStore().removeAll();
                          if (selectionSrc.length === 0) {
                              gridSrc.getSelectionModel().select(gridSrc.getStore().getAt(0));
                          }
                          this.up("panellayervectorcolumns").updateButtonsStates();
                          this.up("panellayervectorcolumns").updateHiddenFieldValue();
                      }
                  }


             ]
         },
          {
              xtype: 'gridpanel',
              margin: 2,
              itemId: 'grid-columns-dst',
              border:true,
              forcefit: true,
              listeners: {
                  selectionchange: function (grid, selected, eOpts) {
                      this.up("panellayervectorcolumns").updateButtonsStates();
                  }
              },
              store: Ext.create('Ext.data.Store', {
                  model: 'GeoPatrimoine.model.vector.VectorDataColumn',
                  listeners: {
                      clear: function (store, eOpts) {
                          me.updateButtonsStates();
                          
                      },
                      add: function (store, records, index, eOpts) {
                          me.updateButtonsStates();
                      }
                  }
              }),
              columns: [{ text: 'Colonnes incluses', dataIndex: 'name', menuDisabled: true, sortable: false, groupable: false, hideable: false, width: 140 }],
              width: 140,
              height: 400
          },
          {
              xtype: 'panel',
              margin: '18 2 2 2',
              height: 400,              
              layout: {
                  type: 'vbox',                  
                  pack: 'center',
                  align: 'middle'
              },
              items: [
                  {
                      xtype: 'button',
                      text: 'En haut',
                      itemId: 'bt-move-top',
                      width: 80,
                      margin: 4,
                      handler: function () {
                         
                          var gridDst = this.up("panellayervectorcolumns").down("#grid-columns-dst");                    
                          var selectionDst = gridDst.getSelectionModel().getSelection();
                          if (selectionDst.length === 1)
                          {
                              var selectedRecord = selectionDst[0];
                              var index = gridDst.getStore().indexOf(selectedRecord);
                              if (index > 0)
                              {
                                  gridDst.getStore().remove(selectedRecord);
                                  gridDst.getStore().insert(0, selectedRecord);
                                  gridDst.getSelectionModel().select(selectedRecord);
                              }
                          }
                         

                          this.up("panellayervectorcolumns").updateButtonsStates();
                      }
                  },
                  {
                      xtype: 'button',
                      text: 'Monter',
                      itemId: 'bt-move-up',
                      width: 80,
                      margin: 4,
                      handler: function () {

                          var gridDst = this.up("panellayervectorcolumns").down("#grid-columns-dst");
                          var selectionDst = gridDst.getSelectionModel().getSelection();
                          if (selectionDst.length === 1) {
                              var selectedRecord = selectionDst[0];
                              var index = gridDst.getStore().indexOf(selectedRecord);
                              if (index > 0) {
                                  gridDst.getStore().remove(selectedRecord);
                                  gridDst.getStore().insert(index-1, selectedRecord);
                                  gridDst.getSelectionModel().select(selectedRecord);
                              }
                          }


                          this.up("panellayervectorcolumns").updateButtonsStates();
                      }
                  },
                   {
                       xtype: 'button',
                       text: 'Descendre',
                       itemId: 'bt-move-down',
                       width: 80,
                       margin: 4,
                       handler: function () {

                           var gridDst = this.up("panellayervectorcolumns").down("#grid-columns-dst");
                           var selectionDst = gridDst.getSelectionModel().getSelection();
                           if (selectionDst.length === 1) {
                               var selectedRecord = selectionDst[0];
                               var index = gridDst.getStore().indexOf(selectedRecord);
                               if (index < (gridDst.getStore().getCount() -1 )) {
                                   gridDst.getStore().remove(selectedRecord);
                                   gridDst.getStore().insert(index+ 1, selectedRecord);
                                   gridDst.getSelectionModel().select(selectedRecord);
                               }
                           }


                           this.up("panellayervectorcolumns").updateButtonsStates();
                       }
                   },
                   {
                       xtype: 'button',
                       itemId: 'bt-move-bottom',
                       text: 'En bas',
                       width: 80,
                       margin: 4,
                       handler: function () {

                           var gridDst = this.up("panellayervectorcolumns").down("#grid-columns-dst");
                           var selectionDst = gridDst.getSelectionModel().getSelection();
                           if (selectionDst.length === 1) {
                               var selectedRecord = selectionDst[0];
                               var index = gridDst.getStore().indexOf(selectedRecord);
                               if (index < (gridDst.getStore().getCount() - 1)) {
                                   gridDst.getStore().remove(selectedRecord);
                                   gridDst.getStore().insert(gridDst.getStore().getCount(), selectedRecord);
                                   gridDst.getSelectionModel().select(selectedRecord);
                               }
                           }


                           this.up("panellayervectorcolumns").updateButtonsStates();
                       }
                   }


              ]
          }
        
        ];       

        this.callParent(arguments);



    }
});

