Ext.define('GeoPatrimoine.view.template.PanelLayerWfs', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.panellayerwfs',
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
            fieldLabel: 'Url serveur WFS',
            itemId: 'combo-url-wfs',
            name:'wfs_url',
            editable: true,
            margin: 2,
            width: 386,
            allowBlank: false,
            labelWidth: 140,
            queryMode: 'local',        
            displayField: 'url',
            valueField: 'url',
            store: Ext.create('Ext.data.Store', {
                fields: ['url'],
                data: [                    
                       { "url": "http://127.0.0.1:8081/geoserver/wfs" },
                       { "url": "http://127.0.0.1:8088/geoserver/wfs" }
                      
                        
                ]
            }),
            listeners: {
                change: function (combo, newValue, oldValue, eOpts) {
                    var comboLayerWfs = this.up("panellayerwfs").down("#combo-layer-wfs");
                    comboLayerWfs.getStore().removeAll();
                    comboLayerWfs.setValue(null);       
                    var wfsLayerStore = Ext.StoreManager.lookup('WfsVectorDataTable');
                    var me = this;
                    wfsLayerStore.getProxy().extraParams.url = newValue;
                    var comboWfsFeatureName = this.up("panellayerwfs").down("#combo-layer-wfs");
                   
                    wfsLayerStore.load(
                        {
                            callback: function (records, operation, success)
                            {
                                if (success === true)
                                {
                                    wfsLayerStore.each(function (item) {
                                        comboLayerWfs.getStore().add(item);
                                    });
                                    var featureName = comboWfsFeatureName.getValue();
                                    comboWfsFeatureName.setValue(null);
                                    comboWfsFeatureName.setValue(featureName);
                                    //console.log("valuer feature namre"+comboWfsFeatureName.getValue());
                                }
                               
                            }
                        }
                   );
                }
            }

        },
         {
             xtype: 'combobox',
             fieldLabel: 'Couche WFS',
             name: 'wfs_feature_name',
             itemId: 'combo-layer-wfs',
             editable: false,
             margin: 2,
             width: 386,
             allowBlank: false,
             labelWidth: 140,
             queryMode:'local',
             displayField: 'display_name',
             valueField: 'name',
             store:Ext.create('Ext.data.Store', {
                 model: 'GeoPatrimoine.model.vector.VectorDataTable'
             }),
             listeners: {
                 change: function (combo, newValue, oldValue, eOpts) {

                     var record = combo.getStore().findRecord("name", newValue);
                     if (record !== null)
                     {
                         combo.up("panellayerwfs").up("windowlayer").down("#txt-epsg").setValue(record.data.epsg);
                         combo.up("panellayerwfs").loadVectorDataTableColumn(record);

                     }
                     
                    
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

