Ext.define('GeoPatrimoine.controller.Template', {
    extend: 'Ext.app.Controller',
    views: ['user.WindowLogin'],
    refs: [
        {
            ref: 'ComboTemplate',
            selector: 'paneltemplatelist #combo-template'
        }, {
            ref: 'PanelTemplateTree',
            selector: 'paneltemplatetree'
        }],
    init: function () {

        this.control(
           {
               'paneltemplatelist #button-create-template': { click: this.onButtonCreateTemplateClick },
               'paneltemplatelist #button-update-template': { click: this.onButtonUpdateTemplateClick },
               'paneltemplatelist #button-delete-template': { click: this.onButtonDeleteTemplateClick }

           }
       );
    },


    onButtonCreateTemplateClick: function (button) {
        var window = Ext.create('GeoPatrimoine.view.template.WindowTemplate',
            {
                icon: './resources/icons/16x16/button-template-create.png',
                title: 'Nouveau modèle'
            });
        window.show();
        window.down("#buttton-cancel").on('click', this.onButtonCancelCreateTemplateClick);
        window.down("#buttton-ok").on('click', this.onButtonOkCreateTemplateClick);
    },

    onButtonCancelCreateTemplateClick: function (button)
    { },
    onButtonOkCreateTemplateClick: function (button)
    { },




    onButtonUpdateTemplateClick: function (button) {
        if (this.getComboTemplate().getValue() !== null) {
            var window = Ext.create('GeoPatrimoine.view.template.WindowTemplate',
            {
                icon: './resources/icons/16x16/button-template-create.png',
                title: 'Modifier le modèle'
            });
            window.show();
            window.down("#buttton-cancel").on('click', this.onButtonCancelUpdateTemplateClick);
            window.down("#buttton-ok").on('click', this.onButtonOkUpdateTemplateClick);
        }

    },

    onButtonCancelUpdateTemplateClick: function (button)
    { },
    onButtonOkUpdateTemplateClick: function (button)
    { },


    onButtonDeleteTemplateClick: function (button)
    { }



});