Ext.define('GeoPatrimoine.controller.Template', {
    extend: 'Ext.app.Controller',
    views: ['user.WindowLogin'],
    refs: [
        {
            ref: 'ComboTemplate',
            selector: 'paneltemplatelist #combo-template'
        },
        {
            ref: 'ButtonCreateTemplate',
            selector: 'paneltemplatelist #button-create-template'
        },
        {
            ref: 'ButtonUpdateTemplate',
            selector: 'paneltemplatelist #button-update-template'
        }, {
            ref: 'ButtonDeleteTemplate',
            selector: 'paneltemplatelist #button-delete-template'
        },
        {
            ref: 'PanelTemplateTree',
            selector: 'paneltemplatetree'
        }],
    init: function () {

        this.control(
           {
               'paneltemplatelist': {
                   createTemplateClick: this.onCreateTemplateClick,
                   updateTemplateClick: this.onUpdateTemplateClick,
                   deleteTemplateClick: this.onDeleteTemplateClick
                  

               },
               'paneltemplatetree': {
                   addFolderClick: this.onAddFolderClick,
                   addLayerClick: this.onAddLayerClick,
                   editLayerOrderClick: this.onEditLayerOrderClick

               }
              
           }
       );
        GeoPatrimoine.getApplication().on('selectedTemplateChange', this.onSelectedTemplateChange, this);
        GeoPatrimoine.getApplication().on('userUnlogged', this.onUserUnlogged, this);
        GeoPatrimoine.getApplication().on('userlogged', this.onUserLogged, this);

    },
    onUserUnlogged : function()
    {
        this.getComboTemplate().setValue(null);
    },
    onUserLogged: function ()
    {
        var me = this;
        if (GeoPatrimoine.user !== null)
        {
            GeoPatrimoine.user.preferences().each(function (pref) {
                if (pref.data.property === 'selected_template')
                {
                    me.getComboTemplate().setValue(parseInt(pref.data.value));
                }
            });
        }
    },
    onAddFolderClick : function(parentId)
    {
        var window = Ext.create('GeoPatrimoine.view.template.WindowFolder', {
            title:'Création d\'un dossier'
        });
        window.show();
        window.down("#buttton-cancel").on('click', this.onButtonCancelCreateFolderClick, this, parentId);
        window.down("#buttton-ok").on('click', this.onButtonOkCreateFolderClick, this, parentId);
    },
    onButtonOkCreateFolderClick: function (button,e,parentId) {
        var me = this;
        var folder = Ext.create('GeoPatrimoine.model.template.Node');
        var window = button.up("window");
        var form = window.down("form");
        var values = form.getValues();
        folder.set(values);
        var nodeStore = GeoPatrimoine.template.nodes();
        folder.data.parent_id = parentId;
        nodeStore.add(folder);
        nodeStore.getProxy().extraParams.token = GeoPatrimoine.user.data.token;
        nodeStore.sync({
            success: function ()

            {
                GeoPatrimoine.getApplication().fireEvent('templateHierarchyChange');
                window.close();

            },
            failure: function ()
            { window.close(); }
        });
    },
    onButtonCancelCreateFolderClick: function (button) {
        var window = button.up("window");
        window.close();
    },
    onAddLayerClick : function ()
    {},
    editLayerOrderClick: function ()
    { },
    
    onSelectedTemplateChange: function (template)
    {
        GeoPatrimoine.template = template;
        this.getButtonUpdateTemplate().disable();
        this.getButtonDeleteTemplate().disable();
        if (GeoPatrimoine.template !== null && GeoPatrimoine.template !== undefined)
        {
            this.getButtonUpdateTemplate().enable();
            this.getButtonDeleteTemplate().enable();
        }
        if (template !== null)
        { GeoPatrimoine.user.setPreferenceValue(null, 'selected_template', template.data.id, true); }
      
     
       

    },
  
    onCreateTemplateClick: function () {
        var window = Ext.create('GeoPatrimoine.view.template.WindowTemplate',
            {
                icon: './resources/icons/16x16/button-template-create.png',
                title: 'Nouveau modèle'
            });
        window.show();
        window.down("#buttton-cancel").on('click', this.onButtonCancelCreateTemplateClick,this);
        window.down("#buttton-ok").on('click', this.onButtonOkCreateTemplateClick, this);
    },
    onDeleteTemplateClick: function (record) {
       
        var me = this;
        Ext.Msg.show({
            title: 'Confirmation de suppression',
            msg: 'Etes-vous sur de vouloir supprimer le modèle ' + record.data.display_name + ' ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (buttonId, text, opts) {
                if (buttonId === 'yes') {
                    var templateStore = Ext.data.StoreManager.lookup('Template');
                    templateStore.remove(record);
                    templateStore.sync(
                    {
                        success: function ()
                        {
                            me.getComboTemplate().setValue(null);
                        },
                        failure: function ()
                        {

                        }
                    }
                   );

                }
            }
        });
        
    },
   
    onButtonCancelCreateTemplateClick: function (button)
    {
        var window = button.up("window");
        window.close();
    },
    onButtonOkCreateTemplateClick: function (button)
    {
        var me = this;
        var window = button.up("window");
        var form = window.down("form");
        var values = form.getValues();
        var template = Ext.create('GeoPatrimoine.model.template.Template');
        template.set(values);
        var templateStore = Ext.data.StoreManager.lookup('Template');
        templateStore.add(template);
        templateStore.sync({
            success: function () {
                window.close();
                me.getComboTemplate().setValue(template.data.id);
            },
            failure: function () {
                window.close();
            }
        });
    },




    onUpdateTemplateClick: function (record) {
        if (this.getComboTemplate().getValue() !== null) {
            var window = Ext.create('GeoPatrimoine.view.template.WindowTemplate',
            {
                icon: './resources/icons/16x16/button-template-create.png',
                title: 'Modifier le modèle'
            });
            window.show();
            var form = window.down("form");
            form.loadRecord(record);
            window.down("#buttton-cancel").on('click', this.onButtonCancelUpdateTemplateClick);
            window.down("#buttton-ok").on('click', this.onButtonOkUpdateTemplateClick, this,record);
        }

    },

    onButtonCancelUpdateTemplateClick: function (button)
    {
        var window = button.up("window");
        window.close();
    },
    onButtonOkUpdateTemplateClick: function (button,scope ,template)
    {
        var me = this;
        var window = button.up("window");
        var form = window.down("form");
        var values = form.getValues();
        var templateStore = Ext.data.StoreManager.lookup('Template');
        template.set(values);
        template.setDirty();
        templateStore.sync({
            success: function () {
                window.close();
                me.getComboTemplate().setValue(template.data.id);
            },
            failure: function () {
                window.close();
            }
        });
    }


    



});