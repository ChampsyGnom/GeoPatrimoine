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
               region: 'center'
           }
        ];
        this.callParent();
    }
});