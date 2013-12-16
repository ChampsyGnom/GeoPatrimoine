Ext.define('GeoPatrimoine.view.header.PanelHeader', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.panelheader',
    langTitle: 'GéoPatrimoine',  
    layout: {
        type: 'hbox',
        align:'top'

    },
    bodyStyle: { "background-color": "#157FCC" },
    
    initComponent: function (config) {

        
        this.items = [
        {
            xtype: 'label',
            flex:1,
            margin:10,
            text: GeoPatrimoine.lang.PanelHeaderTitle,
            cls:'label-header'
        },
        {

            xtype: 'panel',
            border: false,
            bodyStyle: { "background-color": "#157FCC" },
            layout: {
                type: 'vbox',
                align: 'left'
            },
            items: [
                {
                    xtype: 'combo',
                    labelCls: 'combo-language',
                    itemId: 'combo-language',
                    icon: './resources/icons/16x16/lang.png',
                    fieldLabel: GeoPatrimoine.lang.ComboLangFieldLabel,
                    width: 200,
                    margin: 4,
                    labelWidth: 80,
                    labelAlign: 'left',
                    queryMode: 'local',
                    editable: false,
                    displayField: 'displayName',
                    value: GeoPatrimoine.model.lang.Lang.currentLang,
                    valueField: 'name',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['displayName', 'name'],
                        data: [
                            { "displayName": "Français", "name": "fr" },
                            { "displayName": "Anglais", "name": "en" }
                        ]
                    }),
                    listeners:
                        {
                            change: function (combo, newValue, oldValue, eOpts) {
                                GeoPatrimoine.model.lang.Lang.currentLang = newValue;
                                var url = 'http://' + window.location.host + window.location.pathname + '?lang=' + newValue;
                                location.assign(url);

                            }
                        }
                },
                {

                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        align:'stretch'
                    },
                    bodyStyle: { "background-color": "#157FCC" },
                    border:false,
                    items: [
                        {
                            xtype: 'label',
                            margin: 4,
                            width:80,
                            cls: 'label-user-name',
                            text:'Utilisateur : '
                        },
                        {
                            xtype: 'label',
                            itemId: 'txt-user-name',
                            margin: 4,
                            cls: 'txt-user-name',
                            text: 'Non authentifié'
                        }

                    ]
                }
            ]
        },
        
        {

            xtype: 'button',
            itemId: 'button-disconnect',
            icon:'./resources/icons/16x16/disconnect.png',
            text: GeoPatrimoine.lang.PanelHeaderButtonDisconnect,
            width:120,
            margin:4
        }

        ];
    

        this.callParent(arguments);
    }
});
    
