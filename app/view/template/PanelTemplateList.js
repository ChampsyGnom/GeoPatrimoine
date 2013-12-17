Ext.define('GeoPatrimoine.view.template.PanelTemplateList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.paneltemplatelist',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    
    initComponent: function (config) {
        this.items= [
        {
            xtype: 'combo',
            itemId:'combo-template',
            margin: 2,
            queryMode:'local',
            flex: 1,
            store: 'Template',
            valueField: 'id',
            editable:false,
            displayField: 'display_name',
            listeners: {
                change: function ( combo, newValue, oldValue, eOpts )
                {
                    var combo = this.up("paneltemplatelist").down("combo");
                    var record = combo.getStore().findRecord("id", combo.getValue());
                    GeoPatrimoine.getApplication().fireEvent('selectedTemplateChange', record);
                }
            }
        }
        ,
        {

            xtype: 'button',
            icon: './resources/icons/16x16/button-template-create.png',
            tooltip: 'Créer un modèle',
            itemId:'button-create-template',
            isNonAdminHidden: true,
            disabled: false,
            hidden:true,
            margin: 2,
            handler: function ()
            {
                this.up("paneltemplatelist").fireEvent('createTemplateClick');
            }
        },
        {

            xtype: 'button',
            icon: './resources/icons/16x16/button-template-update.png',
            tooltip: 'Modifier le modèle',
            itemId: 'button-update-template',
            isNonAdminHidden: true,
            disabled: true,
            hidden: true,
            margin: 2,
            handler: function () {
                var combo = this.up("paneltemplatelist").down("combo");
                var record = combo.getStore().findRecord("id", combo.getValue());
                if (record !== null)
                { this.up("paneltemplatelist").fireEvent('updateTemplateClick', record); }
               
            }
        }
        ,
        {

            xtype: 'button',
            icon: './resources/icons/16x16/button-template-destroy.png',
            tooltip: 'Supprimer le modèle',
            itemId: 'button-delete-template',
            isNonAdminHidden: true,
            disabled: true,
            hidden: true,
            margin: 2,
            handler: function () {
                var combo = this.up("paneltemplatelist").down("combo");
                var record = combo.getStore().findRecord("id", combo.getValue());
                if (record !== null)
                { this.up("paneltemplatelist").fireEvent('deleteTemplateClick', record); }
            }
        }
        

        ];
       
        this.callParent(arguments);
        GeoPatrimoine.updateAdminComponentsVisibility();

        
    }
});
    
