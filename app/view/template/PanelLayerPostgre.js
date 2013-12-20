Ext.define('GeoPatrimoine.view.template.PanelLayerPostgre', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.panellayerpostgre',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
    getValues : function()
    {
        var values = {};
        var panelVectorColums = this.query("panellayervectorcolumns");
        for (var i = 0 ; i < panelVectorColums.length; i++)
        {
            var panelVectorColum = panelVectorColums[i];
            if (panelVectorColum.name !== undefined && panelVectorColum.name !== null)
            {
                values[panelVectorColum.name] = panelVectorColum.getColumns();
            }
        }
        return values;
    },
    loadVectorDataTableColumn : function(recordVectorDataTable)
    {
        var panelLayerVectorColumns = this.query("panellayervectorcolumns");
        for (var i = 0 ; i < panelLayerVectorColumns.length; i++) {
            var panelLayerVectorColumn = panelLayerVectorColumns[i];
            var srcStore = panelLayerVectorColumn.down("#grid-columns-src").getStore();
            var dstStore = panelLayerVectorColumn.down("#grid-columns-dst").getStore();
            dstStore.removeAll();
            srcStore.removeAll();
           
            var columns = [];
            recordVectorDataTable.columns().each(function (column) {
                columns.push(column);              
            });
            srcStore.loadData(columns);
            panelLayerVectorColumn.fillColumnsIfHiddenFieldIsSet();
        }
       
    },
    initComponent: function (config) {
        this.items = [
          {
              xtype: 'combobox',
              fieldLabel: 'Base de donnée',
              itemId: 'combo-postgre-db',
              name: 'postgre_db_id',
              editable: true,
              margin: 2,
              width: 386,
              allowBlank: false,
              labelWidth: 140,             
              displayField: 'name',
              valueField: 'display_name',
              store: 'PostgreDataBase',
              listeners: {
                  change: function (combo, newValue, oldValue, eOpts) {
                      var panelPostgre = this.up("panellayerpostgre");
                      var comboSchema = panelPostgre.down("#combo-postgre-schema");
                      comboSchema.disable();
                      comboSchema.setValue(null);

                      if (Ext.isEmpty(newValue) === false)
                      {
                          comboSchema.getStore().getProxy().extraParams.database_name = newValue;
                          comboSchema.enable();
                          comboSchema.getStore().load();
                      }
                      
                  }
              }

          },
          {
              xtype: 'combobox',
              fieldLabel: 'Schéma',
              itemId: 'combo-postgre-schema',
              name: 'postgre_db_schema',
              editable: true,
              disabled : true,
              margin: 2,
              width: 386,
              allowBlank: false,
              labelWidth: 140,
              displayField: 'name',          
              valueField: 'display_name',
              store: Ext.create('GeoPatrimoine.store.PostgreDataSchema'),
              listeners: {
                 
                  change: function (combo, newValue, oldValue, eOpts) {
                      var panelPostgre = this.up("panellayerpostgre");
                      var comboBase = panelPostgre.down("#combo-postgre-db");
                      var comboSchema = panelPostgre.down("#combo-postgre-schema");
                      var comboTable = panelPostgre.down("#combo-postgre-table");
                      comboTable.disable();
                      comboTable.setValue(null);
                      if (Ext.isEmpty(newValue) === false) {
                          comboTable.getStore().getProxy().extraParams.database_name = comboBase.getValue();
                          comboTable.getStore().getProxy().extraParams.schema_name = newValue;
                          comboTable.enable();
                          comboTable.getStore().load();
                      }
                  }
              }

          },
           {
               xtype: 'combobox',
               fieldLabel: 'Table',
               itemId: 'combo-postgre-table',
               name: 'postgre_db_table',
               editable: true,
               disabled: true,
               margin: 2,
               width: 386,
               allowBlank: false,
               labelWidth: 140,
               displayField: 'name',
               valueField: 'display_name',
               store: Ext.create('GeoPatrimoine.store.PostgreDataTable'),
               listeners: {
                   change: function (combo, newValue, oldValue, eOpts) {
                     
                       var panelPostgre = this.up("panellayerpostgre");
                       var comboColumnId = panelPostgre.down("#combo-postgre-column-id");
                       var comboColumnGeom = panelPostgre.down("#combo-postgre-column-geom");

                       comboColumnId.disable();
                       comboColumnId.setValue(null);

                       comboColumnGeom.disable();
                       comboColumnGeom.setValue(null);

                       if (Ext.isEmpty(newValue) === false) {
                           var record = combo.getStore().findRecord("name", newValue);
                           if (record !== null)
                           {
                               comboColumnGeom.getStore().loadData(record.columns().data.items);
                               comboColumnId.getStore().loadData(record.columns().data.items);
                               comboColumnId.enable();
                               comboColumnGeom.enable();
                               panelPostgre.loadVectorDataTableColumn(record);
                           }
                         
                       }
                   }
               }

           },           
           {
               xtype: 'combobox',
               fieldLabel: 'Colonne Id',
               itemId: 'combo-postgre-column-id',
               name: 'postgre_db_column_id',
               editable: true,
               disabled: true,
               margin: 2,
               width: 386,
               allowBlank: false,
               labelWidth: 140,
               queryMode: 'local',
               displayField: 'display_name',
               valueField: 'name',
               store: Ext.create('Ext.data.Store', {
                   model: 'GeoPatrimoine.model.vector.VectorDataColumn'
               }),
               listeners: {
                   change: function (combo, newValue, oldValue, eOpts) {

                   }
               }

           }
           ,
           {
               xtype: 'combobox',
               fieldLabel: 'Colonne Géométrie',
               itemId: 'combo-postgre-column-geom',
               name: 'postgre_db_column_geom',
               editable: true,
               disabled: true,
               margin: 2,
               width: 386,
               allowBlank: false,
               labelWidth: 140,
               queryMode: 'local',
               displayField: 'display_name',
               valueField: 'name',
               store: Ext.create('Ext.data.Store', {
                   model: 'GeoPatrimoine.model.vector.VectorDataColumn'
               }),
               listeners: {
                   change: function (combo, newValue, oldValue, eOpts) {

                   }
               }

           },
         {
             xtype: 'tabpanel',
             height:300,
             items: [
                 {
                     xtype: 'panel',
                     title: 'Info-bulles',
                    
                     layout: 'fit',
                     items: [
                         {
                             xtype: 'panellayervectorcolumns',
                             nameHiddenField: 'view_tooltip_columns',
                             itemId:'columns-grid-tooltip'
                             
                         }
                     ]
                 },
                 {
                     xtype: 'panel',
                     title: 'Formulaire',
                     layout: 'fit',
                     items: [
                         {
                             xtype: 'panellayervectorcolumns',
                             nameHiddenField: 'view_form_columns',
                             itemId: 'columns-grid-form'
                            
                         }
                     ]
                 },
                 {
                     xtype: 'panel',
                     title: 'Tableau',
                     layout: 'fit',
                     items: [
                         {
                             xtype: 'panellayervectorcolumns',
                             nameHiddenField: 'view_table_columns',
                             itemId: 'columns-grid-table'
                          
                         }
                     ]
                 },
                 {
                     xtype: 'panel',
                     title: 'Template',
                     layout: 'fit',
                     items: [
                         {
                             xtype: 'panellayervectorcolumns',
                             nameHiddenField: 'view_template_columns',
                             itemId: 'columns-grid-template'
                           
                         }
                     ]
                 }
             ]
         }
        

        ];

        this.callParent(arguments);



    }
});

