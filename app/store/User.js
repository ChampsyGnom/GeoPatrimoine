Ext.define('GeoPatrimoine.store.User', {
    extend: 'Ext.data.Store',
    requires: 'GeoPatrimoine.model.user.User',
    model: 'GeoPatrimoine.model.user.User',
    autoLoad: false,
    listeners: {
        load: function( store, records, successful, eOpts ) 
        {
            if (successful && records.length === 1)
            {
                
            }
            
        }
    }
   
});