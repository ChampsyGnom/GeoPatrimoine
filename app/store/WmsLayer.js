Ext.define('GeoPatrimoine.store.WmsLayer', {
    extend: 'Ext.data.Store',
    requires: 'GeoPatrimoine.model.WmsLayer',
    model: 'GeoPatrimoine.model.WmsLayer',
    autoLoad: false

});