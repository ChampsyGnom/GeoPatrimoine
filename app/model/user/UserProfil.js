Ext.define('GeoPatrimoine.model.user.UserProfil', {
    requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo'
        , 'GeoPatrimoine.model.user.Profil'
    ],
    extend: 'Ext.data.Model',
    idProperty: 'id',  
    fields: [
         { name: 'id', type: 'int', mapping: 'id', useNull: true, defaultValue: null },
         { name: 'profil__id', type: 'int', mapping: 'profil__id' },
         { name: 'user__id', type: 'int', mapping: 'user__id' }
    ],
   
    associations : [{
        type : 'hasOne',
        model: 'GeoPatrimoine.model.user.Profil',
        primaryKey: 'id',
        name: 'profil',
        getterName:'profil',
        associationKey: 'profil',
        foreignKey: 'profil__id' 
        
    }]
    /*
    , {
        type: 'belongsTo',
        model: 'GeoPatrimoine.model.user.User',
        associationName: 'user',
        primaryKey: 'id',
        foreignKey: 'user__id'
       
    } ]*/
   
     
      
   
});