Ext.define('GeoPatrimoine.model.user.Permission', {
    requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo'],
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
         { name: 'id', type: 'int', mapping: 'id', useNull: true, defaultValue: null },
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
     { type: 'hasOne', model: 'GeoPatrimoine.model.Profil' },
     { type: 'hasOne', model: 'GeoPatrimoine.model.Permission' }

    ]
    /*
   */
});