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

