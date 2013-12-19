Ext.define('GeoPatrimoine.controller.Map', {
    extend: 'Ext.app.Controller',
    views: ['map.PanelMap'],
    refs: [
        {
            ref: 'PanelMap',
            selector: 'viewport panelmap'
        }
    ],
    init: function () {

        GeoPatrimoine.getApplication().on('mapLayerListChange', this.onMapLayerListChange, this);
        GeoPatrimoine.getApplication().on('mapLayerVisibilityChange', this.onMapLayerVisibilityChange, this);
        //mapLayerVisibilityChange
    },
    teleportTo: function (epsg, center_x, center_y) {
        var panelMap = this.getPanelMap();
        var olMap = panelMap.map;
        var dstProj = new ol.proj.Projection({
            code: 'EPSG:' + GeoPatrimoine.template.data.epsg,
            units: ol.proj.Units.METERS
        });

        var srcProj = new ol.proj.Projection({
            code: 'EPSG:' + epsg,
            units: ol.proj.Units.METERS
        });

        var center = ol.proj.transform([parseFloat(center_x), parseFloat(center_y)], srcProj, dstProj);
        olMap.getView().setCenter(center);
        
    },
    onMapLayerVisibilityChange: function ()
    {

        var panelMap = this.getPanelMap();
        var olMap = panelMap.map;
        var layers = olMap.getLayers();
        layers.forEach(function (layer) {
            if (layer.nodeId !== undefined && layer.nodeId !== null)
            {
                var nodeRecord = GeoPatrimoine.template.getNodeById(layer.nodeId);
                if (nodeRecord !== null)
                {
                    var isChecked = GeoPatrimoine.user.getPreferenceValue(layer.nodeId, 'checked');
                    var isVisible = isChecked === 'true';
                    layer.setVisible(isVisible);
                    console.log("couche " + nodeRecord.data.display_name + " visible " + isVisible);
                }
            }
        });
        

    },
    onMapLayerListChange: function ()
    {
        var panelMap = this.getPanelMap();
        var olMap = panelMap.map;
        if (GeoPatrimoine.template === null)
        {this.createLayersDefault();}
        else
        {
            this.createLayersTemplate(GeoPatrimoine.template);
            var projection = new ol.proj.Projection({
                code: 'EPSG:' + GeoPatrimoine.template.data.epsg,
                units: ol.proj.Units.METERS
            });
            olMap.getView().setProjection(projection);
            this.teleportTo('4326', GeoPatrimoine.template.data.center_x, GeoPatrimoine.template.data.center_y);
        }

      
    },
    createLayersTemplate: function (template)
    {
        var olMap = this.getPanelMap().map;
        var me = this;
        console.log("createLayersTemplate");
        var layers = [];
        template.nodes().each(function (node) {
            if (node.data.node_type__id > 1)
            {
                var layer = me.createLayerFromNode(node);
                layers.push(layer);
            }
           
        });
        olMap.getLayers().clear();
        for (var i = 0 ; i < layers.length; i++)
        {
            
            olMap.addLayer(layers[i]);
        }

    },
    createLayerFromNode: function (node)
    {
        Ext.data.Connection.prototype.useDefaultXhrHeader = false;
        Ext.Ajax.useDefaultXhrHeader = false;
        var isChecked = GeoPatrimoine.user.getPreferenceValue(node.data.id, 'checked');
        var isVisible = isChecked === 'true';
        var layer = null;
        
        if (node.data.node_type__id === 2) {
            if (node.data.tile_source === 'Osm') {
                layer = new ol.layer.Tile({
                    //minResolution: node.data.min_resolution,
                    //maxResolution: node.data.max_resolution,                   
                   // opacity: node.data.opacity / 100,
                    visible: isVisible,
                    source: new ol.source.OSM()

                });
                layer.nodeId = node.data.id;
               
                return layer;

            }

            if (node.data.tile_source === "MapQuest") {
                layer = new ol.layer.Tile({
                 //   minResolution: node.data.min_resolution,
                 //   maxResolution: node.data.max_resolution,                   
                  //  opacity: node.data.opacity / 100,
                    visible: isVisible,
                    source: new ol.source.MapQuestOSM()
                });                
                layer.nodeId = node.data.id;
                return layer;
            }

            if (node.data.tile_source === "MapQuestAerial") {
                layer = new ol.layer.Tile({
                   // minResolution: node.data.min_resolution,
                  //  maxResolution: node.data.max_resolution,                  
                  //  opacity: node.data.opacity / 100,
                    visible: isVisible,
                    source: new ol.source.MapQuestOpenAerial()
                });
                layer.nodeId = node.data.id;
                return layer;
            }
            if (node.data.tile_source === "BingRoad") {

                layer = new ol.layer.Tile({
                    preload: Infinity,
                  //  minResolution: node.data.min_resolution,
                  //  maxResolution: node.data.max_resolution,                   
                  //  opacity: node.data.opacity / 100,
                    visible: isVisible,
                    source: new ol.source.BingMaps({
                        key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
                        imagerySet: ['Road']
                    })
                });
                layer.nodeId = node.data.id;
                return layer;

            }
            if (node.data.tile_source === "BingAerial") {

                layer = new ol.layer.Tile({
                   // minResolution: node.data.min_resolution,
                  //  maxResolution: node.data.max_resolution,                   
                  //  opacity: node.data.opacity / 100,
                  //  preload: Infinity,
                    visible: isVisible,
                    source: new ol.source.BingMaps({
                        key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
                        imagerySet: ['Aerial']
                    })
                });
                layer.nodeId = node.data.id;
                return layer;

            }

            if (node.data.tile_source === "BingHybrid") {

                layer = new ol.layer.Tile({
                  //  minResolution: node.data.min_resolution,
                  //  maxResolution: node.data.max_resolution,                    
                  //  opacity: node.data.opacity / 100,
                  //  preload: Infinity,
                    visible: isVisible,
                    source: new ol.source.BingMaps({
                        key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
                        imagerySet: ['AerialWithLabels']
                    })
                });
                layer.nodeId = node.data.id;
                return layer;

            }

            if (node.data.tile_source === "XYZ") {
                layer =
                      new ol.layer.Tile({
                   //       minResolution: node.data.min_resolution,
                    //      maxResolution: node.data.max_resolution,                         
                   //       opacity: node.data.opacity / 100,
                          visible: isVisible,
                          source: new ol.source.XYZ({
                              url: node.data.tile_source_xyz_url
                          })
                      });
                layer.nodeId = node.data.id;
                return layer;
            }
            if (node.data.tile_source === "WMS") {

                layer = new ol.layer.Tile({
                 //   minResolution: node.data.min_resolution,
                //    maxResolution: node.data.max_resolution,                   
                //    opacity: node.data.opacity / 100,
                    visible: isVisible,
                    source: new ol.source.TileWMS({
                        url: node.data.tile_source_wms_url,
                        params: { 'LAYERS': node.data.tile_source_wms_layer, 'TILED': true }
                    })
                });

                layer.nodeId = node.data.id;
                return layer;
            }




        }
        if (node.data.node_type__id === 4) {
            var projection = new ol.proj.Projection({
                code: 'EPSG:' + node.data.epsg

            });

            layer = new ol.layer.Vector({
                style: new ol.style.Style({

                    symbolizers: [
                      new ol.style.Fill({
                          color: '#ffffff',
                          opacity: 1
                      }),
                      new ol.style.Stroke({
                          color: '#6666ff',
                          opacity: 1,
                          width: 10
                      }),
                      new ol.style.Shape({
                          size: 20,
                          opacity: 1,
                          fill: new ol.style.Fill({
                              color: '#6666ff',
                              opacity: 1
                          })
                      })
                    ]
                }),
                source: new ol.source.Vector({
                    projection: projection,
                    parser: new ol.parser.ogc.GML_v3(),
                    // url: 'http://127.0.0.1:8081/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=tiger:poly_landmarks'
                    url: "./data/wfs-proxy.php?url=" + node.data.wfs_url + "?service=wfs&version=2.0.0&request=GetFeature&typeNames=" + node.data.wfs_feature_name
                })
                //http://127.0.0.1:8088/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=tiger:poly_landmarks
            });
            layer.nodeId = node.data.id;

            return layer;
        }
       
    },
    createLayersDefault: function ()
    {
        var olMap = this.getPanelMap().map;
        var layers = this.getPanelMap().createLayersDefault();
        olMap.getLayers().clear();
        for (var i = 0 ; i < layers.length; i++)
        {olMap.addLayer(layers[i]);}
    }
});