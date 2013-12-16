Ext.define('GeoPatrimoine.store.User', {
    extend: 'Ext.data.Store',
    requires: 'GeoPatrimoine.model.user.User',
    model: 'GeoPatrimoine.model.user.User',
    autoLoad: false,
    listeners: {
        load: function( store, records, successful, eOpts ) 
        {
            console.log(records);
            for (var i = 0 ; i < records.length; i++)
            {
                var record = records[i];
                record.userProfils().each(function (item) {
                    console.log(item);
                });
            }
        }
    }
   
});