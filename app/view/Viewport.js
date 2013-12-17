Ext.define('GeoPatrimoine.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'border',
   
    initComponent: function ()
    {
       
        this.items = [
           {
               xtype: 'panelheader',
               region: 'north'
           }
           ,
           {
               xtype: 'panel',
               itemId:'main-panel',
               hidden:true,
               region: 'center',
               layout: 'border',
               items: [
                   {
                       xtype: 'panel',
                       title: 'Navigation',
                       split: true,
                       width: 260,
                       
                       collapsible:true,
                       layout: {                         
                           type: 'accordion',
                           titleCollapse: false,
                           animate: true
                         
                       },
                       region: 'west',
                       items: [
                           {
                               xtype: 'panelsearch',
                               width: 260,
                               collapsible: true,
                               collapsed:true
                              
                           },
                           {
                               xtype: 'panel',
                               width: 260,
                               collapsible: true,
                               collapsed: false,
                               title: 'Tableau de bord',
                               layout: 'border',
                               items: [
                                   {
                                       xtype: 'paneltemplatelist',
                                       region:'north'
                                   },
                                    {
                                        xtype: 'paneltemplatetree',
                                        region: 'center'
                                    }
                               ]


                           }
                       ]
                   },
                   {
                       xtype: 'tabpanel',
                       split: true,
                       region: 'center',
                       items: [
                           {

                               xtype: 'panel',
                               title: 'Carte',
                               closeable: false,
                               layout: 'border',
                               items: [
                                   {
                                       xtype: 'panelmap',
                                       region:'center'
                                   },
                                   {
                                       xtype: 'toolbarmap',
                                       region:'north'
                                   }
                                 
                               ]
                           }
                       ]
                   },
                   {
                       xtype: 'panel',
                       title: 'Information',
                       width: 200,
                       collapsible: true,
                       layout: {
                           type: 'accordion',
                           titleCollapse: false,
                           animate: true

                       },
                       split: true,
                       region: 'east'
                   },
                   {
                       xtype: 'tabpanel',                     
                       height: 200,
                       collapsible: true,                      
                       split: true,
                       hidden:true,
                       region: 'south'
                   }
               ]
           },
           {

               xtype: 'panel',
               region:'south'
           }
        ];
        this.callParent();
    }
});