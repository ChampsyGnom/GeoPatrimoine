Ext.define('GeoPatrimoine.store.LangResource', {
    extend: 'Ext.data.Store',
    requires: 'GeoPatrimoine.model.LangResource',
    model: 'GeoPatrimoine.model.LangResource',
    autoLoad: false,
    autoSync: false, 
    listeners : {
        beforeload : function ( store, operation, eOpts )
        {
            store.getProxy().extraParams.lang = GeoPatrimoine.model.Lang.currentLang;
           
        },
        load: function  (store, records, successful, eOpts)
        {
            store.each(function (record) {
                GeoPatrimoine.model.Lang[record.data.name] = record.data.value;               
            });
        }
    }
});