Ext.define('GeoPatrimoine.view.template.WindowFolder', {
    extend: 'Ext.window.Window',
    alias: 'widget.windowfolder',
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
                        fieldLabel:'Libellé',
                        labelWidth: 120,
                        name: 'display_name',
                        value:'Nouveau dossier',
                        margin: 4
                       

                    },
                    {
                        xtype: 'hiddenfield',                       
                        name: 'node_type__id',
                        value:1
                      
                    },
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