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
        this.title =  GeoPatrimoine.lang.WindowLoginTitle;
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
                        fieldLabel: GeoPatrimoine.lang.WindowLoginFieldLoginLabel,
                        labelWidth: 120,
                        name: 'user_name',
                        margin:4
                       
                    }
                  ,
                   {
                       xtype: 'textfield',
                       fieldLabel: GeoPatrimoine.lang.WindowLoginFieldPasswordLabel,
                       allowBlank: false,
                       labelWidth: 120,
                       inputType:'password',
                       name: 'user_password',
                       margin: 4
                       
                   }
                   ,
                    {
                        xtype: 'checkbox',
                        boxLabel: GeoPatrimoine.lang.WindowLoginFieldCheckAutoConnectLabel,
                        name: 'chk_auto_login',
                        margin: 4
                       
                    }

                ],
                buttons : [
                    {
                        xtype: 'button',
                        itemId: 'buttton-connect',
                        icon: './resources/icons/16x16/connect.png',
                        formBind:true,
                        text:GeoPatrimoine.lang.WindowLoginButtonConnect
                    }
        
                ]
            }
        ];
     

        this.callParent(arguments);
    }

});