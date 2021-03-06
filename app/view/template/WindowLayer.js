Ext.define('GeoPatrimoine.view.template.WindowLayer', {
    extend: 'Ext.window.Window',
    alias: 'widget.windowlayer',
    width: 480,
    closable: true,
    resizable: true,
    y:50,
    modal: true,
    loadRecord : function(record)
    {
        var form = this.down("form");
        form.loadRecord(record);
        var panelTile = this.down("panellayertile");
        var panelWfs = this.down("panellayerwfs");
       
       
    }
    ,
    getValues : function()
    {
        var values = this.down("form").getValues();
        console.log(values);
        var comboTypeLayer = this.down("#combo-type-layer");
        if (comboTypeLayer.getValue() !== null)
        {
            if (comboTypeLayer.getValue() === 3)
            { }
            if (comboTypeLayer.getValue() === 4)
            {
                var subValues = this.down("panellayerwfs").getValues();

                for (var key in subValues) {
                    var obj = subValues[key];
                    values[key] = obj;
                }
              
            }
        }

        return values;
    },
    initComponent: function (config) {

        this.items = [
            {
                xtype: 'form',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'textfield',
                        allowBlank: false,
                        fieldLabel: 'Libelle',
                        width: 500,
                        labelWidth: 140,
                        itemId:'txt-libelle',
                        name: 'display_name',
                        value: 'Nouvelle couche',
                        margin: 2


                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'Résolution mini',
                        allowBlank: false,
                        name: 'min_resolution',
                        minValue: 0,
                        maxValue: 4000000,
                        value:0,
                        margin: 2,
                        width: 500,
                        labelWidth: 140
                    },
                   {
                       xtype: 'numberfield',
                       fieldLabel: 'Résolution maxi',
                       allowBlank: false,
                       name: 'max_resolution',
                       minValue: 0,
                       maxValue: 4000000,
                       margin: 2,
                       width: 500,
                       value: 1000,
                       labelWidth: 140
                   }, {
                       xtype: 'numberfield',
                       fieldLabel: 'Opacité',
                       allowBlank: false,
                       name: 'opacity',
                       value: 100,
                       minValue: 0,
                       maxValue: 100,
                       margin: 2,
                       width: 500,
                       labelWidth: 140
                   },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'EPSG',
                        itemId: 'txt-epsg',
                        allowBlank: false,
                        name: 'epsg',
                        margin: 2,
                        value: '4326',
                        width: 500,
                        labelWidth: 140
                    }
                   ,
                    {
                        xtype: 'combobox',
                        name: 'node_type__id',
                        itemId:'combo-type-layer',
                        fieldLabel: 'Type de couche',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['id', 'display_name'],
                            data: [

                                    {
                                        "id": 2,
                                        "display_name": "Tuile"
                                    },
                                    {
                                        "id": 3,
                                        "display_name": "PostgreSQL"
                                    },
                                    {
                                        "id": 4,
                                        "display_name": "Wfs"
                                    }
                            ]
                        }),
                        allowBlank: false,
                        valueField: 'id',
                        displayField: 'display_name',
                        editable: false,
                        margin: 2,
                        width: 500,
                        labelWidth: 140,
                        listeners: {
                            change: function (combo, newValue, oldValue, eOpts) {
                               
                                var window = combo.up("window");
                                window.down("panellayertile").hide();
                                window.down("panellayertile").disable();
                                window.down("panellayerpostgre").hide();
                                window.down("panellayerpostgre").disable();
                                window.down("panellayerwfs").hide();
                                window.down("panellayerwfs").disable();
                                if (newValue === 2) {
                                    window.down("panellayertile").enable();
                                    window.down("panellayertile").show();
                                }

                                if (newValue === 3) {
                                    window.down("panellayerpostgre").enable();
                                    window.down("panellayerpostgre").show();

                                }
                                if (newValue === 4) {
                                    window.down("panellayerwfs").enable();
                                    window.down("panellayerwfs").show();
                                }
                               
                            }
                        }
                    },
                   
                    {
                        xtype: 'panellayertile',
                        hidden: true,                       
                        margin: 0,
                        flex: 1,                       
                        disabled: true
                        

                    },
                    {
                        xtype: 'panellayerwfs',
                        hidden: true,
                        margin: 0,
                        flex: 1,
                        disabled: true
                    },
                     {
                         xtype: 'panellayerpostgre',
                         hidden: true,
                         margin: 0,
                         flex: 1,
                         disabled: true
                     }
                ],
                buttons: [
                     {
                         xtype: 'button',
                         itemId: 'buttton-cancel',
                         icon: './resources/icons/16x16/button-cancel.png',
                         formBind: true,
                         text: GeoPatrimoine.lang.ButtonCancel
                     },
                    {
                        xtype: 'button',
                        itemId: 'buttton-ok',
                        icon: './resources/icons/16x16/button-ok.png',
                        formBind: true,
                        text: GeoPatrimoine.lang.ButtonOk
                    }


                ]
            }
        ];


        this.callParent(arguments);
    }

});