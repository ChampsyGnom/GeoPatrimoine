Ext.define('GeoPatrimoine.model.style.Style', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo', 'GeoPatrimoine.model.style.Rule', 'GeoPatrimoine.model.style.Label'],
    fields: [
         { name: 'id', type: 'int', mapping: 'id', useNull: true, defaultValue: -1 },
         { name: 'node__id', type: 'int', mapping: 'node__id' },
         { name: 'display_name', type: 'string', defaultValue: 'Nouveau style', mapping: 'display_name' },        
         { name: 'type_style', type: 'string', defaultValue: 'simple', mapping: 'type_style' },
         { name: 'is_default', type: 'integer', defaultValue: 0, mapping: 'is_default' },        
         { name: 'is_checked', type: 'boolean', defaultValue:false,persist:false }
        
    ]
    ,
    associations: [

        {
            type: 'hasMany',
            foreignKey: 'style__id',
            primaryKey: 'id',
            associationKey: 'rules',
            name: 'rules',
            model: 'GeoPatrimoine.model.style.Rule'
        },
         {
             type: 'hasMany',
             foreignKey: 'style__id',
             primaryKey: 'id',
             associationKey: 'labels',
             name: 'labels',
             model: 'GeoPatrimoine.model.style.Label'
         }
    ],
    proxy:
    {
        pageParam: false,
        startParam: false,
        limitParam: false,
        batchActions: true,
        batchOrder: 'destroy,create,update',
        noCache: false,
        appendId: false,
        type: 'rest',
        url: './data/rest.php',
        extraParams: {
            schemaName: 'public',
            tableName: 'style',
            childTables: Ext.JSON.encode([
            {
                    tableName: 'rule',
                    childTables: []
            },
            {
                tableName: 'label',
                childTables: []
            }
            ])
        },
        reader: {
            type: 'json',
            model: 'GeoPatrimoine.model.style.Style',
            root: 'datas',
            idProperty: 'id',
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message'

        }
    },
    createMapRules: function (addLabel,addFilterData) {
     
        
        var allRules = [];
        var me = this;
        this.rules().each(function (ruleItem) {
            if (addLabel) {
                var labels = [];

                me.labels().each(function (label) {
                    labels.push(label.createLabel());
                });
                allRules.push(ruleItem.createRuleMultiPolygon(addFilterData, labels,false));
                allRules.push(ruleItem.createRulePolygon(addFilterData, labels, false));
                allRules.push(ruleItem.createRulePoint(addFilterData, labels, false));
                allRules.push(ruleItem.createRuleMultiPoint(addFilterData, labels, false));
                allRules.push(ruleItem.createRuleLine(addFilterData, [], false));
                allRules.push(ruleItem.createRuleMultiLine(addFilterData, [], false));


                allRules.push(ruleItem.createRuleMultiPolygon(addFilterData, labels,true));
                allRules.push(ruleItem.createRulePolygon(addFilterData, labels, true));
                allRules.push(ruleItem.createRulePoint(addFilterData, labels, true));
                allRules.push(ruleItem.createRuleMultiPoint(addFilterData, labels, true));
                allRules.push(ruleItem.createRuleLine(addFilterData, [], true));
                allRules.push(ruleItem.createRuleMultiLine(addFilterData, [], true));
            }
            else {
                allRules.push(ruleItem.createRuleMultiPolygon(addFilterData, [], false));
                allRules.push(ruleItem.createRulePolygon(addFilterData, [], false));
                allRules.push(ruleItem.createRulePoint(addFilterData, [], false));
                allRules.push(ruleItem.createRuleMultiPoint(addFilterData, [], false));
                allRules.push(ruleItem.createRuleLine(addFilterData, [], false));
                allRules.push(ruleItem.createRuleMultiLine(addFilterData, [], false));

                allRules.push(ruleItem.createRuleMultiPolygon(addFilterData, [], true));
                allRules.push(ruleItem.createRulePolygon(addFilterData, [], true));
                allRules.push(ruleItem.createRulePoint(addFilterData, [], true));
                allRules.push(ruleItem.createRuleMultiPoint(addFilterData, [], true));
                allRules.push(ruleItem.createRuleLine(addFilterData, [], true));
                allRules.push(ruleItem.createRuleMultiLine(addFilterData, [], true));
            }
           
           
        });

        return allRules;
    },
    createMapStyle: function (addLabel,addDataFilter) {        
        var style = null;
      
        var rules = this.createMapRules(addLabel, addDataFilter);
        style = new ol.style.Style({
            rules: rules
        });
        return style;
    }
    /*
    createMapStyleWithDataFilter: function () {
        var style = null;

        var rules = this.createMapRules(true);
        style = new ol.style.Style({
            rules: rules
        });
        return style;
    }*/
});