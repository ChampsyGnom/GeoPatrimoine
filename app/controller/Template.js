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
                   editFolderClick: this.onEditFolderClick,
                   deleteFolderClick: this.onDeleteFolderClick,
                   addLayerClick: this.onAddLayerClick,
                   editLayerClick: this.onEditLayerClick,
                   deleteLayerClick: this.onDeleteLayerClick,
                   editLayerOrderClick: this.onEditLayerOrderClick

               }
              
           }
       );
        GeoPatrimoine.getApplication().on('selectedTemplateChange', this.onSelectedTemplateChange, this);
        GeoPatrimoine.getApplication().on('userUnlogged', this.onUserUnlogged, this);
        GeoPatrimoine.getApplication().on('userlogged', this.onUserLogged, this);

    },

    //#region Gestion des évenement de login unlogin du user
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
                    me.getComboTemplate().setValue(parseInt(pref.data.value,0));
                }
            });
        }
    },
    //#endregion

    //#region Gestion des évenement ajout,modification supression de dossier
    onDeleteFolderClick: function (nodeId) {
        var folder = GeoPatrimoine.template.getNodeById(nodeId);
        var me = this;
        Ext.Msg.show({
            title: 'Confirmation de suppression',
            msg: 'Etes-vous sur de vouloir supprimer le dossier ' + folder.data.display_name + ' ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (buttonId, text, opts) {
                if (buttonId === 'yes') {
                    var nodeStore = GeoPatrimoine.template.nodes();
                    me.recurseRemoveFolder(nodeStore, folder);
                    nodeStore.remove(folder);
                    nodeStore.getProxy().extraParams.token = GeoPatrimoine.user.data.token;
                    nodeStore.sync(
                    {
                        success: function () {
                            GeoPatrimoine.getApplication().fireEvent('templateHierarchyChange');
                        },
                        failure: function () {

                        }
                    }
                   );

                }
            }
        });
    },
    onEditFolderClick: function (nodeId) {
        var folder = GeoPatrimoine.template.getNodeById(nodeId);
        var window = Ext.create('GeoPatrimoine.view.template.WindowFolder', {
            title: 'Creation d\'un dossier'
        });
        window.show();
        var form = window.down("form");
        form.loadRecord(folder);
        window.down("#buttton-cancel").on('click', this.onButtonCancelEditFolderClick, this, nodeId);
        window.down("#buttton-ok").on('click', this.onButtonOkEditFolderClick, this, nodeId);
    },
    onButtonOkEditFolderClick: function (button, e, nodeId) {
        var me = this;
        var folder = GeoPatrimoine.template.getNodeById(nodeId);
        var window = button.up("window");
        var form = window.down("form");
        var values = form.getValues();
        folder.set(values);
        folder.setDirty();
        var nodeStore = GeoPatrimoine.template.nodes();
        
        nodeStore.getProxy().extraParams.token = GeoPatrimoine.user.data.token;
        nodeStore.sync({
            success: function () {
                GeoPatrimoine.getApplication().fireEvent('templateHierarchyChange');
                window.close();

            },
            failure: function ()
            { window.close(); }
        });
    },
    onButtonCancelEditFolderClick: function (button) {
        var window = button.up("window");
        window.close();
    },
    onAddFolderClick : function(parentId)
    {
        var window = Ext.create('GeoPatrimoine.view.template.WindowFolder', {
            title:'Creation d\'un dossier'
        });
        window.show();
        window.down("#buttton-cancel").on('click', this.onButtonCancelCreateFolderClick, this, parentId);
        window.down("#buttton-ok").on('click', this.onButtonOkCreateFolderClick, this, parentId);
    },
    onButtonOkCreateFolderClick: function (button,e,parentId) {
        var me = this;
        var parentRecord = null;
        if (parentId !== undefined && parentId !== null)
        {
            parentRecord = GeoPatrimoine.template.getNodeById(parentId);
            GeoPatrimoine.user.setPreferenceValue(parentId, "expanded", "true", true);
        }
        var folder = Ext.create('GeoPatrimoine.model.template.Node');
        var window = button.up("window");
        var form = window.down("form");
        var values = form.getValues();
        folder.set(values);
        var nodeStore = GeoPatrimoine.template.nodes();
        folder.data.parent_id = parentId;
        var treeOrder = GeoPatrimoine.template.getNextTreeOrder(parentId);
        folder.data.tree_order = treeOrder;

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
    recurseRemoveFolder: function (store, folder) {
        var me = this;
        store.each(function (node) {
            if (node !== undefined && node.data.parent_id === folder.data.id) {
                store.remove(node);
                me.recurseRemoveFolder(store, node);
            }
        });
    },
    //#endregion


    //#region Gestion des évenement ajout,modification supression de couche
    onAddLayerClick : function (parentId)
    {
        var window = Ext.create('GeoPatrimoine.view.template.WindowLayer', {
            title:'Nouvelle couche'
        });
        window.down("#buttton-cancel").on('click', this.onButtonCancelCreateLayerClick, this, parentId);
        window.down("#buttton-ok").on('click', this.onButtonOkCreateLayerClick, this, parentId);
        window.show();
    },
    //#endregion

    onButtonCancelCreateLayerClick: function (button, e, parentId)
    {
        var window = button.up("window");
        window.close();
    },
    onButtonOkCreateLayerClick: function (button, e, parentId)
    {
        var window = button.up("window");
        var form = window.down("form");
        var values = form.getValues();
        var layer = Ext.create('GeoPatrimoine.model.template.Node');
        layer.set(values);
        layer.data.parent_id = parentId;
        var nodeStore = GeoPatrimoine.template.nodes();

        var treeOrder = GeoPatrimoine.template.getNextTreeOrder(parentId);
        layer.data.tree_order = treeOrder;
        nodeStore.getProxy().extraParams.token = GeoPatrimoine.user.data.token;
        nodeStore.add(layer);
        nodeStore.sync({
            success: function ()
            {
               
                window.close();
                GeoPatrimoine.getApplication().fireEvent('templateHierarchyChange');
                GeoPatrimoine.getApplication().fireEvent('mapLayerListChange');
            },
            failure: function ()
            {
                window.close();
            }
        });
    },
    onEditLayerClick: function (nodeId)
    {
        var record = GeoPatrimoine.template.getNodeById(nodeId);
        var window = Ext.create('GeoPatrimoine.view.template.WindowLayer', {
            title: 'Nouvelle couche'
        });
        window.down("#buttton-cancel").on('click', this.onButtonCancelEditLayerClick, this, nodeId);
        window.down("#buttton-ok").on('click', this.onButtonOkEditLayerClick, this, nodeId);
        window.loadRecord(record);
        window.show();
    },
    onButtonCancelEditLayerClick: function (button, e, nodeId)
    {
        var window = button.up("window");
        window.close();
    },
    onButtonOkEditLayerClick: function (button, e, nodeId)
    {
        var record = GeoPatrimoine.template.getNodeById(nodeId);
        var window = button.up("window");
        var form = window.down("form");
        var values = form.getValues();
        record.set(values);
        record.setDirty();
        var nodeStore = GeoPatrimoine.template.nodes();
        nodeStore.getProxy().extraParams.token = GeoPatrimoine.user.data.token;
        nodeStore.sync({
            success: function () {

                window.close();                
                GeoPatrimoine.getApplication().fireEvent('mapLayerListChange');
            },
            failure: function () {
                window.close();
            }
        });
    },
    onDeleteLayerClick: function (nodeId)
    {
        var record = GeoPatrimoine.template.getNodeById(nodeId);
        var me = this;
        Ext.Msg.show({
            title: 'Confirmation de suppression',
            msg: 'Etes-vous sur de vouloir supprimer la couche ' + record.data.display_name + ' ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (buttonId, text, opts) {
                if (buttonId === 'yes') {
                    var nodeStore = GeoPatrimoine.template.nodes();
                    nodeStore.remove(record);
                    nodeStore.getProxy().extraParams.token = GeoPatrimoine.user.data.token;
                    nodeStore.sync(
                    {
                        success: function () {
                            GeoPatrimoine.getApplication().fireEvent('templateHierarchyChange');
                            GeoPatrimoine.getApplication().fireEvent('mapLayerListChange');
                        },
                        failure: function () {

                        }
                    }
                   );

                }
            }
        });
    },


    editLayerOrderClick: function ()
    { },

    //#region Gestion des évenement ajout,modification supression de template
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
      
     
        GeoPatrimoine.getApplication().fireEvent('mapLayerListChange');

    },
  
    onCreateTemplateClick: function () {
        var window = Ext.create('GeoPatrimoine.view.template.WindowTemplate',
            {
                icon: './resources/icons/16x16/button-template-create.png',
                title: 'Nouveau modele'
            });
        window.show();
        window.down("#buttton-cancel").on('click', this.onButtonCancelCreateTemplateClick,this);
        window.down("#buttton-ok").on('click', this.onButtonOkCreateTemplateClick, this);
    },
    
    
    onDeleteTemplateClick: function (record) {
       
        var me = this;
        Ext.Msg.show({
            title: 'Confirmation de suppression',
            msg: 'Etes-vous sur de vouloir supprimer le modele ' + record.data.display_name + ' ?',
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
                title: 'Modifier le modele'
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

    //#endregion
    



});