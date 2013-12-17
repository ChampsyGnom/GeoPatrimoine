Ext.define('GeoPatrimoine.view.template.WindowTemplate', {
    extend: 'Ext.window.Window',
    alias: 'widget.windowtemplate',
    width: 400,
    closable: true,
    resizable: false,
    modal: true,
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
                        fieldLabel: GeoPatrimoine.lang.WindowTemplateFieldDisplayNameLabel,
                        labelWidth: 120,
                        name: 'display_name',
                        value:'Nouveau modèle',
                        margin: 4

                    }
                  ,
                   {
                       xtype: 'textfield',
                       fieldLabel: GeoPatrimoine.lang.WindowTemplateFieldEpsgLabel,
                       allowBlank: false,
                       labelWidth: 120,
                       name: 'epsg',
                       value:'3857',
                       margin: 4

                   },
                   {

                       xtype: 'fieldgooglelocationsearch',
                       labelWidth: 120,
                       fieldLabel: GeoPatrimoine.lang.WindowTemplateFieldLocation,
                       margin: 4,
                       listeners: {
                           locationChange: function (locationX, locationY)
                           {
                               console.log("location change " + locationX + "," + locationY);
                               this.up("windowtemplate").down("#field-center-x").setValue(locationX);
                               this.up("windowtemplate").down("#field-center-y").setValue(locationY);
                           }

                       }
                   },
                   {
                     xtype: 'hiddenfield',
                     itemId:'field-center-x',
                     name: 'center_x',
                     allowBlank:false                     
                 },
                  {
                      xtype: 'hiddenfield',
                      name: 'center_y',
                      itemId: 'field-center-y',
                      allowBlank: false                     
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