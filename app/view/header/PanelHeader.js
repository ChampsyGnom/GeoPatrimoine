Ext.define('GeoPatrimoine.view.header.PanelHeader', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.panelheader',
    langTitle: 'GéoPatrimoine',  
    layout: {
        type: 'hbox',
        align:'middle'

    },
    bodyStyle: { "background-color": "#157FCC" },
    
    initComponent: function (config) {

        console.log("appli langViewPanelHeaderTitle to " + GeoPatrimoine.model.Lang.langViewPanelHeaderTitle);
       
        this.items = [
        {
            xtype: 'label',
            flex:1,
            margin:10,
            text: GeoPatrimoine.model.Lang.langViewPanelHeaderTitle,
            cls:'label-header'
        },
        {
            xtype: 'combo',
            labelCls: 'combo-language',
            itemId:'combo-language',
            fieldLabel: GeoPatrimoine.model.Lang.langComboLangFieldLabel,
            width: 200,
            margin:10,
            labelWidth: 80,
            labelAlign: 'left',
            queryMode: 'local',
            editable:false,
            displayField: 'displayName',
            value: GeoPatrimoine.model.Lang.currentLang,
            valueField: 'name',
            store: Ext.create('Ext.data.Store', {
                fields: ['displayName', 'name'],
                data: [
                    { "displayName": "Français", "name": "fr" },
                    { "displayName": "Anglais", "name": "en" }                   
                ]
            }),
            listeners : 
                {
                    change: function ( combo, newValue, oldValue, eOpts )
                    {
                        GeoPatrimoine.model.Lang.currentLang = newValue;
                        var url = 'http://'+window.location.host + window.location.pathname + '?lang=' + newValue;
                        location.assign(url);
                       
                    }
                }
        },
        {

            xtype: 'button',
            itemId:'button-disconnect',
            text: GeoPatrimoine.model.Lang.langViewPanelHeaderButtonDisconnect,
            width:100,
            margin:4
        }

        ];
    

        this.callParent(arguments);
    }
});
    
