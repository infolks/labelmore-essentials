/*!
 * @infolks/labelmore-essentials v0.6.1
 * (c) infolks
 * Released under the ISC License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var labelmoreDevkit = require('@infolks/labelmore-devkit');
var __vue_normalize__ = _interopDefault(require('vue-runtime-helpers/dist/normalize-component.js'));

/**
 * remove extension from a file name
 * @param str string file name
 */
/**
 * Deeply assing an object to another object
 * @param object1 first object
 * @param object2 second object
 */
function deepAssign(object1, object2) {
    for (let key in object1) {
        if (Object.keys(object2).indexOf(key) !== -1) {
            if (typeof object1[key] === "object" && typeof object2[key] === "object") {
                // arrays are not deep assigned
                if (object1[key] instanceof Array || object2 instanceof Array) {
                    object1[key] = object2[key];
                }
                else {
                    object1[key] = deepAssign(object1[key], object2[key]);
                }
            }
            else {
                object1[key] = object2[key];
            }
        }
    }
    for (let key in object2) {
        if (Object.keys(object1).indexOf(key) === -1) {
            object1[key] = object2[key];
        }
    }
    return object1;
}

var script = {
    name: 'app-settings-essentials',
    props: ['value'],
    data() {
        return {
            settings: DEFAULT_SETTINGS,
        };
    },
    watch: {
        value() {
            this.value && (this.settings = deepAssign(this.settings, this.value));
        },
        settings: {
            handler() {
                this.change();
            },
            deep: true
        }
    },
    methods: {
        submit() {
            this.$emit('submit', {
                data: {
                    name: NAME,
                    settings: this.settings
                }
            });
        },
        change() {
            this.$emit('change', {
                data: {
                    name: NAME,
                    settings: this.settings
                }
            });
        }
    },
    created() {
        if (this.value)
            this.settings = deepAssign(this.settings, this.value);
    }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form',{attrs:{"id":"boundbox-settings-form"},on:{"submit":function($event){$event.preventDefault();return _vm.submit()}}},[_c('h5',{staticClass:"settings-sub-heading"},[_vm._v("Tool Settings")]),_vm._v(" "),_c('div',{staticClass:"uk-margin"},[_c('div',{staticClass:"uk-grid-small",attrs:{"uk-grid":""}},[_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"guide_color"}},[_vm._v("Preview Color: ")]),_vm._v(" "),_c('app-color-input',{attrs:{"pos":"bottom"},model:{value:(_vm.settings.tools.general.preview.color),callback:function ($$v) {_vm.$set(_vm.settings.tools.general.preview, "color", $$v);},expression:"settings.tools.general.preview.color"}})],1),_vm._v(" "),_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"guide_color"}},[_vm._v("Preview Stroke Width:")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.settings.tools.general.preview.width),expression:"settings.tools.general.preview.width",modifiers:{"number":true}}],staticClass:"uk-input",attrs:{"type":"number","name":"min_area","min":1},domProps:{"value":(_vm.settings.tools.general.preview.width)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.settings.tools.general.preview, "width", _vm._n($event.target.value));},"blur":function($event){return _vm.$forceUpdate()}}})]),_vm._v(" "),_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"guide_color"}},[_vm._v("Preview Dashed:")]),_vm._v(" "),_c('app-check-toggle',{staticClass:"uk-width-1-1",model:{value:(_vm.settings.tools.general.preview.dashed),callback:function ($$v) {_vm.$set(_vm.settings.tools.general.preview, "dashed", $$v);},expression:"settings.tools.general.preview.dashed"}},[_vm._v(_vm._s(_vm.settings.tools.general.preview.dashed? 'dashed' : 'not dashed'))])],1),_vm._v(" "),_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"guide_color"}},[_vm._v("Hotspots:")]),_vm._v(" "),_c('app-check-toggle',{staticClass:"uk-width-1-1",model:{value:(_vm.settings.tools.general.preview.hotspots),callback:function ($$v) {_vm.$set(_vm.settings.tools.general.preview, "hotspots", $$v);},expression:"settings.tools.general.preview.hotspots"}},[_vm._v(_vm._s(_vm.settings.tools.general.preview.hotspots? 'enabled' : 'disabled'))])],1)])]),_vm._v(" "),_c('h5',{staticClass:"settings-sub-heading small"},[_vm._v("Boundbox Tool")]),_vm._v(" "),_c('div',{staticClass:"uk-margin"},[_c('div',{staticClass:"uk-grid-small",attrs:{"uk-grid":""}},[_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"min_area"}},[_vm._v("Minimum Area")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.settings.tools.boundbox.minArea),expression:"settings.tools.boundbox.minArea",modifiers:{"number":true}}],staticClass:"uk-input",attrs:{"type":"number","name":"min_area","min":0.01,"step":0.01},domProps:{"value":(_vm.settings.tools.boundbox.minArea)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.settings.tools.boundbox, "minArea", _vm._n($event.target.value));},"blur":function($event){return _vm.$forceUpdate()}}})])])]),_vm._v(" "),_c('h5',{staticClass:"settings-sub-heading small"},[_vm._v("Contour Tool")]),_vm._v(" "),_c('div',{staticClass:"uk-margin"},[_c('div',{staticClass:"uk-grid-small",attrs:{"uk-grid":""}},[_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"min_close_distance"}},[_vm._v("Minimum Close Distance")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.settings.tools.contour.closeDistance),expression:"settings.tools.contour.closeDistance",modifiers:{"number":true}}],staticClass:"uk-input",attrs:{"type":"number","name":"min_close_distance","min":5,"step":1},domProps:{"value":(_vm.settings.tools.contour.closeDistance)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.settings.tools.contour, "closeDistance", _vm._n($event.target.value));},"blur":function($event){return _vm.$forceUpdate()}}})]),_vm._v(" "),_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"min_sides"}},[_vm._v("Minimum Sides")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.settings.tools.contour.minSides),expression:"settings.tools.contour.minSides",modifiers:{"number":true}}],staticClass:"uk-input",attrs:{"type":"number","name":"min_sides","min":3,"step":1},domProps:{"value":(_vm.settings.tools.contour.minSides)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.settings.tools.contour, "minSides", _vm._n($event.target.value));},"blur":function($event){return _vm.$forceUpdate()}}})]),_vm._v(" "),_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"snap_enabled"}},[_vm._v("Snap to Point")]),_vm._v(" "),_c('app-check-toggle',{staticClass:"uk-width-1-1",model:{value:(_vm.settings.tools.contour.snap.enabled),callback:function ($$v) {_vm.$set(_vm.settings.tools.contour.snap, "enabled", $$v);},expression:"settings.tools.contour.snap.enabled"}},[_vm._v(_vm._s(_vm.settings.tools.contour.snap.enabled? 'enabled' : 'disabled'))])],1),_vm._v(" "),(_vm.settings.tools.contour.snap.enabled)?_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"min_snap_distance"}},[_vm._v("Minimum Snap Distance")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.settings.tools.contour.snap.distance),expression:"settings.tools.contour.snap.distance",modifiers:{"number":true}}],staticClass:"uk-input",attrs:{"type":"number","name":"min_snap_distance","min":2,"step":1},domProps:{"value":(_vm.settings.tools.contour.snap.distance)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.settings.tools.contour.snap, "distance", _vm._n($event.target.value));},"blur":function($event){return _vm.$forceUpdate()}}})]):_vm._e()])])])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = "data-v-52454a18";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var SettingsComponent = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

const NAME = 'settings.default.essentials';
const DEFAULT_SETTINGS = {
    tools: {
        general: {
            preview: {
                color: "#00ffff",
                width: 1,
                dashed: true,
                hotspots: true
            }
        },
        boundbox: {
            minArea: 1
        },
        contour: {
            closeDistance: 10,
            snap: {
                enabled: true,
                distance: 10
            },
            minSides: 3
        }
        // select: {
        //     highlight: false
        // }
    }
};
class EssentialInterface extends labelmoreDevkit.Interface {
    constructor() {
        super(...arguments);
        this.name = NAME;
        this.title = 'Essentials';
        this.icon = `<i class="fas fa-boxes"></i>`;
        this.component = 'app-settings-essentials';
    }
}
var settings = {
    install(vue, optns) {
        vue.mixin({
            beforeCreate() {
                if (this.$settings) {
                    // register settings
                    if (!this.$settings.hasSettings(NAME))
                        this.$settings.registerSettings(NAME, DEFAULT_SETTINGS);
                    // register interface
                    if (!this.$settings.hasInterface(NAME)) {
                        const essInterface = new EssentialInterface();
                        this.$settings.registerInterface(NAME, essInterface);
                        vue.component(essInterface.component, SettingsComponent);
                    }
                }
            }
        });
    }
};

exports.DEFAULT_SETTINGS = DEFAULT_SETTINGS;
exports.EssentialInterface = EssentialInterface;
exports.NAME = NAME;
exports.default = settings;
