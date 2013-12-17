Ext.define('GeoPatrimoine.model.user.User', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo', 'GeoPatrimoine.model.user.Profil','GeoPatrimoine.model.user.Preference'],
    idProperty: 'id',  
    fields: [
         { name: 'id', type: 'int', mapping: 'id', useNull: true, defaultValue: null },
         { name: 'login', type: 'string', mapping: 'login' },
         { name: 'password', type: 'string', mapping: 'password' },
         { name: 'name', type: 'string', mapping: 'name' },
         { name: 'first_name', type: 'string', mapping: 'first_name' },
         { name: 'token', type: 'string', mapping: 'token' },
    ],
    
    isGeoPatrimoineAdministrator: function ()
    {
        var result = false;
        this.profils().each(function (profil) {
            if (profil.data.id === 1)
            {
                profil.permissions().each(function (permission) {
                    if (permission.data.id === 1)
                    { result = true; }
                });
            }
        });
        return result;

    },
    associations: [
      {
          type: 'hasMany',
          foreignKey: 'profil__id',
          primaryKey: 'id',
          associationKey: 'profils',
          name: 'profils',
          model: 'GeoPatrimoine.model.user.Profil'
      },
       {
           type: 'hasMany',
           foreignKey: 'user__id',
           primaryKey: 'id',
           associationKey: 'preferences',
           name: 'preferences',
           model: 'GeoPatrimoine.model.user.Preference'
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
                    tableName: 'profil',
                    childTables : [
                        {
                            tableName: 'permission',
                            childTables: [


                            ]
                        }
                        
                                
                    ]
                },
                {
                    tableName: 'preference',
                    childTables: [


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
    },
    setPreferenceValue: function (nodeId, property, value, autoSync) {
        var item = null;
        this.preferences().getProxy().extraParams.token = GeoPatrimoine.user.data.token;
        this.preferences().each(function (prfItem) {
            if (prfItem.data.user__id === GeoPatrimoine.user.data.id
                && prfItem.data.node__id === nodeId
                && prfItem.data.property === property) {
                item = prfItem;
            }
        });
        if (item === null) {
            item = Ext.create('GeoPatrimoine.model.user.Preference');
            item.data.user__id = GeoPatrimoine.user.data.id;
            item.data.node__id = nodeId;
            item.data.property = property;
            item.data.value = value;
            this.preferences().add(item);
        }
        else {
            item.data.value = value;
            item.setDirty();
        }
        if (autoSync === true)
        { this.preferences().sync(); }

    },
    getPreferenceValue: function (nodeId, property) {
        var value = null;
        this.preferences().each(function (prfItem) {
            if (prfItem.data.user__id === GeoPatrimoine.user.data.id
                && prfItem.data.node__id === nodeId
                && prfItem.data.property === property) {
                value = prfItem.data.value;
            }
        });
        return value;
    }
});