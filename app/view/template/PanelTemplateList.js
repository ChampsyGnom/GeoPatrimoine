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
            margin: 2,
            flex: 1
        }
        ,
        {

            xtype: 'button',
            icon: './resources/icons/16x16/button-template-create.png',
            tooltip: 'Créer un modèle',
            isNonAdminHidden: true,
            disabled: false,
            hidden:true,
            margin:2
        },
        {

            xtype: 'button',
            icon: './resources/icons/16x16/button-template-update.png',
            tooltip: 'Modifier le modèle',
            isNonAdminHidden: true,
            disabled: true,
            hidden: true,
            margin:2
        }
        ,
        {

            xtype: 'button',
            icon: './resources/icons/16x16/button-template-destroy.png',
            tooltip: 'Supprimer le modèle',
            isNonAdminHidden: true,
            disabled: true,
            hidden: true,
            margin: 2
        }
        
        

        ];
       
        this.callParent(arguments);
        GeoPatrimoine.updateAdminComponentsVisibility();

        
    }
});
    
