Ext.define('eCarto.model.Rule', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo'],
   
    fields: [
          { name: 'id', type: 'int', mapping: 'id', useNull: true, defaultValue: null },
          { name: 'style__id', type: 'int', mapping: 'style__id' },
          { name: 'display_name', type: 'string', defaultValue: 'Règle simple', mapping: 'display_name' },
          { name: 'base_color', type: 'string', defaultValue: 'FFC166', mapping: 'base_color' },
          { name: 'point_type', type: 'string', defaultValue: 'symbol', mapping: 'point_type' },
          { name: 'symbol_type', type: 'string', defaultValue: 'circle', mapping: 'symbol_type' },
          { name: 'point_symbol_opacity', type: 'integer', defaultValue: 90, mapping: 'point_symbol_opacity' },
          { name: 'point_symbol_size', type: 'integer', defaultValue: 12, mapping: 'point_symbol_size' },
          { name: 'point_stroke_color', type: 'string', defaultValue: 'C0C0C0', mapping: 'point_stroke_color' },
          { name: 'point_stroke_style', type: 'string', defaultValue: 'solid', mapping: 'point_stroke_style' },
          { name: 'point_stroke_width', type: 'integer', defaultValue: 1, mapping: 'point_stroke_width' },
          { name: 'point_stroke_opacity', type: 'integer', defaultValue: 90, mapping: 'point_stroke_opacity' },
          { name: 'point_icon_file', type: 'string', defaultValue: null, mapping: 'point_icon_file' },
          { name: 'point_icon_opacity', type: 'integer', defaultValue: 90, mapping: 'point_icon_opacity' },
          { name: 'point_icon_width', type: 'integer', defaultValue: 12, mapping: 'point_icon_width' },
          { name: 'point_icon_height', type: 'integer', defaultValue: 12, mapping: 'point_icon_height' },
          { name: 'point_icon_rotation', type: 'integer', defaultValue: 0, mapping: 'point_icon_rotation' },
          { name: 'point_icon_offset_x', type: 'integer', defaultValue:0, mapping: 'point_icon_offset_x' },
          { name: 'point_icon_offset_y', type: 'integer', defaultValue: 0, mapping: 'point_icon_offset_y' },
          { name: 'line_stroke_size', type: 'integer', defaultValue: 4, mapping: 'line_stroke_size' },
          { name: 'line_stroke_opacity', type: 'integer', defaultValue: 100, mapping: 'line_stroke_opacity' },
          { name: 'line_stroke_style', type: 'string', defaultValue: 'solid', mapping: 'line_stroke_style' },
          { name: 'line_out_stroke_style', type: 'string', defaultValue: 'solid', mapping: 'line_out_stroke_style' },
          { name: 'line_out_stroke_color', type: 'string', defaultValue: 'FFFFFF', mapping: 'line_out_stroke_color' },
          { name: 'line_out_stroke_width', type: 'integer', defaultValue: 1, mapping: 'line_out_stroke_width' },
          { name: 'line_out_stroke_opacity', type: 'integer', defaultValue: 80, mapping: 'line_out_stroke_opacity' },
          { name: 'polygon_opacity', type: 'integer', defaultValue: 100, mapping: 'polygon_opacity' },
          { name: 'polygon_stroke_style', type: 'string', defaultValue: 'solid', mapping: 'polygon_stroke_style' },
          { name: 'polygon_stroke_color', type: 'string', defaultValue: 'FFFFFF', mapping: 'polygon_stroke_color' },
          { name: 'polygon_stroke_width', type: 'integer', defaultValue: 1, mapping: 'polygon_stroke_width' },
          { name: 'polygon_stroke_opacity', type: 'integer', defaultValue: 80, mapping: 'polygon_stroke_opacity' },          
          { name: 'filter_min_value', type: 'float', defaultValue: null, useNull: true, mapping: 'filter_min_value' },
          { name: 'filter_max_value', type: 'float', defaultValue: null, useNull: true, mapping: 'filter_max_value' },
          { name: 'filter_unique_value', type: 'float', defaultValue: null, useNull: true, mapping: 'filter_unique_value' },
          { name: 'filter_unique_string', type: 'string', defaultValue: null, useNull: true, mapping: 'filter_unique_string' },
          { name: 'filter_column', type: 'string', defaultValue: null, useNull: true, mapping: 'filter_column' }

    ],
    createDataFilter: function ()
    {
        var result = null;
        if (this.data.filter_min_value !== null && this.data.filter_max_value !== null)
        {
            result=  this.data.filter_column + " > " + this.data.filter_min_value + " && " + this.data.filter_column + " < " + this.data.filter_max_value;
        }
        else if (this.data.filter_min_value === null && this.data.filter_max_value !== null)
        {
            result = this.data.filter_column + " < " + this.data.filter_max_value;
        }
        else if (this.data.filter_min_value !== null && this.data.filter_max_value === null)
        {
            result = this.data.filter_column + " < " + this.data.filter_max_value;
        }
        else if (this.data.filter_unique_value !== null && this.data.filter_max_value === null && this.data.filter_min_value === null)
        {
            result = this.data.filter_column + " == " + this.data.filter_unique_value;
        }
        else if (this.data.filter_unique_string !== null) {
            if (this.data.filter_unique_string === 'Non renseigné')
            {
                result = this.data.filter_column + ' == null';
            }
            else
            {
                result = this.data.filter_column + ' == "' + this.data.filter_unique_string + '"';
            }
           
        }
        if (result !== null)
        {
            console.log(result);
        }
        return result;
    },
    associations: [
       { type: 'belongsTo', model: 'Style', primaryKey: 'id', foreignKey: 'style__id' }
    ],
    toDescriptionString : function()
    {
        if (this.data.filter_column === null)
        { return "Tous les enregistrements"; }
        else {
            if (this.data.filter_unique_value !== null)
            {
                return this.data.filter_column + " = " + this.data.filter_unique_value;
            }
            else if (this.data.filter_unique_string !== null)
            {
                return this.data.filter_column + " = " + this.data.filter_unique_string;
            }
            else if (this.data.filter_min_value !== null && this.data.filter_max_value === null) {
                return this.data.filter_column + " > " + this.data.filter_min_value;
            }
            else if (this.data.filter_min_value === null && this.data.filter_max_value !== null) {
                return this.data.filter_column + " < " + this.data.filter_max_value;
            }
            else if (this.data.filter_min_value !== null && this.data.filter_max_value !== null) {
                return this.data.filter_min_value+" < " +this.data.filter_column + " < " + this.data.filter_max_value;
            }
        }
        return "Tous les enregistrements";
    },
    proxy:
    {
        pageParam: false,
        startParam: false,
        limitParam: false,
        batchActions: true,
        batchOrder: 'update,destroy,create',
        noCache: false,
        appendId: false,
        type: 'rest',
        url: './data/rest.php',
        extraParams: {
            schemaName: 'public',
            tableName: 'rule',
            childTables: Ext.JSON.encode([])
        },
        reader: {
            type: 'json',
            model: 'eCarto.model.Rule',
            root: 'datas',
            idProperty: 'id',
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message'

        }
    },
  
    createSymbolizerPolygon: function (selected)
    {
        var symbolizers = [];
        if (selected === true)
        {
            symbolizers.push(new ol.style.Fill({
                color: '#' + this.data.base_color,
                opacity: parseFloat(this.data.polygon_opacity) / 100
            }));
            symbolizers.push(new ol.style.Stroke({
                color: '#' + this.data.polygon_stroke_color,
                opacity: parseFloat(this.data.polygon_stroke_opacity) / 100,
                width: parseFloat(this.data.polygon_stroke_width) 
            }));
        }
        else
        {
            symbolizers.push(new ol.style.Fill({
                color: '#' + this.data.base_color,
                opacity: parseFloat(this.data.polygon_opacity) / 100
            }));
            symbolizers.push(new ol.style.Stroke({
                color: '#' + this.data.polygon_stroke_color,
                opacity: parseFloat(this.data.polygon_stroke_opacity) / 100,
                width: parseFloat(this.data.polygon_stroke_width)
            }));
        }
               
          

        return symbolizers;
        },
    createSymbolizerLine: function (selected) {

        //  var symbolizers = style.createMapLabelSymbolizer();
        // pas encore implémenté
        var symbolizers = [];
        symbolizers.push(new ol.style.Stroke({
            color: '#' + this.data.line_out_stroke_color,
            opacity: parseFloat(this.data.line_out_stroke_opacity) / 100,
            width: this.data.line_stroke_size + (2 * this.data.line_out_stroke_width)

        }));
        symbolizers.push(new ol.style.Stroke({
            color: '#' + this.data.base_color,
            opacity: this.data.line_stroke_opacity / 100,
            width: this.data.line_stroke_size
        }));
        return symbolizers;

    },
    createSymbolizerPoint: function (selected)
    {
       
        var symbolizers = [];
        if (this.data.point_type === 'symbol')
        {
            
            symbolizers.push(new ol.style.Shape({
                size: this.data.point_symbol_size,
                fill: new ol.style.Fill({
                    color: '#' + this.data.base_color,
                    opacity: parseFloat(this.data.point_symbol_opacity) / 100
                }),
                stroke: new ol.style.Stroke({
                    color: '#' + this.data.point_stroke_color,
                    opacity: this.data.point_symbol_opacity / 100,
                    width: this.data.point_stroke_width
                })
            }));
          
            
            
            
        }
        else if (this.data.point_type === 'image') {
            symbolizers.push(new ol.style.Icon({
                url: this.data.point_icon_file,
                width: this.data.point_icon_width,
                height: this.data.point_icon_height,
                opacity: this.data.point_icon_opacity / 100,
                rotation: this.data.point_icon_rotation,
                xOffset: this.data.point_icon_offset_x,
                yOffset: this.data.point_icon_offset_y
            }));
        }
        
        return symbolizers;
      
    },
    createRulePoint: function (addfilter,labels,selected)
    {
        var filter = 'geometryType("point")';
        if (selected === true)
        { filter += ' && renderIntent("selected")'; }
       
        if (addfilter === true) {
            var dataFilter = this.createDataFilter();
            if (dataFilter !== null) {
                filter = filter + ' && ' + dataFilter;
            }
        }
        return new ol.style.Rule({
            filter: filter,
            symbolizers: this.createSymbolizerPoint(selected).concat(labels)
        });
    },
    createRuleMultiPoint: function (addfilter, labels, selected) {
        var filter = 'geometryType("multipoint")';
        if (selected === true)
        { filter += ' && renderIntent("selected")'; }
        if (addfilter === true) {
            var dataFilter = this.createDataFilter();
            if (dataFilter !== null) {
                filter = filter + ' && ' + dataFilter;
            }
        }
        return new ol.style.Rule({
            filter: filter,
            symbolizers: this.createSymbolizerPoint(selected).concat(labels)
        });
    },
    createRuleLine: function (addfilter, labels, selected) {
        var filter = 'geometryType("linestring")';
        if (selected === true)
        { filter += ' && renderIntent("selected")'; }
        if (addfilter === true) {
            var dataFilter = this.createDataFilter();
            if (dataFilter !== null) {
                filter = filter + ' && ' + dataFilter;
            }
        }
        return new ol.style.Rule({
            filter: filter,
            symbolizers: this.createSymbolizerLine(selected).concat(labels)
        });
    },
    createRuleMultiLine: function (addfilter, labels, selected) {
        var filter = 'geometryType("multilinestring")';
        if (selected === true)
        { filter += ' && renderIntent("selected")'; }
        if (addfilter === true) {
            var dataFilter = this.createDataFilter();
            if (dataFilter !== null) {
                filter = filter + ' && ' + dataFilter;
            }
        }
        return new ol.style.Rule({
            filter: filter,
            symbolizers: this.createSymbolizerLine(selected).concat(labels)
        });
    },
    createRulePolygon: function (addfilter, labels, selected) {
        var symbolizers = [];
        var symbolizersRender = this.createSymbolizerPolygon(selected);
        var i;
       

        for (i = 0 ; i < symbolizersRender.length; i++)
        { symbolizers.push(symbolizersRender[i]); }

        for (i = 0 ; i < labels.length; i++)
        { symbolizers.push(labels[i]); }

        var filter = 'geometryType("polygon")';
        if (selected === true)
        { filter += ' && renderIntent("selected")'; }
      
        if (addfilter === true) {
            var dataFilter = this.createDataFilter();
            if (dataFilter !== null) {
                filter = filter + ' && ' + dataFilter;
            }
        }
        return new ol.style.Rule({
            filter: filter,
            symbolizers: symbolizers
        });
    },
    createRuleMultiPolygon: function (addfilter, labels, selected) {
      
        var filter = 'geometryType("multipolygon")';
        if (selected === true)
        { filter += ' && renderIntent("selected")'; }
      
        if (addfilter === true)
        {
            var dataFilter = this.createDataFilter();
            if (dataFilter !== null)
            {
                filter = filter + ' && ' + dataFilter;
            }
        }
        return new ol.style.Rule({
            filter: filter,
            symbolizers: this.createSymbolizerPolygon(selected).concat(labels)
        });

        
    }
    
});