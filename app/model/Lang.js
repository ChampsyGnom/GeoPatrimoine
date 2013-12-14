Ext.define('GeoPatrimoine.model.Lang', {
    extend: 'Ext.util.Observable',
    singleton: true,
    currentLang :'fr',
    constructor : function()
    {
        var datas = Ext.Object.fromQueryString(window.location.search);          
        if (datas.lang !== undefined)
        { this.currentLang = datas.lang;}
    }


  
});