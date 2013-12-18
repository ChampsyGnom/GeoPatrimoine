Ext.override(Ext.tree.ViewDropZone, {
    onContainerOver: function (dd, e, data) {
        var defaultCls = this.dropNotAllowed;
        if (this.allowContainerDrops)
            defaultCls = this.dropAllowed;
        return e.getTarget('.' + this.indicatorCls) ? this.currentCls : defaultCls;
    },
    getPosition: function (e, node) {
        var view = this.view,
            record = view.getRecord(node),
            y = e.getPageY(),
            noAppend = record.isLeaf(),
            noBelow = false,
            region = Ext.fly(node).getRegion(),
            fragment;

        // If we are dragging on top of the root node of the tree, we always want to append.
        if (record.isRoot()) {
            return 'append';
        }

        // Return 'append' if the node we are dragging on top of is not a leaf else return false.
        if (this.appendOnly) {
            return noAppend ? false : 'append';
        }

        if (!this.allowParentInsert) {
            noBelow = record.hasChildNodes() && record.isExpanded();
        }

        fragment = (region.bottom - region.top) / (noAppend ? 2 : 3);
        if (y >= region.top && y < (region.top + fragment)) {
            return 'before';
        }
        else if (!noBelow && (noAppend || (y >= (region.bottom - fragment) && y <= region.bottom))) {
            return 'after';
        }
        else if (this.allowContainerDrops && (y >= region.bottom)) {
            return 'after';
        }
        else {
            return 'append';
        }
    }
});
Ext.override(Ext.view.DropZone, {
    // The mouse is past the end of all nodes (or there are no nodes)
    onContainerOver: function (dd, e, data) {
        var me = this,
            view = me.view,
            count = view.store.getCount();

        // There are records, so position after the last one
        if (count) {
            me.positionIndicator(view.getNode(count - 1), data, e);
        }

            // No records, position the indicator at the top
        else {
            delete me.overRecord;
            delete me.currentPosition;
            me.getIndicator().setWidth(Ext.fly(view.el).getWidth()).showAt(0, 0);
            me.valid = true;
        }
        return me.dropAllowed;
    },
    getTargetFromEvent: function (e) {

        var node = e.getTarget(this.view.getItemSelector()),
            mouseY, nodeList, testNode, i, len, box;

        //      Not over a row node: The content may be narrower than the View's encapsulating element, so return the closest.
        //      If we fall through because the mouse is below the nodes (or there are no nodes), we'll get an onContainerOver call.
        if (!node) {
            mouseY = e.getPageY();
            for (i = 0, nodeList = this.view.getNodes(), len = nodeList.length; i < len; i++) {
                testNode = nodeList[i];
                box = Ext.fly(testNode).getBox();
                if (mouseY <= box.bottom) {
                    return testNode;
                }
            }
            if (this.allowContainerDrops) {
                return nodeList[nodeList.length - 1];
            }
        }
        return node;
    }

});

Ext.application({
    name: 'GeoPatrimoine',
    autoCreateViewport: false,
    requires: [
        'GeoPatrimoine.view.header.PanelHeader',
        'GeoPatrimoine.view.user.WindowLogin',
        'GeoPatrimoine.util.MD5',
        'GeoPatrimoine.view.map.ToolbarMap',
        'GeoPatrimoine.view.map.PanelMap',
        'GeoPatrimoine.view.search.PanelSearch',        
        'GeoPatrimoine.view.template.PanelTemplateTree',
        'GeoPatrimoine.view.template.PanelTemplateList',
        'GeoPatrimoine.view.template.WindowTemplate',
        'GeoPatrimoine.view.search.FieldGoogleLocationSearch',
        'GeoPatrimoine.view.template.WindowFolder',
        'GeoPatrimoine.view.template.WindowLayer',
        'GeoPatrimoine.view.template.PanelLayerTile'
    ],
    models: ['lang.Lang', 'lang.LangResource', 'user.User','template.Template','template.Node','template.NodeType','Param','style.Style','style.Rule','style.Label','WmsLayer'],
    stores: ['GeoPatrimoine.store.LangResource', 'User', 'Template','NodeType','WmsLayer'],
    controllers: ['User','Template','Map'],
    init: function (application) {
        console.log("init");
     
    }

    ,
    launch: function ()
    {
        GeoPatrimoine.template = null;
        GeoPatrimoine.updateAdminComponentsVisibility = function () {
            var adminComponents = Ext.ComponentQuery.query("[isNonAdminHidden=true]");
            var funcSetVisibility = null;
            if (GeoPatrimoine.user === undefined)
            { funcSetVisibility = function (item) { item.hide(); }; }
            else if (Ext.isEmpty(GeoPatrimoine.user))
            { funcSetVisibility = function (item) { item.hide(); }; }
            else if (GeoPatrimoine.user.isGeoPatrimoineAdministrator() === false)
            { funcSetVisibility = function (item) { item.hide(); }; }
            else
            { funcSetVisibility = function (item) { item.show(); }; }
            for (var i = 0 ; i < adminComponents.length; i++) {
                funcSetVisibility(adminComponents[i]);
            }
        };
        var storeManager = Ext.data.StoreManager;
        console.log("launch");
        var storeLangResource = storeManager.lookup('GeoPatrimoine.store.LangResource');
        storeLangResource.load(
            {
                callback: function ()
                {
                    Ext.create('GeoPatrimoine.view.Viewport');
                    GeoPatrimoine.getApplication().getController('User').autoLogin();
                   
                    
                }
            }
            );
       
       
        console.log(window.location);


    }

});