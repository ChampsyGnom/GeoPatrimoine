Ext.define('GeoPatrimoine.model.user.UserProfil', {
    requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo'
       // , 'GeoPatrimoine.model.User'
    ],
    extend: 'Ext.data.Model',
    idProperty: 'id',  
    fields: [
         { name: 'id', type: 'int', mapping: 'id', useNull: true, defaultValue: null },
         { name: 'profil__id', type: 'int', mapping: 'profil__id' },
         { name: 'user__id', type: 'int', mapping: 'user__id' }
    ],

    
    associations:
        [ { type: 'hasOne', model: 'Status', associationKey: 'status'  }  ]
     
     
      
   
});