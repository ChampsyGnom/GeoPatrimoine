Ext.define('GeoPatrimoine.store.User', {
    extend: 'Ext.data.Store',
    requires: 'GeoPatrimoine.model.user.User',
    model: 'GeoPatrimoine.model.user.User',
    autoLoad: false,
    listeners: {
        beforeload: function (store, operation, eOpts)
        {
            var proxy = store.getProxy();
            console.log(proxy);
        },
        load: function( store, records, successful, eOpts ) 
        {
            if (successful && records.length === 1)
            {
                var record = records[0];
                console.log("Nombre de préférence " + record.preferences().getCount());
              
            }
            
        }
    }
   
});