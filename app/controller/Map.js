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

        GeoPatrimoine.getApplication().on('mapLayerListChange', this.onMapLayerListChange,this);
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
        if (node.data.node_type__id === 2) {
            if (node.data.tile_source === 'Osm') {
                layer = new ol.layer.Tile({
                    //minResolution: node.data.min_resolution,
                    //maxResolution: node.data.max_resolution,                   
                   // opacity: node.data.opacity / 100,
                   // visible: true,
                    source: new ol.source.OSM()

                });
                layer.nodeId = node.data.id;
               
                return layer;

            }

            if (node.data.tile_source === "MapQuest") {
                layer = new ol.layer.Tile({
                    minResolution: node.data.min_resolution,
                    maxResolution: node.data.max_resolution,                   
                    opacity: node.data.opacity / 100,
                    visible: false,
                    source: new ol.source.MapQuestOSM()
                });                
                layer.nodeId = node.data.id;
                return layer;
            }

            if (node.data.tile_source === "MapQuestAerial") {
                layer = new ol.layer.Tile({
                    minResolution: node.data.min_resolution,
                    maxResolution: node.data.max_resolution,                  
                    opacity: node.data.opacity / 100,
                    visible: false,
                    source: new ol.source.MapQuestOpenAerial()
                });
                layer.nodeId = node.data.id;
                return layer;
            }
            if (node.data.tile_source === "BingRoad") {

                layer = new ol.layer.Tile({
                    preload: Infinity,
                    minResolution: node.data.min_resolution,
                    maxResolution: node.data.max_resolution,                   
                    opacity: node.data.opacity / 100,
                    visible: false,
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
                    minResolution: node.data.min_resolution,
                    maxResolution: node.data.max_resolution,                   
                    opacity: node.data.opacity / 100,
                    preload: Infinity,
                    visible: false,
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
                    minResolution: node.data.min_resolution,
                    maxResolution: node.data.max_resolution,                    
                    opacity: node.data.opacity / 100,
                    preload: Infinity,
                    visible: false,
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
                          minResolution: node.data.min_resolution,
                          maxResolution: node.data.max_resolution,                         
                          opacity: node.data.opacity / 100,
                          visible: false,
                          source: new ol.source.XYZ({
                              url: node.data.tile_source_xyz_url
                          })
                      });
                layer.nodeId = node.data.id;
                return layer;
            }
            if (node.data.tile_source === "WMS") {

                layer = new ol.layer.Tile({
                    minResolution: node.data.min_resolution,
                    maxResolution: node.data.max_resolution,                   
                    opacity: node.data.opacity / 100,
                    visible: false,
                    source: new ol.source.TileWMS({
                        url: node.data.tile_source_wms_url,
                        params: { 'LAYERS': node.data.tile_source_wms_layer, 'TILED': true }
                    })
                });

                layer.nodeId = node.data.id;
                return layer;
            }




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