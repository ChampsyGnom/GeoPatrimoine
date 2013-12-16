Ext.define('GeoPatrimoine.model.user.ProfilPermission', {
    requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo'],
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
         { name: 'id', type: 'int', mapping: 'id', useNull: true, defaultValue: null },
         { name: 'profil__id', type: 'int', mapping: 'profil__id' },
         { name: 'permission__id', type: 'int', mapping: 'permission__id' },
         { name: 'allowed', type: 'boolean', mapping: 'allowed' },
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
     { type: 'hasOne', model: 'GeoPatrimoine.model.Profil' },
     { type: 'hasOne', model: 'GeoPatrimoine.model.Permission' }

    ]
    /*
   */
});