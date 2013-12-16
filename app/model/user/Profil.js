Ext.define('GeoPatrimoine.model.user.Profil', {
    requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo', 'GeoPatrimoine.model.UserProfil'],
    extend: 'Ext.data.Model',
    idProperty: 'id',  
    fields: [
         { name: 'id', type: 'int', mapping: 'id', useNull: true, defaultValue: null },
         { name: 'domain__id', type: 'int', mapping: 'domain__id' },
         { name: 'display_name', type: 'text', mapping: 'display_name' }
    ],
    associations: [
     {
         type: 'belongsTo',
         foreignKey: 'user__id',
         primaryKey: 'id',
         associationKey: 'userProfil',
         name: 'userProfil',
         model: 'GeoPatrimoine.model.UserProfil'
     },
     { type: 'hasOne', model: 'Address' }
       
    ]
    /*
   */
});