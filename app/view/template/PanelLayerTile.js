Ext.define('GeoPatrimoine.view.template.PanelLayerTile', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.panellayertile',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function (config) {
        this.items = [
        {
            xtype: 'combobox',
            fieldLabel: 'Source',
            editable: false,
            margin: 2,
            width: 386,
            allowBlank: false,
            labelWidth: 140,
            queryMode: 'local',
            name: 'tile_source',
            displayField: 'displayName',
            valueField: 'name',
            store: Ext.create('Ext.data.Store', {
                fields: ['name', 'displayName'],
                data: [
                        { "name": "Osm", "displayName": "Open Street Map" },
                        { "name": "BingRoad", "displayName": "Bings Road" },
                        { "name": "BingAerial", "displayName": "Bings Aerial" },
                        { "name": "BingHybrid", "displayName": "Bings Hybrid" },
                        { "name": "MapQuest", "displayName": "MapQuest" },
                        { "name": "MapQuestAerial", "displayName": "MapQuest Aérial" },
                        { "name": "XYZ", "displayName": "XYZ" },
                        { "name": "WMS", "displayName": "WMS" }
                ]
            }),
            listeners: {
                change: function (combo, newValue, oldValue, eOpts) {
                    var panel = combo.up("panellayertile");
                    panel.down("#combo-tile-xyz-url").hide();
                    panel.down("#combo-tile-wms-url").hide();
                    panel.down("#combo-tile-wms-layer").hide();

                    panel.down("#combo-tile-xyz-url").disable();
                    panel.down("#combo-tile-wms-url").disable();
                    panel.down("#combo-tile-wms-layer").disable();

                    var txtLibelle = panel.up("window").down("#txt-libelle");
                    if (
                        newValue === 'Osm' )
                    {
                        txtLibelle.setValue("Open Street Map");
                    }
                    if ( newValue === 'BingRoad') {
                        txtLibelle.setValue("Bing Routes");
                    }
                    if ( newValue === 'BingAerial') {
                        txtLibelle.setValue("Bing  Aérien");
                    }
                    if (
                        
                         newValue === 'BingHybrid') {
                        txtLibelle.setValue("Bing Hybrid");
                    }
                    if (  newValue === 'MapQuest') {
                        txtLibelle.setValue("Map Quest");
                    }
                    if (  newValue === 'MapQuestAerial') {
                        txtLibelle.setValue("MapQuest Aérien");
                    }
                    if (newValue === 'XYZ') {
                        panel.down("#combo-tile-xyz-url").show();
                        panel.down("#combo-tile-xyz-url").enable();
                    }
                    var txtEpsg = this.up("windowlayer").down("#txt-epsg");
                    if (newValue === 'WMS') {
                        panel.down("#combo-tile-wms-url").show();
                        panel.down("#combo-tile-wms-layer").show();
                        panel.down("#combo-tile-wms-url").enable();
                        panel.down("#combo-tile-wms-layer").enable();
                    }
                    if (
                        newValue === 'Osm' ||
                        newValue === 'BingRoad' ||
                         newValue === 'BingAerial' ||
                         newValue === 'BingHybrid' ||
                         newValue === 'BingAerial' ||
                         newValue === 'MapQuest' ||
                         newValue === 'MapQuestAerial' ||
                         newValue === 'XYZ') {
                        txtEpsg.setValue("3857");
                    }
                    else { txtEpsg.setValue(""); }
                    //txt-epsg
                }
            }
        },
        {

            xtype: 'combo',
            fieldLabel: 'URL XYZ',
            allowBlank: false,
            width: 500,
            labelWidth: 140,
            margin: 2,
            editable: true,
            hidden: true,
            itemId: 'combo-tile-xyz-url',
            name: 'tile_source_xyz_url',
            queryMode: 'local',
            displayField: 'displayName',
            valueField: 'name',
            store: Ext.create('Ext.data.Store', {
                fields: ['name', 'displayName'],
                data: [

                        {
                            "name": "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
                            "displayName": "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                        },
                        {
                            "name": "http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_Imagery_World_2D/MapServer/tile/{z}/{y}/{x}",
                            "displayName": "http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_Imagery_World_2D/MapServer/tile/{z}/{y}/{x}"
                        },
                        {
                            "name": "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
                            "displayName": "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
                        }
                ]
            })
        },
        {

            xtype: 'combo',
            fieldLabel: 'URL WMS',
            allowBlank: false,
            width: 500,
            labelWidth: 140,
            margin: 2,
            editable: true,
            hidden: true,
            itemId: 'combo-tile-wms-url',
            name: 'tile_source_wms_url',
            queryMode: 'local',
            displayField: 'displayName',
            valueField: 'name',
            store: Ext.create('Ext.data.Store', {
                fields: ['name', 'displayName'],
                data: [

                        {
                            "name": "http://demo.opengeo.org/geoserver/wms",
                            "displayName": "http://demo.opengeo.org/geoserver/wms"
                        },
                         {
                             "name": "http://wms.geo.admin.ch/",
                             "displayName": "http://wms.geo.admin.ch/"
                         }
                ]
            }),
            listeners: {
                change: function (combo, newValue, oldValue, eOpts) {

                    var wmsLayerStore = Ext.StoreManager.lookup('WmsVectorDataTable');
                    wmsLayerStore.getProxy().extraParams.url = newValue;
                    combo.up("panellayertile").down("#combo-tile-wms-layer").setValue(null);
                }
            }
        }
        ,
        {

            xtype: 'combo',
            fieldLabel: 'Couche Wms',
            allowBlank: false,
            width: 500,
            labelWidth: 140,
            margin: 2,
            editable: false,
            hidden: true,
            itemId: 'combo-tile-wms-layer',
            name: 'tile_source_wms_layer',
            displayField: 'display_name',
            valueField: 'name',
            store: 'WmsVectorDataTable',
            listeners: {
                change: function (combo, newValue, oldValue, eOpts) {
                    var txtEpsg = this.up("windowlayer").down("#txt-epsg");
                    var record = combo.getStore().findRecord("Name", newValue);
                    if (record !== null) {
                        txtEpsg.setValue(record.data.SRS);
                    }
                }
            }
        }

        ];

        this.callParent(arguments);
       


    }
});

