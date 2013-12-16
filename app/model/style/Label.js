Ext.define('eCarto.model.Label', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo'],
    idProperty: 'id',
    fields: [
       { name: 'id', type: 'integer', defaultValue: null, useNull: true, mapping: 'id' },
       { name: 'style__id', type: 'integer', defaultValue: null, useNull: true, mapping: 'style__id' },
       { name: 'font_family', type: 'string', defaultValue: "calibri", useNull: true, mapping: 'font_family' },
       { name: 'font_color', type: 'string', defaultValue: "888888", useNull: true, mapping: 'font_color' },
       { name: 'font_weight', type: 'string', defaultValue: "normal", useNull: true, mapping: 'font_weight' },
       { name: 'font_size', type: 'integer', defaultValue: 12, useNull: true, mapping: 'font_size' },
       { name: 'font_opacity', type: 'integer', defaultValue: 100, useNull: true, mapping: 'font_opacity' },
       { name: 'stroke_color', type: 'string', defaultValue: "ffffff", useNull: true, mapping: 'stroke_color' },
       { name: 'stroke_width', type: 'integer', defaultValue: 2, useNull: true, mapping: 'stroke_width' },
       { name: 'stroke_opacity', type: 'integer', defaultValue: 100, useNull: true, mapping: 'stroke_opacity' },
       { name: 'expression', type: 'string', defaultValue: "Vide", useNull: true, mapping: 'expression' }
    ],
    createLabel: function ()
    {

        var labelStyle = new ol.style.Text({
            color: '#' + this.data.font_color,
            text: ol.expr.parse(this.data.expression),
            fontFamily: this.data.font_family,
            fontSize: this.data.font_size,
            zIndex:0,
            opacity: this.data.font_opacity / 100
            /*
            stroke: new ol.style.Stroke({
                color: '#' + this.data.stroke_color,
                width: this.data.stroke_width,
                opacity: this.data.stroke_opacity
            })*/
        });
        return labelStyle;
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
            tableName: 'label',
            childTables: Ext.JSON.encode([])
        },
        reader: {
            type: 'json',
            model: 'eCarto.model.Label',
            root: 'datas',
            idProperty: 'id',
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message'

        }
    }
});