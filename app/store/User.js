Ext.define('GeoPatrimoine.store.User', {
    extend: 'Ext.data.Store',
    requires: 'GeoPatrimoine.model.user.User',
    model: 'GeoPatrimoine.model.user.User',
    autoLoad: false
   
});