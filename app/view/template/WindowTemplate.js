Ext.define('GeoPatrimoine.view.template.WindowTemplate', {

    extend: 'Ext.window.Window',
    alias: 'widget.windowtemplate',
    width: 400,
    closable: false,

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
                        margin: 4

                    }
                  ,
                   {
                       xtype: 'textfield',
                       fieldLabel: GeoPatrimoine.lang.WindowTemplateFieldEpsgLabel,
                       allowBlank: false,
                       labelWidth: 120,
                       name: 'epsg',
                       margin: 4

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