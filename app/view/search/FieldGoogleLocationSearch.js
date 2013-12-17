Ext.define('GeoPatrimoine.view.search.FieldGoogleLocationSearch', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget.fieldgooglelocationsearch',
    height: 300,
    layout: {
        type: 'vbox',
        align:'stretch'
    },
    initComponent: function (config) {
        this.items = [
            {
                xtype: 'textfield',
                itemId: 'txt-search',
                listeners: {
                    change: function (txt, newValue, oldValue, eOpts) {
                        txt.up("fieldgooglelocationsearch").search(newValue);

                    }
                }
            }
           
            ,
            {
                xtype:'gridpanel',  
                height:100,
                itemId: 'grid-result',
                store: Ext.create('Ext.data.Store', {

                    fields: ['formatted_address']

                }),
                columns: [
                    { text: 'Localisation', dataIndex: 'formatted_address' }

                ],
                forceFit: true,
                listeners: {

                    selectionchange: function (view, selected, eOpts) {
                        var grid = view.view.ownerCt;
                        
                        if (selected !== null && selected.length === 1) {
                            var locationX = selected[0].raw.geometry.location.lng;
                            var locationY = selected[0].raw.geometry.location.lat;

                            grid.up("fieldgooglelocationsearch").fireEvent('locationChange', locationX, locationY);

                        }
                    },
                    itemdblclick: function (grid, record, item, index, e, eOpts) {
                        eCarto.getApplication().fireEvent('teleportTo', '4326', record.raw.geometry.location.lng, record.raw.geometry.location.lat);
                    }

                }
            }
        ];
        this.callParent(arguments);
    },
    search: function (address) {
        var me = this;
        Ext.Ajax.cors = true;
        Ext.Ajax.useDefaultXhrHeader = false;
        Ext.Ajax.request({
            cors: true,
            url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&sensor=true',
            success: function (response) {
                var text = response.responseText;
                var json = Ext.JSON.decode(text);
                if (json.results !== undefined &&
                    json.results.length > 0 &&
                    json.results[0].geometry !== undefined &&
                    json.results[0].geometry.location !== undefined &&
                    json.results[0].geometry.location.lat !== undefined &&
                    json.results[0].geometry.location.lng !== undefined
                    ) {
                    me.down("#grid-result").getStore().loadData(json.results);
                    
                }
            }
        });
    }
});

