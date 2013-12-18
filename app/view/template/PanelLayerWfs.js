Ext.define('GeoPatrimoine.view.template.PanelLayerWfs', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.panellayerwfs',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    loadWfsServeurLayers: function ()
    {
        var comboUrl = this.down("#combo-url-wfs");
        var wfsLayerStore = Ext.StoreManager.lookup('WfsVectorDataTable');
        wfsLayerStore.getProxy().extraParams.url = comboUrl.getValue();
        wfsLayerStore.load();
    },
    initComponent: function (config) {
        this.items = [
        {
            xtype: 'combobox',
            fieldLabel: 'Serveur WFS',
            itemId:'combo-url-wfs',
            editable: false,
            margin: 2,
            width: 386,
            allowBlank: false,
            labelWidth: 140,
            queryMode: 'local',        
            displayField: 'displayName',
            valueField: 'url',
            store: Ext.create('Ext.data.Store', {
                fields: ['url', 'displayName'],
                data: [                    
                       { "url": "http://localhost:8081/geoserver/ows", "displayName": "GeoServer Local" },
                        { "url": "http://www2.dmsolutions.ca/cgi-bin/mswfs_gmap", "displayName": "GMap WMS Demo MapServer" },
                        { "url": "http://giswebservices.massgis.state.ma.us/geoserver/wfs", "displayName": "Massachusetts Data from MassGIS GeoServer" },
                        
                ]
            }),
            listeners: {
                change: function (combo, newValue, oldValue, eOpts) {
                    
                   
                }
            }

        },
        {
            xtype: 'button',
            text: 'Lister des couches du serveurs',
            margin: 2,
            handler: function ()
            {
                this.up("panellayerwfs").loadWfsServeurLayers();
                
            }
        },
         {
             xtype: 'combobox',
             fieldLabel: 'couche WFS',
             itemId: 'combo-layer-wfs',
             editable: false,
             margin: 2,
             width: 386,
             allowBlank: false,
             labelWidth: 140,           
             displayField: 'display_name',
             valueField: 'name',
             store: 'WfsVectorDataTable',
             listeners: {
                 change: function (combo, newValue, oldValue, eOpts) {


                 }
             }

         }
        

        ];

        this.callParent(arguments);



    }
});

