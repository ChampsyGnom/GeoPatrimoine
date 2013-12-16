Ext.define('GeoPatrimoine.store.LangResource', {
    extend: 'Ext.data.Store',
    requires: 'GeoPatrimoine.model.lang.LangResource',
    model: 'GeoPatrimoine.model.lang.LangResource',
    autoLoad: false,
    autoSync: false, 
    listeners : {
        beforeload : function ( store, operation, eOpts )
        {
            store.getProxy().extraParams.lang = GeoPatrimoine.model.lang.Lang.currentLang;
           
        },
        load: function  (store, records, successful, eOpts)
        {
            GeoPatrimoine.lang = {};
            store.each(function (record) {
                GeoPatrimoine.lang[record.data.name] = record.data.value;               
            });
        }
    }
});