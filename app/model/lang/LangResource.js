Ext.define('GeoPatrimoine.model.lang.LangResource', {
    extend: 'Ext.data.Model',
    fields: [
       { name: 'name', type: 'string' },
       { name: 'value', type: 'string' }
    ],
    proxy:
    {
        pageParam: false,
        startParam: false,
        limitParam: false,              
        noCache: false,
        appendId: false,
        reader: {
            type: 'json',
            root:'datas',
            totalProperty:'count'
        },
        type:'ajax',
        url: './data/lang-resources.php'
    }
});