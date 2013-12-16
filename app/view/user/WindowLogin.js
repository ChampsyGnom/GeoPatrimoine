Ext.define('GeoPatrimoine.view.user.WindowLogin', {

    extend: 'Ext.window.Window',
    alias: 'widget.windowlogin',
    width: 400,
    closable: false,
    icon:'./resources/icons/32x32/user.png',
    resizable: false,
    modal: true,
    title: 'Authentification',
    initComponent: function (config) {
        this.title =  GeoPatrimoine.model.Lang.langViewWindowLoginTitle;
        this.items=  [
            {
                xtype: 'form',
                layout: {
                    type: 'vbox',
                    align:'stretch'
                },
                items: [
                    {
                        xtype: 'textfield',
                        allowBlank:false,
                        fieldLabel: GeoPatrimoine.model.Lang.langViewWindowLoginFieldLoginLabel,
                        labelWidth: 120,
                        name: 'user_name',
                        margin:4
                       
                    }
                  ,
                   {
                       xtype: 'textfield',
                       fieldLabel: GeoPatrimoine.model.Lang.langViewWindowLoginFieldPasswordLabel,
                       allowBlank: false,
                       labelWidth: 120,
                       inputType:'password',
                       name: 'user_password',
                       margin: 4
                       
                   }
                   ,
                    {
                        xtype: 'checkbox',
                        boxLabel: GeoPatrimoine.model.Lang.langViewWindowLoginFieldCheckAutoConnectLabel,
                        name: 'chk_auto_login',
                        margin: 4
                       
                    }

                ],
                buttons : [
                    {
                        xtype: 'button',
                        itemId: 'buttton-connect',
                        formBind:true,
                        text:GeoPatrimoine.model.Lang.langViewWindowLoginButtonConnect
                    }
        
                ]
            }
        ];
     

        this.callParent(arguments);
    }

});