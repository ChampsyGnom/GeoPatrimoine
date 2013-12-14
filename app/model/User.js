Ext.define('GeoPatrimoine.model.User', {
    extend: 'Ext.data.Model',
    idProperty: 'id',  
    fields: [
         { name: 'id', type: 'int', mapping: 'id', useNull: true, defaultValue: null },
         { name: 'login', type: 'string', mapping: 'login' },
         { name: 'password', type: 'string', mapping: 'password' },
         { name: 'name', type: 'string', mapping: 'name' },
         { name: 'first_name', type: 'string', mapping: 'first_name' },
    ],   
    proxy:
    {
        pageParam: false,
        startParam: false,
        limitParam: false,
        appendId: false,
        noCache: false,
        type: 'rest',
        url: './data/rest-service.php',
        reader: {
            type: 'json',
            model: 'GeoPatrimoine.model.User',
            root: 'datas',
            idProperty: 'id',
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message'

        }
    }
});