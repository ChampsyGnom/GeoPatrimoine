Ext.define('GeoPatrimoine.store.User', {
    extend: 'Ext.data.Store',
    requires: 'GeoPatrimoine.model.user.User',
    model: 'GeoPatrimoine.model.user.User',
    autoLoad: false,
    listeners: {
        load: function( store, records, successful, eOpts ) 
        {
            console.log("Utilisateur "+records[0].data.first_name+" "+records[0].data.name);
            console.log(records);
            for (var i = 0 ; i < records.length; i++)
            {
                var record = records[i];
                record.userProfils().each(function (userProfil) {
                  
                    console.log("userProfils " + userProfil.data.profil__id);
                    var profil = userProfil.profil();
                    console.log("profil " + profil.data.id);
                   // var profil = userProfil.profil();

                });
            }
        }
    }
   
});