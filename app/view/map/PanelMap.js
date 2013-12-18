Ext.define('GeoPatrimoine.view.map.PanelMap', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.panelmap',
    layout: 'fit',
    map: null,
    mapDiv: null,
    listeners: {
        resize: function (sc, width, height, oldWidth, oldHeight, eOpts) {
            this.mapDiv.style.width = width;
            this.mapDiv.style.height = height;
            this.map.setSize([width, height]);
            // if (eCarto.selectedTemplate !== null)
            //  {this.updateView();}
        },
        render: function () {
            /*
            var posTopLeft = ol.proj.transform([-1.9, 47.38], 'EPSG:4326', 'EPSG:3857');
            var posBottomRight = ol.proj.transform([-1.39, 47.25], 'EPSG:4326', 'EPSG:3857');

            var extent = [
                  Math.min(posTopLeft[0], posBottomRight[0]),
                  Math.min(posTopLeft[1], posBottomRight[1]),
                  Math.max(posTopLeft[0], posBottomRight[0]),
                  Math.max(posTopLeft[1], posBottomRight[1])
            ];

            this.map.getView().fitExtent(extent, this.map.getSize());
            */
        }

    },

    /*
    initComponent: function () {
        var me = this;
        var id = Ext.id();
        this.mapDiv = document.createElement('div');
        this.mapDiv.id = id;
        document.getElementsByTagName('body')[0].appendChild(this.mapDiv);
        var layers = [];
        var projection = new ol.proj.Projection({
            code: 'EPSG:3857',
            units: ol.proj.Units.METERS
        });

        //;
       
        var mousePositionControl = new ol.control.MousePosition({
            coordinateFormat: ol.coordinate.createStringXY(4),
            projection: 'EPSG:4326',
            // comment the following two lines to have the mouse position
            // be placed within the map.
           // className: 'custom-mouse-position',
          //  target: document.getElementById('mouse-position'),
            undefinedHTML: '&nbsp;'
        });
       // this.interactionSelect = new ol.interaction.Select();

        var raster = new ol.layer.Tile({
            source: new ol.source.MapQuestOpenAerial()
        });

        var vector = new ol.layer.Vector({
            id: 'vector',
            source: new ol.source.Vector({
                parser: new ol.parser.ogc.GML_v3(),
                url: 'data/topp-states-wfs.xml'
            }),
            style: new ol.style.Style({
                rules: [
                  new ol.style.Rule({
                      filter: 'renderIntent("selected")',
                      symbolizers: [
                        new ol.style.Fill({
                            color: '#ffffff',
                            opacity: 0.5
                        })
                      ]
                  })
                ],
                symbolizers: [
                  new ol.style.Fill({
                      color: '#ffffff',
                      opacity: 0.25
                  }),
                  new ol.style.Stroke({
                      color: '#6666ff'
                  })
                ]
            })
        });

        var select = new ol.interaction.Select();
        if (ol.webgl.SUPPORTED) {
            console.log("create map renderer WEBGL");
            this.map = new ol.Map({
                layers: layers,
                target: id,
                interactions: ol.interaction.defaults(),
                controls: ol.control.defaults().extend([mousePositionControl]),
                interactions: ol.interaction.defaults().extend([select]),
                layers: [raster, vector],
               // renderer: ol.RendererHint.WEBGL,
                 renderer: ol.RendererHint.CANVAS,
                view: new ol.View2D({
                    // projection: projection,
                    //  zoom:12
                    center: [-11000000, 4600000],
                    zoom: 4

                })
            });
        }
        else
        {
            console.log("create map renderer CANVAS");
            this.map = new ol.Map({
                layers: layers,
                target: id,
                interactions: ol.interaction.defaults(),
                controls: ol.control.defaults().extend([mousePositionControl]),
                interactions: ol.interaction.defaults().extend([select]),
                layers: [raster, vector],
                renderer: ol.RendererHint.CANVAS,
                view: new ol.View2D({
                    // projection: projection,
                    //  zoom:12
                    center: [-11000000, 4600000],
                    zoom: 4

                })
            });
        }
        
       
        this.items = [

            {
                xtype: 'panel',
                layout: 'fit',
                contentEl: id
            }
        ];

        if (eCarto.selectedTemplate !== undefined && eCarto.selectedTemplate !== null)
        {
            this.updateView();
        }

        this.map.getView().on('change:resolution', function () {
            var resolution = me.map.getView().getResolution();
            eCarto.getApplication().fireEvent("mapResolutionChange", resolution);
        });

        this.callParent();
    }
    */
    createLayersDefault : function()
    {
        var raster = new ol.layer.Tile({
            id: 'raster-default',
            visible: false,
            source: new ol.source.MapQuestOpenAerial()
        });
        var vector = new ol.layer.Vector({
            id: 'vector-default',
            visible: false,
            source: new ol.source.Vector({
                parser: new ol.parser.ogc.GML_v3(),
                url: 'data/default-data.xml'
            }),
            style: new ol.style.Style({
                rules: [
                  new ol.style.Rule({
                      filter: 'renderIntent("selected")',
                      symbolizers: [
                        new ol.style.Fill({
                            color: '#ffffff',
                            opacity: 1
                        })
                      ]
                  })
                ],
                symbolizers: [
                  new ol.style.Fill({
                      color: '#ffffff',
                      opacity: 0.5
                  }),
                  new ol.style.Stroke({
                      color: '#6666ff'
                  })
                ]
            })
        });
        return [raster, vector];

    },
    initComponent: function (config) {

        var me = this;
        var id = Ext.id();
        this.mapDiv = document.createElement('div');
        this.mapDiv.id = id;
        document.getElementsByTagName('body')[0].appendChild(this.mapDiv);
        var layers = [];
        var projection = new ol.proj.Projection({
            code: 'EPSG:3857',
            units: ol.proj.Units.METERS
        });



        var mousePositionControl = new ol.control.MousePosition({
            coordinateFormat: ol.coordinate.createStringXY(4),
            projection: 'EPSG:4326',            
            undefinedHTML: '&nbsp;'
        });
        
        
        var select = new ol.interaction.Select();
        this.map = new ol.Map({
            
            target: id,
            interactions: ol.interaction.defaults(),
            controls: ol.control.defaults().extend([mousePositionControl]),
            interactions: ol.interaction.defaults().extend([select]),            
            renderer: ol.RendererHint.CANVAS,
            layers: this.createLayersDefault(),
            view: new ol.View2D({                
                center: [-11000000, 4600000],
                zoom: 4

            })
        });
        this.items = [
           {
               xtype: 'panel',
               layout: 'fit',
               contentEl: id
           }
        ];
        this.callParent(arguments);
    }
});
    
