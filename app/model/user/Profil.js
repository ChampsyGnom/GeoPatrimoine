Ext.define('GeoPatrimoine.model.user.Profil', {
    requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo', 'GeoPatrimoine.model.user.Permission'],
    extend: 'Ext.data.Model',
    idProperty: 'id',  
    fields: [
         { name: 'id', type: 'int', mapping: 'id', useNull: true, defaultValue: null },
         { name: 'domain__id', type: 'int', mapping: 'domain__id' },
         { name: 'display_name', type: 'text', mapping: 'display_name' }
    ],
    associations: [
     {
         type: 'hasMany',
         foreignKey: 'permission__id',
         primaryKey: 'id',
         associationKey: 'permissions',
         name: 'permissions',
         model: 'GeoPatrimoine.model.user.Permission'
     }
       
    ]

     
    /*
   */
});