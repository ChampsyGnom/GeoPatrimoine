Ext.define('GeoPatrimoine.model.user.User', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo' , 'GeoPatrimoine.model.user.UserProfil'
    ],
    idProperty: 'id',  
    fields: [
         { name: 'id', type: 'int', mapping: 'id', useNull: true, defaultValue: null },
         { name: 'login', type: 'string', mapping: 'login' },
         { name: 'password', type: 'string', mapping: 'password' },
         { name: 'name', type: 'string', mapping: 'name' },
         { name: 'first_name', type: 'string', mapping: 'first_name' },
         { name: 'token', type: 'string', mapping: 'token' },
    ],
    
    associations: [
      {
          type: 'hasMany',
          foreignKey: 'user__id',
          primaryKey: 'id',
          associationKey: 'userProfils',
          name: 'userProfils',
          model: 'GeoPatrimoine.model.user.UserProfil'
      }
       
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
        extraParams: {
            source: 'database',
            output: 'json',
            schemaName: 'public',
            tableName: 'user',
            childTables: Ext.JSON.encode( [
                {
                    tableName: 'user_profil',
                    childTables : [
                    
                                {
                                    tableName: 'profil',
                                    childTables: [
                                        /*
                                        {
                                            tableName: 'profil_permission',
                                            childTables: [
                                                 {
                                                     tableName: 'permission',
                                                     childTables: [
                                                     ]
                                                 }
                                            ]
                                        }
                                        */
                                ]
                        } 
                    ]
                }
            ])
        },
        reader: {
            type: 'json',
            model: 'GeoPatrimoine.model.user.User',
            root: 'datas',
            idProperty: 'id',
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message'

        }
    }
});