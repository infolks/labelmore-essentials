/*!
 * @infolks/labelmore-essentials v1.2.0
 * (c) infolks
 * Released under the ISC License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var labelmoreDevkit = require('@infolks/labelmore-devkit');
var __vue_normalize__ = _interopDefault(require('vue-runtime-helpers/dist/normalize-component.js'));
var paper = require('paper');
var tslib_1 = require('tslib');
var __vue_create_injector__ = _interopDefault(require('vue-runtime-helpers/dist/inject-style/browser.js'));

/**
 * remove extension from a file name
 * @param str string file name
 */
function removeExtension(str) {
    return str.split('.').slice(0, -1).join('.');
}
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
/**
 * Return the skeleton for the array of keypoints
 * @param projectKeypoints project keypoints
 */
function getSkeleton(projectKeypoints) {
    // create a dictionary to connect ids
    const kpDict = {};
    for (let i = 0; i < projectKeypoints.length; i++) {
        kpDict[projectKeypoints[i].name] = i;
    }
    // we have a dictionary with names mapped to index
    // we will create an array of edges from this dictionary
    const edges = [];
    // lets clone the keypoints array
    const keypoints = JSON.parse(JSON.stringify(projectKeypoints));
    for (let i = 0; i < keypoints.length; i++) {
        const kp = keypoints[i];
        for (let conn of kp.connections) {
            const j = kpDict[conn];
            if (j) {
                // push connection to edges array
                edges.push([i, j]);
                // remove the reverse connection
                keypoints[j].connections = keypoints[j].connections.filter(c => c !== kp.name);
            }
        }
    }
    return edges;
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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form',{attrs:{"id":"boundbox-settings-form"},on:{"submit":function($event){$event.preventDefault();return _vm.submit()}}},[_c('h5',{staticClass:"settings-sub-heading"},[_vm._v("Tool Settings")]),_vm._v(" "),_c('div',{staticClass:"uk-margin"},[_c('div',{staticClass:"uk-grid-small",attrs:{"uk-grid":""}},[_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"guide_color"}},[_vm._v("Preview Color: ")]),_vm._v(" "),_c('app-color-input',{attrs:{"pos":"bottom"},model:{value:(_vm.settings.tools.general.preview.color),callback:function ($$v) {_vm.$set(_vm.settings.tools.general.preview, "color", $$v);},expression:"settings.tools.general.preview.color"}})],1),_vm._v(" "),_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"guide_color"}},[_vm._v("Preview Stroke Width:")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.settings.tools.general.preview.width),expression:"settings.tools.general.preview.width",modifiers:{"number":true}}],staticClass:"uk-input",attrs:{"type":"number","name":"min_area","min":1},domProps:{"value":(_vm.settings.tools.general.preview.width)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.settings.tools.general.preview, "width", _vm._n($event.target.value));},"blur":function($event){return _vm.$forceUpdate()}}})]),_vm._v(" "),_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"guide_color"}},[_vm._v("Preview Dashed:")]),_vm._v(" "),_c('app-check-toggle',{staticClass:"uk-width-1-1",model:{value:(_vm.settings.tools.general.preview.dashed),callback:function ($$v) {_vm.$set(_vm.settings.tools.general.preview, "dashed", $$v);},expression:"settings.tools.general.preview.dashed"}},[_vm._v(_vm._s(_vm.settings.tools.general.preview.dashed? 'dashed' : 'not dashed'))])],1),_vm._v(" "),_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"guide_color"}},[_vm._v("Hotspots:")]),_vm._v(" "),_c('app-check-toggle',{staticClass:"uk-width-1-1",model:{value:(_vm.settings.tools.general.preview.hotspots),callback:function ($$v) {_vm.$set(_vm.settings.tools.general.preview, "hotspots", $$v);},expression:"settings.tools.general.preview.hotspots"}},[_vm._v(_vm._s(_vm.settings.tools.general.preview.hotspots? 'enabled' : 'disabled'))])],1)])]),_vm._v(" "),_c('h5',{staticClass:"settings-sub-heading small"},[_vm._v("Boundbox Tool")]),_vm._v(" "),_c('div',{staticClass:"uk-margin"},[_c('div',{staticClass:"uk-grid-small",attrs:{"uk-grid":""}},[_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"min_area"}},[_vm._v("Minimum Area")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.settings.tools.boundbox.minArea),expression:"settings.tools.boundbox.minArea",modifiers:{"number":true}}],staticClass:"uk-input",attrs:{"type":"number","name":"min_area","min":0.01,"step":0.01},domProps:{"value":(_vm.settings.tools.boundbox.minArea)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.settings.tools.boundbox, "minArea", _vm._n($event.target.value));},"blur":function($event){return _vm.$forceUpdate()}}})])])]),_vm._v(" "),_c('h5',{staticClass:"settings-sub-heading small"},[_vm._v("Contour Tool")]),_vm._v(" "),_c('div',{staticClass:"uk-margin"},[_c('div',{staticClass:"uk-grid-small",attrs:{"uk-grid":""}},[_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"min_close_distance"}},[_vm._v("Minimum Close Distance")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.settings.tools.contour.closeDistance),expression:"settings.tools.contour.closeDistance",modifiers:{"number":true}}],staticClass:"uk-input",attrs:{"type":"number","name":"min_close_distance","min":5,"step":1},domProps:{"value":(_vm.settings.tools.contour.closeDistance)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.settings.tools.contour, "closeDistance", _vm._n($event.target.value));},"blur":function($event){return _vm.$forceUpdate()}}})]),_vm._v(" "),_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"min_sides"}},[_vm._v("Minimum Sides")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.settings.tools.contour.minSides),expression:"settings.tools.contour.minSides",modifiers:{"number":true}}],staticClass:"uk-input",attrs:{"type":"number","name":"min_sides","min":3,"step":1},domProps:{"value":(_vm.settings.tools.contour.minSides)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.settings.tools.contour, "minSides", _vm._n($event.target.value));},"blur":function($event){return _vm.$forceUpdate()}}})]),_vm._v(" "),_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"snap_enabled"}},[_vm._v("Snap to Point")]),_vm._v(" "),_c('app-check-toggle',{staticClass:"uk-width-1-1",model:{value:(_vm.settings.tools.contour.snap.enabled),callback:function ($$v) {_vm.$set(_vm.settings.tools.contour.snap, "enabled", $$v);},expression:"settings.tools.contour.snap.enabled"}},[_vm._v(_vm._s(_vm.settings.tools.contour.snap.enabled? 'enabled' : 'disabled'))])],1),_vm._v(" "),(_vm.settings.tools.contour.snap.enabled)?_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"min_snap_distance"}},[_vm._v("Minimum Snap Distance")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.settings.tools.contour.snap.distance),expression:"settings.tools.contour.snap.distance",modifiers:{"number":true}}],staticClass:"uk-input",attrs:{"type":"number","name":"min_snap_distance","min":2,"step":1},domProps:{"value":(_vm.settings.tools.contour.snap.distance)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.settings.tools.contour.snap, "distance", _vm._n($event.target.value));},"blur":function($event){return _vm.$forceUpdate()}}})]):_vm._e()])]),_vm._v(" "),_c('h5',{staticClass:"settings-sub-heading"},[_vm._v("Label Settings")]),_vm._v(" "),_c('h5',{staticClass:"settings-sub-heading small"},[_vm._v("Contour Label")]),_vm._v(" "),_c('div',{staticClass:"uk-margin"},[_c('div',{staticClass:"uk-grid-small",attrs:{"uk-grid":""}},[_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('app-checkbox',{model:{value:(_vm.settings.labels.contour.showPoints),callback:function ($$v) {_vm.$set(_vm.settings.labels.contour, "showPoints", $$v);},expression:"settings.labels.contour.showPoints"}},[_vm._v("Show Vertex Points")])],1)])]),_vm._v(" "),_c('h5',{staticClass:"settings-sub-heading small"},[_vm._v("Keypoint Label")]),_vm._v(" "),_c('div',{staticClass:"uk-margin"},[_c('div',{staticClass:"uk-grid-small uk-flex-middle",attrs:{"uk-grid":""}},[_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"min_close_distance"}},[_vm._v("Keypoint Radius")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.settings.labels.keypoints.keypoint.radius),expression:"settings.labels.keypoints.keypoint.radius",modifiers:{"number":true}}],staticClass:"uk-input",attrs:{"type":"number","name":"min_close_distance","min":2,"step":1},domProps:{"value":(_vm.settings.labels.keypoints.keypoint.radius)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.settings.labels.keypoints.keypoint, "radius", _vm._n($event.target.value));},"blur":function($event){return _vm.$forceUpdate()}}})]),_vm._v(" "),_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"snap_enabled"}},[_vm._v("Skeleton")]),_vm._v(" "),_c('app-check-toggle',{staticClass:"uk-width-1-1",model:{value:(_vm.settings.labels.keypoints.skeleton),callback:function ($$v) {_vm.$set(_vm.settings.labels.keypoints, "skeleton", $$v);},expression:"settings.labels.keypoints.skeleton"}},[_vm._v(_vm._s(_vm.settings.labels.keypoints.skeleton? 'enabled' : 'disabled'))])],1)])])])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = "data-v-5acd8d94";
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
    },
    labels: {
        contour: {
            showPoints: true
        },
        keypoints: {
            keypoint: {
                radius: 3,
            },
            skeleton: true
        }
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
var EssentialSettings = {
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

class SelectTool extends labelmoreDevkit.AnnotationTool {
    constructor(labeller, workspace, settings, paper) {
        super(workspace, settings, paper);
        this.labeller = labeller;
        this.workspace = workspace;
        this.settings = settings;
        this.paper = paper;
        this.name = 'tools.default.select';
        this.title = 'Select';
        this.icon = `<i class="fas fa-mouse-pointer"></i>`;
    }
    get prefs() {
        return this.settings.getSettings(NAME).tools.general;
    }
    onmouseup(event) {
        // if (this.item) {
        //     const id = this.item.data.index
        //     if (this.moved) this.labeller.apply(id, <PathItem>this.item)
        // }
        // this.moved = false
        // this.item = null
    }
    // deslect any selection on deactivation of tool
    ondeactivate() {
        this.preview && this.preview.remove();
        // this.labeller.deselect()
    }
    onmousedown(event) {
        const item = event.item;
        const id = item ? item.data['index'] : -1;
        // -1048 refers to controls
        // id < -100 are reserved
        if (id > -100) {
            // this.item = item
            this.labeller.select(id);
        }
    }
    onmousemove(event) {
        const item = event.item;
        if (item && item.data.index > 0) {
            this.preview && this.preview.remove();
            const size = item.bounds.size.round();
            this.preview = new this.paper.PointText(new this.paper.Point(0, 0));
            const ratio = 1 / this.workspace.zoom;
            this.preview.content = `${size.width} x ${size.height}`;
            this.preview.style = {
                fontSize: 10 * ratio,
                fontWeight: 500,
                fillColor: this.prefs.preview.color
            };
            this.preview.data.index = -1049;
            this.preview.bounds.center = item.bounds.center;
            this.preview.locked = true;
        }
        else {
            this.preview && this.preview.remove();
        }
    }
    // onmousedrag (event: ToolEvent) {
    //     if (this.item && !this.item.parent && event.item && event.item.data.index > -100) this.item = event.item;
    //     const delta = event.delta
    //     if (this.item) {
    //         this.item.translate(this.limitMotion(this.item.bounds, delta))
    //         // emit that the 
    //         this.item.emit('moving', {
    //             point: this.item.position.clone()
    //         })
    //         this.moved = true
    //     }
    // }
    onkeyup(event) {
        if (event.key == 'delete') {
            if (this.labeller.selected) {
                this.labeller.remove(this.labeller.selected.id);
            }
        }
        else if (event.key == 'up') {
            // move selected label up
            if (this.labeller.selected)
                this.labeller.raise();
        }
        else if (event.key == 'down') {
            // move selected label down
            if (this.labeller.selected)
                this.labeller.fall();
        }
    }
}
var SelectTool$1 = {
    install(vue, opts) {
        vue.mixin({
            beforeCreate() {
                if (this.$labeller && this.$tools && this.$workspace && this.$settings) {
                    const select = new SelectTool(this.$labeller, this.$workspace, this.$settings, this.$paper);
                    if (!this.$tools.hasTool(select.name)) {
                        this.$tools.register(select.name, select);
                        this.$tools.activate(select.name);
                    }
                }
            }
        });
    }
};

class BoundboxTool extends labelmoreDevkit.AnnotationTool {
    constructor(labeller, workspace, settings, paper) {
        super(workspace, settings, paper);
        this.labeller = labeller;
        this.workspace = workspace;
        this.settings = settings;
        this.paper = paper;
        this.name = 'tools.default.boundbox';
        this.title = 'Boundbox';
        this.icon = '<i class="fas fa-vector-square"></i>';
        this.cursor = 'crosshair';
        this.options = {
            showGuide: true,
            limitToArtboard: true
        };
    }
    get prefs() {
        return this.settings.getSettings(NAME).tools.boundbox;
    }
    get generalPrefs() {
        return this.settings.getSettings(NAME).tools.general;
    }
    onmousedrag(event) {
        if (this.downPoint) {
            const min = this.downPoint;
            const max = event.point;
            const ratio = 1 / this.workspace.zoom;
            // show preview {
            this.preview && this.preview.remove();
            this.preview = new this.paper.Path.Rectangle(min, max);
            //@ts-ignore
            this.preview.style = {
                strokeColor: new paper.Color(this.generalPrefs.preview.color),
                fillColor: null,
                strokeWidth: this.generalPrefs.preview.width * ratio,
                dashArray: this.generalPrefs.preview.dashed ? [6 * ratio, 3 * ratio] : []
            };
            // }
            // show hotspots {
            if (this.generalPrefs.preview.hotspots) {
                this.createHotspot(event, ratio);
            }
            //}
        }
    }
    onmousedown(event) {
        if (!(event.item &&
            event.item.data &&
            event.item.data.index === this.workspace.RESERVED_ITEMS.CONTROL)) {
            this.downPoint = event.point;
        }
    }
    onmouseup(event) {
        if (this.preview && this.preview.area > this.prefs.minArea && this.labeller.class) {
            this.labeller.add({
                type: labelmoreDevkit.DEFAULT_LABEL_TYPES.boundbox,
                props: {
                    xmin: this.preview.bounds.left,
                    ymin: this.preview.bounds.top,
                    xmax: this.preview.bounds.right,
                    ymax: this.preview.bounds.bottom
                }
            });
        }
        this.reset();
    }
    reset() {
        this.preview && this.preview.remove();
        this.hotspots && this.hotspots.remove();
        this.preview = null;
        this.downPoint = null;
        this.hotspots = null;
    }
    createHotspot(event, ratio) {
        this.hotspots && this.hotspots.remove();
        // point for padding
        const padPoint = new paper.Point(5, 5);
        // const txtStart = new this.paper.PointText(padPoint/* dummy point*/)
        // txtStart.content = `(${event.downPoint.round().x}, ${event.downPoint.round().y})` // coordinates
        // // apply style
        // txtStart.style = {
        //     fontSize: 9 * ratio,
        //     fontWeight: 300,
        //     fillColor: new Color(this.generalPrefs.preview.color)
        // }
        // txtStart.bounds.bottomRight = event.downPoint.subtract(padPoint) // real point
        // const txtEnd = new this.paper.PointText(padPoint/* dummy point*/)
        // txtEnd.content = `(${event.point.round().x}, ${event.point.round().y})` // coordinates
        // txtEnd.style = txtStart.style
        // txtEnd.bounds.bottomRight = event.point.subtract(padPoint) // real point
        // SHOW SIZE
        const diff = event.point.subtract(event.downPoint).round();
        const txtSize = new this.paper.PointText(padPoint /* dummy point*/);
        txtSize.content = `${diff.x} x ${diff.y}`;
        txtSize.style = {
            fontSize: 9 * ratio,
            fontWeight: 300,
            fillColor: new paper.Color(this.generalPrefs.preview.color)
        };
        txtSize.bounds.center = event.downPoint.add(diff.divide(2));
        this.hotspots = new this.paper.Group([/*txtStart, txtEnd,*/ txtSize]);
    }
}
var BoundboxTool$1 = {
    install(vue, opts) {
        vue.mixin({
            beforeCreate() {
                if (this.$labeller && this.$tools && this.$workspace && this.$settings) {
                    const bndbox = new BoundboxTool(this.$labeller, this.$workspace, this.$settings, this.$paper);
                    if (!this.$tools.hasTool(bndbox.name)) {
                        this.$tools.register(bndbox.name, bndbox);
                    }
                }
            }
        });
    }
};

/**
 * Settings
 * --------
 * Snap Distance
 * Min Sides
 * Preview color
 */
class ContourTool extends labelmoreDevkit.AnnotationTool {
    constructor(labeller, workspace, settings, paper) {
        super(workspace, settings, paper);
        this.labeller = labeller;
        this.workspace = workspace;
        this.settings = settings;
        this.paper = paper;
        this.name = 'tools.default.contour';
        this.title = 'Contour';
        this.icon = `<i class="fas fa-draw-polygon"></i>`;
        this.cursor = 'crosshair';
        this.closePathActive = false;
        this.points = [];
        this.options = {
            showGuide: true,
            limitToArtboard: true
        };
    }
    get firstPoint() {
        return this.points[0];
    }
    get lastPoint() {
        return this.points[this.points.length - 1];
    }
    get prefs() {
        return this.settings.getSettings(NAME).tools.contour;
    }
    get generalPrefs() {
        return this.settings.getSettings(NAME).tools.general;
    }
    get ratio() {
        return 1 / this.workspace.zoom;
    }
    onmousedown(event) {
        if (event.modifiers.shift) {
            this.onmousedown_shift(event);
        }
        else if (event.modifiers.alt) {
            this.onmousedown_alt(event);
        }
        else {
            // perform normal mouse down action if not on top of control
            if (!(event.item &&
                event.item.data &&
                event.item.data.index === this.workspace.RESERVED_ITEMS.CONTROL)) {
                this.onmousedown_normal(event);
            }
        }
    }
    onmousemove(event) {
        if (event.modifiers.shift) {
            this.onmousemove_shift(event);
        }
        else if (event.modifiers.alt) {
            this.onmousemove_alt(event);
        }
        else {
            this.onmousemove_normal(event);
        }
    }
    onkeyup(event) {
        const key = event.key;
        if (key === 'backspace') {
            // if there are points
            if (this.points && this.points.length) {
                // pop last point
                this.points.pop();
                // update preview
                if (this.preview.segments.length === 3) {
                    this.createPreview(this.preview.segments[1].point);
                    this.createContour();
                }
                else {
                    this.preview.remove();
                    this.contourJoints.remove();
                }
            }
        }
        // snap on tab
        else if (key === 'tab') {
            console.log('snap on');
            const label = this.labeller.selected;
            if (label && label.type === labelmoreDevkit.DEFAULT_LABEL_TYPES.contour) {
                // get path
                const path = this.workspace.getPath(label);
                let changed = false;
                path.segments.forEach((segment) => {
                    const nearest = this.getNearest(segment.point, label.id);
                    if (segment.point.getDistance(nearest) < this.prefs.snap.distance * this.ratio) {
                        segment.point.set(nearest.x, nearest.y);
                        changed = true;
                    }
                });
                console.log(changed);
                if (changed)
                    this.labeller.apply(label.id, path);
            }
        }
        else if (key === 'enter') {
            this.makeLabel();
        }
        // modify labels
    }
    /// PRIVATE
    reset() {
        this.preview && this.preview.remove();
        this.contour && this.contour.remove();
        this.contourJoints && this.contourJoints.remove();
        this.closePoint && this.closePoint.remove();
        this.hotspot && this.hotspot.remove();
        this.preview = this.contour = this.closePoint = this.hotspot = null;
        this.closePathActive = false;
        this.points = [];
        this.workspace.cursor = this.cursor;
    }
    // ===================
    //  MOUSE DOWN EVENTS
    // ===================
    onmousedown_normal(event) {
        if (this.closePathActive) {
            this.makeLabel();
        }
        else {
            this.points.push(event.point);
        }
        this.createContour();
    }
    onmousedown_shift(event) {
        const label = this.labeller.selected;
        if (label && label.type === labelmoreDevkit.DEFAULT_LABEL_TYPES.contour) {
            const path = this.workspace.getPath(this.labeller.selected);
            const loc = path.getNearestLocation(event.point);
            if (path.divideAt(loc)) {
                this.labeller.apply(label.id, path);
            }
            this.hotspot && this.hotspot.remove();
            this.hotspot = null;
        }
        else {
            this.onmousedown_normal(event);
        }
    }
    onmousedown_alt(event) {
        const label = this.labeller.selected;
        if (label && label.type === labelmoreDevkit.DEFAULT_LABEL_TYPES.contour) {
            // get path
            const path = this.workspace.getPath(label);
            // get nearest segment
            const seg = path.getNearestLocation(event.point).segment;
            // if path has more than 3 segments remove
            if (path.segments.length > 3) {
                seg.remove();
                // apply path
                this.labeller.apply(label.id, path);
                // remove hotspot
                this.hotspot && this.hotspot.remove();
            }
        }
        else {
            if (this.prefs.snap.enabled) {
                const nearest = this.getNearest(event.point);
                if (event.point.getDistance(nearest) < this.prefs.snap.distance * this.ratio) {
                    event.point = nearest;
                }
            }
            this.onmousedown_normal(event);
        }
    }
    // ===================
    //  MOUSE MOVE EVENTS
    // ===================
    onmousemove_normal(event) {
        if (this.points.length) {
            this.createContour();
            this.createPreview(event.point);
            if (event.point.getDistance(this.firstPoint) < this.prefs.closeDistance * this.ratio) {
                this.createClosePoint();
                this.closePathActive = true;
            }
            else {
                this.closePoint && this.closePoint.remove();
                this.closePoint = null;
                this.closePathActive = false;
            }
        }
        // remove hotspot
        this.hotspot && this.hotspot.remove();
    }
    /**
     * move with shift modifier
     * @param event Tool Event
     */
    onmousemove_shift(event) {
        const label = this.labeller.selected;
        if (label && label.type === labelmoreDevkit.DEFAULT_LABEL_TYPES.contour) {
            // remove old hotspot
            this.hotspot && this.hotspot.remove();
            // get selected label's path
            const path = this.workspace.getPath(label);
            // get nearest point
            const point = path.getNearestPoint(event.point);
            // get stroke width of label
            const strokeWidth = this.settings.general.workspace.labels.stroke.width;
            // create hotspot
            this.hotspot = new this.paper.Path.Circle(point, strokeWidth * this.ratio * 5);
            this.hotspot.fillColor = path.strokeColor;
        }
        else {
            this.onmousemove_normal(event);
        }
    }
    onmousemove_alt(event) {
        const label = this.labeller.selected;
        if (label && label.type === labelmoreDevkit.DEFAULT_LABEL_TYPES.contour) {
            // remove hotspot
            this.hotspot && this.hotspot.remove();
            // get path
            const path = this.workspace.getPath(label);
            // get nearest segment
            const seg = path.getNearestLocation(event.point).segment;
            // get radius of control
            const radius = this.settings.general.workspace.control.radius;
            // create hotspot
            this.hotspot = new this.paper.Path.Circle(seg.point, radius * this.ratio);
            this.hotspot.fillColor = path.strokeColor;
        }
        else {
            if (this.prefs.snap.enabled) {
                const nearest = this.getNearest(event.point);
                if (event.point.getDistance(nearest) < this.prefs.snap.distance * this.ratio) {
                    event.point = nearest;
                }
            }
            this.onmousemove_normal(event);
        }
    }
    // =================
    //  PREVIEW METHODS
    // =================
    /**
     * get nearest point
     */
    getNearest(evPoint, avoid) {
        const contourLabels = this.labeller.all.filter(l => (l.type === labelmoreDevkit.DEFAULT_LABEL_TYPES.contour) && (l.id !== avoid));
        const allPoints = contourLabels.reduce((points, item) => {
            return [...points, ...item.props.points.map(p => new paper.Point(p.x, p.y))];
        }, []);
        const nearest = allPoints.slice(1).reduce((minPt, point) => {
            const minDist = evPoint.getDistance(minPt);
            const dist = evPoint.getDistance(point);
            return (dist < minDist) ? point : minPt;
        }, allPoints[0]);
        console.log(nearest);
        return nearest;
    }
    /**
     * Complete the label
     */
    makeLabel() {
        const class_ = this.labeller.class;
        if (this.points && this.points.length >= this.prefs.minSides) {
            if (class_) {
                // console.log('making label')
                this.labeller.add({
                    type: labelmoreDevkit.DEFAULT_LABEL_TYPES.contour,
                    props: {
                        points: this.points.map(p => ({ x: p.x, y: p.y }))
                    }
                });
            }
            // reset
            this.reset();
        }
    }
    /**
     * Create the contour
     */
    createContour() {
        this.contour && this.contour.remove();
        this.contourJoints && this.contourJoints.remove();
        if (this.points.length) {
            this.contour = new this.paper.Path(this.points);
            this.contourJoints = new this.paper.Group();
            // joints
            for (let point of this.points) {
                this.contourJoints.addChild(new this.paper.Path.Circle(point, this.generalPrefs.preview.width * this.ratio * 5));
            }
            const color = this.labeller.class ? this.labeller.class.color : '#ffff00';
            // @ts-ignore
            this.contour.style = {
                strokeColor: new paper.Color(color),
                fillColor: null,
                strokeWidth: this.generalPrefs.preview.width * this.ratio
            };
            this.contourJoints.fillColor = new paper.Color(color);
        }
    }
    /**
     * Create the circle used to close the path
     */
    createClosePoint() {
        this.closePoint && this.closePoint.remove();
        if (this.points.length) {
            this.closePoint = new this.paper.Path.Circle(this.firstPoint, this.prefs.closeDistance * this.ratio);
            const color = this.labeller.class ? this.labeller.class.color : '#ffff00';
            // @ts-ignore
            this.closePoint.style = {
                strokeColor: new paper.Color(color),
                fillColor: null,
                strokeWidth: this.generalPrefs.preview.width * this.ratio
            };
        }
    }
    /**
     * Create preiew dotted
     * @param cursorPoint current cursor position
     */
    createPreview(cursorPoint) {
        if (this.firstPoint && cursorPoint) {
            this.preview && this.preview.remove();
            this.preview = new this.paper.Path();
            this.preview.add(this.firstPoint);
            this.preview.add(cursorPoint);
            if (this.lastPoint && !this.firstPoint.equals(this.lastPoint)) {
                this.preview.add(this.lastPoint);
            }
            // @ts-ignore
            this.preview.style = {
                strokeWidth: this.generalPrefs.preview.width * this.ratio,
                fillColor: null,
                strokeColor: this.generalPrefs.preview.color,
                dashArray: this.generalPrefs.preview.dashed ? [6 * this.ratio, 3 * this.ratio] : []
            };
        }
    }
}
var ContourTool$1 = {
    install(vue, opts) {
        vue.mixin({
            beforeCreate() {
                if (this.$labeller && this.$tools && this.$workspace && this.$settings) {
                    const contour = new ContourTool(this.$labeller, this.$workspace, this.$settings, this.$paper);
                    if (!this.$tools.hasTool(contour.name)) {
                        this.$tools.register(contour.name, contour);
                    }
                }
            }
        });
    }
};

class LineTool extends labelmoreDevkit.AnnotationTool {
    constructor(labeller, workspace, settings, paper) {
        super(workspace, settings, paper);
        this.labeller = labeller;
        this.workspace = workspace;
        this.settings = settings;
        this.paper = paper;
        this.name = 'tools.default.line';
        this.title = 'Polyline';
        this.icon = `<i>&#9585;</i>`;
        this.cursor = 'crosshair';
        this.points = [];
        this.options = {
            showGuide: true,
            limitToArtboard: true
        };
    }
    get ratio() {
        return 1 / this.workspace.zoom;
    }
    get generalPrefs() {
        return this.settings.getSettings(NAME).tools.general;
    }
    get lastPoint() {
        return this.points[this.points.length - 1];
    }
    onmousedown(event) {
        if (event.modifiers.shift) {
            this.onmousedown_shift(event);
        }
        else if (event.modifiers.alt) {
            this.onmousedown_alt(event);
        }
        else {
            // perform normal mouse down action if not on top of control
            if (!(event.item &&
                event.item.data &&
                event.item.data.index === this.workspace.RESERVED_ITEMS.CONTROL)) {
                this.onmousedown_normal(event);
            }
        }
    }
    onmousemove(event) {
        if (event.modifiers.shift) {
            this.onmousemove_shift(event);
        }
        else if (event.modifiers.alt) {
            this.onmousemove_alt(event);
        }
        else {
            this.onmousemove_normal(event);
        }
    }
    onkeyup(event) {
        const key = event.key;
        if (key === 'backspace') {
            // if there are points
            if (this.points && this.points.length) {
                // pop last point
                this.points.pop();
                // update preview
                if (this.preview.segments.length > 1) {
                    this.createPreview(this.preview.segments[1].point);
                    this.createContour();
                }
                else {
                    this.preview.remove();
                }
            }
        }
        else if (key === 'enter') {
            this.makeLabel();
        }
    }
    // =========
    //  PRIVATE
    // =========
    // ===================
    //  MOUSE DOWN EVENTS
    // ===================
    onmousedown_normal(event) {
        this.points.push(event.point);
        this.createContour();
    }
    onmousedown_shift(event) {
        const label = this.labeller.selected;
        if (label && label.type === labelmoreDevkit.DEFAULT_LABEL_TYPES.line) {
            const path = this.workspace.getPath(this.labeller.selected);
            const loc = path.getNearestLocation(event.point);
            if (path.divideAt(loc)) {
                this.labeller.apply(label.id, path);
            }
            this.hotspot && this.hotspot.remove();
            this.hotspot = null;
        }
        else {
            this.onmousedown_normal(event);
        }
    }
    onmousedown_alt(event) {
        const label = this.labeller.selected;
        if (label && label.type === labelmoreDevkit.DEFAULT_LABEL_TYPES.line) {
            // get path
            const path = this.workspace.getPath(label);
            // get nearest segment
            const seg = path.getNearestLocation(event.point).segment;
            // if path has more than 3 segments remove
            if (path.segments.length > 2) {
                seg.remove();
                // apply path
                this.labeller.apply(label.id, path);
                // remove hotspot
                this.hotspot && this.hotspot.remove();
            }
        }
        else {
            this.onmousedown_normal(event);
        }
    }
    // ===================
    //  MOUSE MOVE EVENTS
    // ===================
    onmousemove_normal(event) {
        if (this.points.length) {
            this.createContour();
            this.createPreview(event.point);
        }
        // remove hotspot
        this.hotspot && this.hotspot.remove();
    }
    /**
     * move with shift modifier
     * @param event Tool Event
     */
    onmousemove_shift(event) {
        const label = this.labeller.selected;
        if (label && label.type === labelmoreDevkit.DEFAULT_LABEL_TYPES.line) {
            // remove old hotspot
            this.hotspot && this.hotspot.remove();
            // get selected label's path
            const path = this.workspace.getPath(label);
            // get nearest point
            const point = path.getNearestPoint(event.point);
            // get stroke width of label
            const strokeWidth = this.settings.general.workspace.labels.stroke.width;
            // create hotspot
            this.hotspot = new this.paper.Path.Circle(point, strokeWidth * this.ratio * 5);
            this.hotspot.fillColor = path.strokeColor;
        }
        else {
            this.onmousemove_normal(event);
        }
    }
    onmousemove_alt(event) {
        const label = this.labeller.selected;
        if (label && label.type === labelmoreDevkit.DEFAULT_LABEL_TYPES.line) {
            // remove hotspot
            this.hotspot && this.hotspot.remove();
            // get path
            const path = this.workspace.getPath(label);
            // get nearest segment
            const seg = path.getNearestLocation(event.point).segment;
            // get radius of control
            const radius = this.settings.general.workspace.control.radius;
            // create hotspot
            this.hotspot = new this.paper.Path.Circle(seg.point, radius * this.ratio);
            this.hotspot.fillColor = path.strokeColor;
        }
        else {
            this.onmousemove_normal(event);
        }
    }
    reset() {
        this.preview && this.preview.remove();
        this.contour && this.contour.remove();
        this.contourJoints && this.contourJoints.remove();
        this.hotspot && this.hotspot.remove();
        this.preview = this.contour = this.contourJoints = null;
        this.points = [];
    }
    makeLabel() {
        if (this.labeller.class) {
            this.labeller.add({
                type: labelmoreDevkit.DEFAULT_LABEL_TYPES.line,
                props: {
                    points: this.points.map(p => ({ x: p.x, y: p.y }))
                }
            });
            this.reset();
        }
    }
    createContour() {
        this.contour && this.contour.remove();
        this.contourJoints && this.contourJoints.remove();
        if (this.points.length) {
            this.contour = new this.paper.Path(this.points);
            this.contourJoints = new this.paper.Group();
            // joints
            for (let point of this.points) {
                this.contourJoints.addChild(new this.paper.Path.Circle(point, this.generalPrefs.preview.width * this.ratio * 5));
            }
            const color = this.labeller.class ? this.labeller.class.color : '#ffff00';
            // @ts-ignore
            this.contour.style = {
                strokeColor: new paper.Color(color),
                fillColor: null,
                strokeWidth: this.generalPrefs.preview.width * this.ratio
            };
            this.contourJoints.fillColor = new paper.Color(color);
        }
    }
    createPreview(cursorPoint) {
        if (this.lastPoint && cursorPoint) {
            this.preview && this.preview.remove();
            this.preview = new this.paper.Path([this.lastPoint, cursorPoint]);
            this.preview.style = {
                strokeWidth: this.generalPrefs.preview.width * this.ratio,
                fillColor: null,
                strokeColor: this.generalPrefs.preview.color,
                dashArray: this.generalPrefs.preview.dashed ? [6 * this.ratio, 3 * this.ratio] : []
            };
        }
    }
}
var LineTool$1 = {
    install(vue, opts) {
        vue.mixin({
            beforeCreate() {
                if (this.$labeller && this.$tools && this.$workspace && this.$settings) {
                    const line = new LineTool(this.$labeller, this.$workspace, this.$settings, this.$paper);
                    if (!this.$tools.hasTool(line.name)) {
                        this.$tools.register(line.name, line);
                    }
                }
            }
        });
    }
};

class KeypointJsonFormat {
    constructor(labeller) {
        this.labeller = labeller;
    }
    encode(label, class_) {
        const keypoints = this.labeller.keypoints;
        const bndbox = label.props.boundbox;
        return {
            name: this.labeller.getName(label),
            description: {
                type: label.type
            },
            classTitle: class_.name,
            attributes: label.attributes || {},
            skeleton: getSkeleton(keypoints),
            bndbox: [
                [bndbox.xmin, bndbox.ymin],
                [bndbox.xmax, bndbox.ymax]
            ],
            points: keypoints.map(kp => {
                const annotation = label.props.keypoints.find(ann => ann.name === kp.name);
                if (annotation) {
                    return [
                        annotation.name,
                        annotation.point.x,
                        annotation.point.y,
                        annotation.visibility
                    ];
                }
                return [
                    kp.name,
                    0,
                    0,
                    0
                ];
            })
        };
    }
}

class KeypointLabel extends labelmoreDevkit.SimpleLabelType {
    constructor(projectManager, labeller, workspace, settings, paper) {
        super(labeller, workspace, settings, paper);
        this.projectManager = projectManager;
        this.title = 'Keypoint';
        this.options = {
            showLabelTag: false,
            hasFill: true
        };
        if (projectManager.hasEncoder('encoders.default.json')) {
            const jsonEnc = projectManager.getEncoder('encoders.default.json');
            if (!jsonEnc.hasFormat(KeypointLabel.NAME)) {
                jsonEnc.registerFormat(KeypointLabel.NAME, new KeypointJsonFormat(this.labeller));
            }
        }
    }
    get prefs() {
        return this.settings.getSettings(NAME).labels.keypoints;
    }
    get ratio() {
        return 1 / this.workspace.zoom;
    }
    get keypoints() {
        return this.projectManager.project.options.keypoints;
    }
    vectorize(label) {
        const { xmin, xmax, ymin, ymax } = label.props.boundbox;
        const bbox = new this.paper.Path.Rectangle(new this.paper.Point(xmin, ymin), new this.paper.Point(xmax, ymax));
        const points = new this.paper.Group();
        label.props.keypoints.forEach((kp, i) => {
            const kp_path = this.keypointPath(kp.point.x, kp.point.y, kp.visibility === 2);
            kp_path.data.name = kp.name;
            kp_path.data.index = i;
            kp_path.data.visibility = kp.visibility;
            points.addChild(kp_path);
        });
        if (this.prefs.skeleton) {
            return new this.paper.Group([bbox, this.createSkeleton(label), points]);
        }
        else {
            return new this.paper.Group([bbox, new this.paper.Group(), points]);
        }
    }
    controls(path) {
        return [
            ...this.bboxControls(path.children[0]),
            ...this.keypointsControls(path.children[2])
        ];
    }
    apply(path) {
        const [bbox, skeleton, points] = path.children;
        const { topLeft, bottomRight } = bbox.bounds;
        const boundbox = {
            xmin: topLeft.x,
            ymin: topLeft.y,
            xmax: bottomRight.x,
            ymax: bottomRight.y
        };
        const keypoints = [];
        for (let kp of points.children) {
            keypoints.push({
                name: kp.data.name,
                point: {
                    x: kp.position.x,
                    y: kp.position.y
                },
                visibility: kp.data.visibility
            });
        }
        return {
            boundbox,
            keypoints
        };
    }
    /*
     |------------------------------------------------------------
     | PRIVATE FUNCTIONS
     |------------------------------------------------------------
    */
    keypointsControls(path) {
        return path.children.map((p) => {
            return {
                hotspot: p.position,
                cursor: 'pointer'
            };
        });
    }
    bboxControls(path) {
        return [
            {
                hotspot: path.bounds.topLeft,
                cursor: 'nw-resize'
            },
            {
                hotspot: path.bounds.topCenter,
                cursor: 'n-resize',
                restrict: 'y'
            },
            {
                hotspot: path.bounds.topRight,
                cursor: 'ne-resize'
            },
            {
                hotspot: path.bounds.rightCenter,
                cursor: 'w-resize',
                restrict: 'x'
            },
            {
                hotspot: path.bounds.bottomRight,
                cursor: 'nw-resize'
            },
            {
                hotspot: path.bounds.bottomCenter,
                cursor: 'n-resize',
                restrict: 'y'
            },
            {
                hotspot: path.bounds.bottomLeft,
                cursor: 'ne-resize'
            },
            {
                hotspot: path.bounds.leftCenter,
                cursor: 'w-resize',
                restrict: 'x'
            },
            {
                hotspot: path.bounds.center,
                cursor: 'move',
                bounds: path.bounds
            }
        ];
    }
    keypointPath(x, y, visible) {
        const radius = this.prefs.keypoint.radius;
        // const thickness = this.prefs.keypoint.thickness
        // const hor = {
        //     start   : new this.paper.Point(x-radius, y-thickness/2),
        //     end     : new this.paper.Point(x+radius, y+thickness/2)
        // }
        // const ver = {
        //     start   : new this.paper.Point(x-thickness/2, y-radius),
        //     end     : new this.paper.Point(x+thickness/2, y+radius)
        // }
        // const r1 = new this.paper.Path.Rectangle(hor.start, hor.end)
        // const r2 = new this.paper.Path.Rectangle(ver.start, ver.end)
        // const plus = r1.unite(r2)
        // r1.remove()
        // r2.remove()
        if (visible)
            return new this.paper.Path.Circle(new this.paper.Point(x, y), radius * this.ratio);
        else {
            const net_radius = radius * this.ratio;
            return new this.paper.Path.Rectangle(new this.paper.Point(x - net_radius, y - net_radius), new this.paper.Point(x + net_radius, y + net_radius));
        }
    }
    createSkeleton(label) {
        const skeleton = getSkeleton(this.keypoints);
        console.log('Skeleton', skeleton);
        // make dictionary to get index of keypoints from names
        const kpDict = {};
        for (let i = 0; i < this.keypoints.length; i++) {
            kpDict[this.keypoints[i].name] = i;
        }
        console.log('Dict', kpDict);
        // make correspond list to check which all keypoints are in the label
        const kpCorr = [];
        for (let keypoint of label.props.keypoints) {
            kpCorr[kpDict[keypoint.name]] = keypoint;
        }
        console.log('kpCorr', kpCorr);
        // create lines for each bone in skeleton and make a group
        const skeletonPath = new this.paper.Group();
        for (let bone of skeleton) {
            const from = kpCorr[bone[0]];
            const to = kpCorr[bone[1]];
            if (from && to)
                skeletonPath.addChild(new this.paper.Path.Line(new paper.Point(from.point.x, from.point.y), new paper.Point(to.point.x, to.point.y)));
        }
        return skeletonPath;
    }
}
KeypointLabel.NAME = 'types.default.keypoint';
var KeypointLabel$1 = labelmoreDevkit.Plugin.Label({
    name: KeypointLabel.NAME,
    provides: KeypointLabel,
    uses: [
        'projects',
        'labeller',
        'workspace',
        'settings',
        'paper'
    ]
});

const NAME$1 = 'tools.default.keypoint';
class KeypointTool extends labelmoreDevkit.AnnotationTool {
    constructor(store, labeller, workspace, settings, paper) {
        super(workspace, settings, paper);
        this.store = store;
        this.labeller = labeller;
        this.workspace = workspace;
        this.settings = settings;
        this.paper = paper;
        this.name = NAME$1;
        this.title = 'Keypoint';
        this.icon = `<i class="far fa-dot-circle"></i>`;
        this.cursor = 'crosshair';
        this.points = [];
        this.boundboxMode = true;
        this.options = {
            showGuide: true,
            limitToArtboard: true
        };
        this.visibility = 2;
    }
    get ratio() {
        return 1 / this.workspace.zoom;
    }
    get visibility() {
        return this.store.state.globals[`${this.name}.visibility`];
    }
    set visibility(val) {
        this.store.dispatch('setGlobal', {
            key: `${this.name}.visibility`,
            value: val
        });
    }
    get generalPrefs() {
        return this.settings.getSettings(NAME).tools.general;
    }
    onmouseup(event) {
        console.log('keypoint mouseup', `boxmode: ${this.boundboxMode}`);
        if (this.boundboxMode) {
            this.onmouseup_bbox(event);
        }
        else {
            this.onmouseup_kp(event);
        }
    }
    onmousemove(event) {
        console.log('keypoint mousemove', `boxmode: ${this.boundboxMode}`);
        this.createContour();
    }
    onmousedown(event) {
        console.log('keypoint mousedown', `boxmode: ${this.boundboxMode}`);
        if (event.modifiers.shift) {
            this.onmousedown_shift(event);
        }
        else if (event.modifiers.alt) {
            this.onmousedown_alt(event);
        }
        else if (this.boundboxMode) {
            this.onmousedown_bbox(event);
        }
    }
    onmousedrag(event) {
        console.log('keypoint mousedrag', `boxmode: ${this.boundboxMode}`);
        if (this.boundboxMode) {
            this.onmousedrag_bbox(event);
        }
    }
    onkeyup(event) {
        if (event.modifiers.alt) {
            this.onkeyup_alt(event);
        }
        else {
            this.onkeyup_normal(event);
        }
    }
    /*
     |------------------------
     | Private
     |------------------------
    */
    makeLabel() {
        if (this.labeller.class) {
            this.labeller.add({
                type: KeypointLabel.NAME,
                props: {
                    boundbox: {
                        xmin: this.bbox.topLeft.x,
                        ymin: this.bbox.topLeft.y,
                        xmax: this.bbox.bottomRight.x,
                        ymax: this.bbox.bottomRight.y
                    },
                    keypoints: this.points.map(kp => {
                        return {
                            point: {
                                x: kp.point.x,
                                y: kp.point.y
                            },
                            name: kp.name,
                            visibility: kp.visibility
                        };
                    })
                }
            });
        }
    }
    /*
     |--------------------------------
     | Keyup Modifiers
     |--------------------------------
    */
    onkeyup_normal(event) {
        const key = event.key;
        if (key === 'backspace') {
            if (this.points && this.points.length) {
                this.points.pop();
                this.createContour();
            }
            else if (this.bbox) {
                this.bbox = null;
                this.boundboxMode = true;
                this.createContour();
            }
        }
        else if (key === 'enter') {
            this.makeLabel();
            this.boundboxMode = true;
            this.reset();
        }
    }
    onkeyup_alt(event) {
        const key = event.key;
        if (key.toLowerCase() === 'v') {
            this.visibility = this.visibility === 1 ? 2 : 1;
        }
    }
    /*
     |---------------------------------
     | Mousedown Modifiers
     |---------------------------------
    */
    onmousedown_alt(event) {
        const label = this.labeller.selected;
        const item = event.item;
        if (label &&
            label.type === KeypointLabel.NAME &&
            item.data.index === this.workspace.RESERVED_ITEMS.CONTROL) {
            const path = this.workspace.getPath(this.labeller.selected);
            const points = path.children[2];
            const kp = points.hitTest(item.position).item;
            kp.remove();
            this.labeller.apply(label.id, path);
        }
    }
    onmousedown_shift(event) {
        const label = this.labeller.selected;
        if (label &&
            label.type === KeypointLabel.NAME) {
            const keypoint = this.labeller.keypoint;
            console.log(keypoint);
            if (keypoint) {
                this.labeller.update(label.id, {
                    props: {
                        boundbox: label.props.boundbox,
                        keypoints: [...label.props.keypoints, {
                                point: {
                                    x: event.point.x,
                                    y: event.point.y
                                },
                                name: keypoint.name,
                                visibility: this.visibility
                            }]
                    }
                });
            }
        }
    }
    /*
     |---------------------------------
     | Keypoint drawing
     |---------------------------------
    */
    onmouseup_kp(event) {
        const keypoint = this.labeller.keypoint;
        if (keypoint) {
            this.points.push({
                name: keypoint.name,
                point: event.point,
                visibility: this.visibility
            });
            this.createContour();
        }
    }
    /*
     |---------------------------------
     | Bound box drawing
     |---------------------------------
    */
    onmousedown_bbox(event) {
        if (!(event.item &&
            event.item.data &&
            event.item.data.index === this.workspace.RESERVED_ITEMS.CONTROL)) {
            this.downPoint = event.point;
        }
    }
    onmousedrag_bbox(event) {
        if (this.downPoint) {
            const min = this.downPoint;
            const max = event.point;
            // show preview {
            this.preview && this.preview.remove();
            this.preview = new this.paper.Path.Rectangle(min, max);
            //@ts-ignore
            this.preview.style = {
                strokeColor: new this.paper.Color(this.generalPrefs.preview.color),
                fillColor: null,
                strokeWidth: this.generalPrefs.preview.width * this.ratio,
                dashArray: this.generalPrefs.preview.dashed ? [6 * this.ratio, 3 * this.ratio] : []
            };
            // }
            // show hotspots {
            // if (this.generalPrefs.preview.hotspots) {
            //     this.createHotspot(event, ratio)
            // }
            //}
        }
    }
    onmouseup_bbox(event) {
        if (this.preview && this.preview.area > 0 && this.labeller.class) {
            this.bbox = this.preview.bounds;
            this.preview.remove();
            this.preview = null;
            this.createContour();
            this.boundboxMode = false;
        }
        this.downPoint = null;
    }
    reset() {
        this.preview && this.preview.remove();
        this.contour && this.contour.remove();
        this.contourPoints && this.contourPoints.remove();
        // this.hotspots && this.hotspots.remove()
        this.preview = this.downPoint = this.contour = this.contourPoints = this.bbox = null;
        this.points = [];
        // this.hotspots = null
    }
    createContour() {
        this.contour && this.contour.remove();
        this.contourPoints && this.contourPoints.remove();
        const color = this.labeller.class ? this.labeller.class.color : '#ffff00';
        if (this.bbox) {
            this.contour = new this.paper.Path.Rectangle(this.bbox);
            this.contour.style = {
                strokeColor: new this.paper.Color(color),
                fillColor: null,
                strokeWidth: this.generalPrefs.preview.width * this.ratio
            };
        }
        if (this.points.length) {
            this.contourPoints = new this.paper.Group();
            for (let kp of this.points) {
                this.contourPoints.addChild(new this.paper.Path.Circle(kp.point, this.generalPrefs.preview.width * this.ratio * 3));
            }
            this.contourPoints.fillColor = new this.paper.Color(color);
        }
    }
}
var KeypointTool$1 = labelmoreDevkit.Plugin.Tool({
    name: NAME$1,
    provides: KeypointTool,
    uses: [
        'store',
        'labeller',
        'workspace',
        'settings',
        'paper'
    ]
});

class PanTool extends labelmoreDevkit.AnnotationTool {
    constructor() {
        super(...arguments);
        this.name = 'tools.default.pan';
        this.title = 'Pan';
        this.icon = `<i class="fas fa-hand-paper"></i>`;
        this.cursor = 'grab';
        this.options = {
            limitToArtboard: false,
            showGuide: false
        };
    }
    // on mouse down to keep the last point
    onmousedown(event) {
        this.lastPoint = this.workspace.view.projectToView(event.point);
    }
    // refresh
    onmouseup() {
        this.lastPoint = null;
    }
    // refresh
    ondeactivate() {
        this.lastPoint = null;
    }
    // pan the view
    onmousedrag(event) {
        //convert the point to view coordinates to prevent the jaggering due to instability in coordinates when view is changed
        const point = this.workspace.view.projectToView(event.point);
        //convert the last point back to project coordinate to calculate delta value
        const last = this.workspace.view.viewToProject(this.lastPoint);
        // calculate delta
        const delta = last.subtract(event.point);
        //scroll the view by the delta value computed by subtracting the current mouse point from the downpoint
        this.workspace.offset = this.workspace.offset.add(delta);
        //set last point as the current point
        this.lastPoint = point;
    }
}
var PanTool$1 = {
    install(vue, opts) {
        vue.mixin({
            beforeCreate() {
                if (this.$labeller && this.$tools && this.$workspace && this.$settings) {
                    const pan = new PanTool(this.$workspace, this.$settings, this.$paper);
                    if (!this.$tools.hasTool(pan.name)) {
                        this.$tools.register(pan.name, pan);
                        this.$tools.activate(pan.name);
                    }
                }
            }
        });
    }
};

class BoundboxJsonFormat {
    constructor(labeller) {
        this.labeller = labeller;
    }
    encode(label, class_) {
        return {
            name: this.labeller.getName(label),
            description: {
                type: label.type
            },
            classTitle: class_.name,
            attributes: label.attributes || {},
            points: {
                exterior: [[label.props.xmin, label.props.ymin], [label.props.xmax, label.props.ymax]],
                interior: []
            }
        };
    }
}

class BoundboxLabel extends labelmoreDevkit.SimpleLabelType {
    constructor(projectManager, labeller, workspace, settings, paper) {
        super(labeller, workspace, settings, paper);
        this.title = 'Boundbox';
        // register json format
        if (projectManager.hasEncoder('encoders.default.json')) {
            const jsonEnc = projectManager.getEncoder('encoders.default.json');
            if (!jsonEnc.hasFormat(labelmoreDevkit.DEFAULT_LABEL_TYPES.boundbox)) {
                jsonEnc.registerFormat(labelmoreDevkit.DEFAULT_LABEL_TYPES.boundbox, new BoundboxJsonFormat(labeller));
            }
        }
    }
    tagContent(label, labelClass) {
        return labelClass.name;
    }
    vectorize(label) {
        const min = new this.paper.Point(label.props.xmin, label.props.ymin);
        const max = new this.paper.Point(label.props.xmax, label.props.ymax);
        const path = new this.paper.Path.Rectangle(min, max);
        // console.log('bndbx.vectorize', path)
        return path;
    }
    controls(path) {
        return [
            {
                hotspot: path.bounds.topLeft,
                cursor: 'nw-resize'
            },
            {
                hotspot: path.bounds.topCenter,
                cursor: 'n-resize',
                restrict: 'y'
            },
            {
                hotspot: path.bounds.topRight,
                cursor: 'ne-resize'
            },
            {
                hotspot: path.bounds.rightCenter,
                cursor: 'w-resize',
                restrict: 'x'
            },
            {
                hotspot: path.bounds.bottomRight,
                cursor: 'nw-resize'
            },
            {
                hotspot: path.bounds.bottomCenter,
                cursor: 'n-resize',
                restrict: 'y'
            },
            {
                hotspot: path.bounds.bottomLeft,
                cursor: 'ne-resize'
            },
            {
                hotspot: path.bounds.leftCenter,
                cursor: 'w-resize',
                restrict: 'x'
            },
            {
                hotspot: path.bounds.center,
                cursor: 'move',
                bounds: path.bounds
            }
        ];
    }
    apply(path) {
        const { topLeft, bottomRight } = path.bounds;
        return {
            xmin: topLeft.x,
            ymin: topLeft.y,
            xmax: bottomRight.x,
            ymax: bottomRight.y
        };
    }
}
// export default {
//     install(vue: any, opts: any) {
//         vue.mixin({
//             beforeCreate() {
//                 if (this.$labeller && this.$workspace && this.$settings) {
//                     const boundboxLabel = new BoundboxLabel(this.$labeller, this.$workspace, this.$settings, this.$paper);
//                     if (!this.$labeller.has(boundboxLabel.name)) this.$labeller.register(boundboxLabel.name, boundboxLabel)
//                 }
//             }
//         })
//     }
// }
var BoundboxLabel$1 = labelmoreDevkit.Plugin.Label({
    name: labelmoreDevkit.DEFAULT_LABEL_TYPES.boundbox,
    provides: BoundboxLabel,
    uses: [
        'projects',
        'labeller',
        'workspace',
        'settings',
        'paper'
    ]
});

class PolyJsonFormat {
    constructor(labeller) {
        this.labeller = labeller;
    }
    encode(label, class_) {
        return {
            name: this.labeller.getName(label),
            description: {
                type: label.type
            },
            classTitle: class_.name,
            attributes: label.attributes || {},
            points: {
                exterior: label.props.points.map(p => [p.x, p.y]),
                interior: []
            }
        };
    }
}

class ContourLabel extends labelmoreDevkit.SimpleLabelType {
    constructor(projectManager, labeller, workspace, settings, paper) {
        super(labeller, workspace, settings, paper);
        this.title = 'Contour';
        this.options = {
            showLabelTag: false,
            hasFill: true
        };
        if (projectManager.hasEncoder('encoders.default.json')) {
            const jsonEnc = projectManager.getEncoder('encoders.default.json');
            if (!jsonEnc.hasFormat(labelmoreDevkit.DEFAULT_LABEL_TYPES.contour)) {
                jsonEnc.registerFormat(labelmoreDevkit.DEFAULT_LABEL_TYPES.contour, new PolyJsonFormat(labeller));
            }
        }
    }
    get prefs() {
        return this.settings.getSettings(NAME).labels.contour;
    }
    vectorize(label) {
        const p = new this.paper.Path();
        for (let point of label.props.points) {
            p.add(new paper.Point(point.x, point.y));
            if (this.prefs.showPoints)
                p.selected = true;
        }
        p.closePath();
        return p;
    }
    controls(path) {
        return path.segments.map((s) => {
            return {
                hotspot: s.point,
                cursor: 'pointer'
            };
        });
    }
    apply(path) {
        return {
            points: path.segments.map(s => {
                return { x: s.point.x, y: s.point.y };
            })
        };
    }
}
// export default {
//     install(vue: any, opts: any) {
//         vue.mixin({
//             beforeCreate() {
//                 if (this.$labeller && this.$workspace && this.$settings) {
//                     const contourLabel = new ContourLabel(this.$labeller, this.$workspace, this.$settings, this.$paper);
//                     if (!this.$labeller.has(contourLabel.name)) this.$labeller.register(contourLabel.name, contourLabel)
//                 }
//             }
//         })
//     }
// }
var ContourLabel$1 = labelmoreDevkit.Plugin.Label({
    name: labelmoreDevkit.DEFAULT_LABEL_TYPES.contour,
    provides: ContourLabel,
    uses: [
        'projects',
        'labeller',
        'workspace',
        'settings',
        'paper'
    ]
});

class PolylineLabel extends labelmoreDevkit.SimpleLabelType {
    constructor(projectManager, labeller, workspace, settings, paper) {
        super(labeller, workspace, settings, paper);
        this.title = 'Polyline';
        this.options = {
            showLabelTag: false,
            hasFill: false
        };
        if (projectManager.hasEncoder('encoders.default.json')) {
            const jsonEnc = projectManager.getEncoder('encoders.default.json');
            if (!jsonEnc.hasFormat(labelmoreDevkit.DEFAULT_LABEL_TYPES.line)) {
                jsonEnc.registerFormat(labelmoreDevkit.DEFAULT_LABEL_TYPES.line, new PolyJsonFormat(labeller));
            }
        }
    }
    vectorize(label) {
        const p = new this.paper.Path();
        for (let point of label.props.points) {
            p.add(new paper.Point(point.x, point.y));
        }
        return p;
    }
    controls(path) {
        return path.segments.map((s) => {
            return {
                hotspot: s.point,
                cursor: 'pointer'
            };
        });
    }
    apply(path) {
        return {
            points: path.segments.map(s => {
                return { x: s.point.x, y: s.point.y };
            })
        };
    }
}
// export default {
//     install(vue: any, opts: any) {
//         vue.mixin({
//             beforeCreate() {
//                 if (this.$labeller && this.$workspace && this.$settings) {
//                     const polylineLabel = new PolylineLabel(this.$labeller, this.$workspace, this.$settings, this.$paper);
//                     if (!this.$labeller.has(polylineLabel.name)) this.$labeller.register(polylineLabel.name, polylineLabel)
//                 }
//             }
//         })
//     }
// }
var PolylineLabel$1 = labelmoreDevkit.Plugin.Label({
    name: labelmoreDevkit.DEFAULT_LABEL_TYPES.line,
    provides: PolylineLabel,
    uses: [
        'projects',
        'labeller',
        'workspace',
        'settings',
        'paper'
    ]
});

class LocalizationWizard extends labelmoreDevkit.Wizard {
    constructor(fileManager) {
        super();
        this.fileManager = fileManager;
        this.name = "wizards.default.localization";
        this.title = "Localization Project";
        this.icon = '<i class="fas fa-object-group"></i>';
        this.description = `Locate and Seperate different objects in an image`;
        this.type = 'creator';
        this.options = {
            allowToolSelection: true,
            allowOutputSelection: true,
            allowPanelSelection: true,
            allowLabelClassCreation: true,
            allowClassAttributeCreation: true,
            allowKeypointCreation: true,
            allowSceneAttributeCreation: true,
        };
    }
    input(title, dir, files, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return {
                type: this.name,
                title,
                files,
                options: options,
                frames: null
            };
        });
    }
    load(data, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return data;
        });
    }
    fields() {
        return [];
    }
}
var LocalizationWizard$1 = {
    install(Vue, opts) {
        Vue.mixin({
            beforeCreate() {
                if (this.$files && this.$projects) {
                    const locWiz = new LocalizationWizard(this.$files);
                    if (!this.$projects.hasWizard(locWiz.name)) {
                        this.$projects.registerWizard(locWiz.name, locWiz);
                    }
                }
            }
        });
    }
};

class DiskSource extends labelmoreDevkit.Source {
    constructor(fileManager) {
        super();
        this.fileManager = fileManager;
        this.name = 'sources.default.disk';
        this.title = 'Disk';
        this.icon = `<i class="far fa-hdd"></i>`;
    }
    trigger() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const options = {
                properties: ["openDirectory", "createDirectory"]
            };
            const dir = yield this.fileManager.showOpenDialog(options);
            if (dir && dir.length) {
                return dir[0];
            }
            return null;
        });
    }
    list(dir) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const files = yield this.fileManager.list(dir, {
                file: true,
                extensions: ['jpeg', 'jpg', 'png']
            });
            return files;
        });
    }
    read(...paths) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield this.fileManager.read(...paths);
            return data;
        });
    }
    write(data, ...paths) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.fileManager.write(data, ...paths);
        });
    }
}
var DiskSource$1 = {
    install(Vue, opts) {
        Vue.mixin({
            beforeCreate() {
                if (this.$projects && this.$files) {
                    const diskSource = new DiskSource(this.$files);
                    if (!this.$projects.hasSource(diskSource.name)) {
                        this.$projects.registerSource(diskSource.name, diskSource);
                    }
                }
            }
        });
    }
};

var script$1 = {
    name: 'app-panel-labelclass',
    computed: {
        labelClasses() {
            return this.$labeller.classes;
        },
        labelClass() {
            return this.class_ || { name: 'select class', color: '#7e7e7e' };
        },
        class_() {
            return this.$labeller.class;
        }
    },
    methods: {
        isActive(class_id) {
            return this.class_ && this.class_.id === class_id;
        },
    }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uk-list uk-list-clickable"},_vm._l((_vm.labelClasses),function(cl){return _c('li',{key:cl.id,class:{'uk-active': _vm.class_ && (_vm.class_.id === cl.id)}},[_c('div',{staticClass:"uk-flex uk-padding-small label-class-item",on:{"click":function($event){return _vm.$labeller.selectClass(cl.id)}}},[_c('span',{staticClass:"uk-margin-right",style:({color: cl.color})},[_c('i',{staticClass:"fa-square",class:{fas: cl.id === _vm.labelClass.id, far: cl.id !== _vm.labelClass.id}})]),_vm._v("\n            "+_vm._s(cl.name)+"\n        ")])])}),0)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = "data-v-45a5cb93";
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var LabelClassComponent = __vue_normalize__(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

class LabelClassPanel extends labelmoreDevkit.Panel {
    constructor() {
        super(...arguments);
        this.name = "panels.default.labelclass";
        this.title = 'Label Classes';
        this.icon = `<i class="fas fa-shapes"></i>`;
        this.component = 'app-panel-labelclass';
        this.options = {
            showTitle: true
        };
    }
}
var LabelClassesPanel = {
    install(Vue, opts) {
        Vue.mixin({
            beforeCreate() {
                if (this.$workspace) {
                    const panel = new LabelClassPanel();
                    if (!this.$workspace.hasPanel(panel.name)) {
                        this.$workspace.registerPanel(panel.name, panel);
                        Vue.component(panel.component, LabelClassComponent);
                    }
                }
            }
        });
    }
};

const VISIBILITY = `tools.default.keypoint.visibility`;
var script$2 = {
    name: 'app-panel-keypoints',
    computed: {
        keypoints() {
            return this.$labeller.keypoints;
        },
        keypoint() {
            return this.$labeller.keypoint;
        },
        visible: {
            get() {
                return this.$store.state.globals[VISIBILITY] === 2;
            },
            set(val) {
                const visibility = val ? 2 : 1;
                this.$store.dispatch('setGlobal', {
                    key: VISIBILITY,
                    value: visibility
                });
            }
        }
    }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"uk-padding-small uk-flex"},[_c('button',{staticClass:"uk-button uk-button-small",class:{'uk-button-default' : !_vm.visible, 'uk-button-primary': _vm.visible},attrs:{"uk-tooltip":"title: Toggle Visibility"},on:{"click":function($event){_vm.visible = !_vm.visible;}}},[_c('i',{staticClass:"fas fa-eye"}),_vm._v(" "),_c('span',{staticClass:"uk-margin-left"},[_vm._v(_vm._s(_vm.visible? 'visible' : 'hidden'))])])]),_vm._v(" "),_c('div',{staticClass:"uk-list uk-list-clickable"},_vm._l((_vm.keypoints),function(kp){return _c('li',{key:kp.name,class:{'uk-active': _vm.keypoint && (_vm.keypoint.name === kp.name)}},[_c('div',{staticClass:"uk-padding-small keypoint-item",on:{"click":function($event){return _vm.$labeller.selectKeypoint(kp.name)}}},[_c('span',{staticClass:"uk-margin-right uk-text-primary"},[(_vm.keypoint && (_vm.keypoint.name === kp.name))?_c('i',{staticClass:"far fa-dot-circle"}):_c('i',{staticClass:"far fa-circle"})]),_vm._v("\n                "+_vm._s(kp.name)+"\n            ")])])}),0)])};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = "data-v-1352d58e";
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var KeypointSelectComponent = __vue_normalize__(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );

class KeypointsPanel extends labelmoreDevkit.Panel {
    constructor() {
        super(...arguments);
        this.name = "panels.default.keypoints";
        this.title = 'Keypoints';
        this.icon = `<i class="fas fa-dot-circle"></i>`;
        this.component = 'app-panel-keypoints';
        this.options = {
            showTitle: true
        };
    }
}
var KeypointsPanel$1 = {
    install(Vue, opts) {
        Vue.mixin({
            beforeCreate() {
                if (this.$workspace) {
                    const panel = new KeypointsPanel();
                    if (!this.$workspace.hasPanel(panel.name)) {
                        this.$workspace.registerPanel(panel.name, panel);
                        Vue.component(panel.component, KeypointSelectComponent);
                    }
                }
            }
        });
    }
};

var script$3 = {
    name: 'app-class-attribute-select',
    data() {
        return {
            attributeValues: {}
        };
    },
    computed: {
        attributes() {
            return this.$labeller.attributes;
        },
        attributeVals() {
            return this.$labeller.attributeValues;
        }
    },
    watch: {
        attributeValues: {
            handler(attrs) {
                this.$labeller.attributeValues = attrs;
            },
            deep: true
        },
        attributeVals() {
            this.attributeValues = this.$labeller.attributeValues;
        }
    },
    methods: {
        limitText(count) {
            return `and ${count} more..`;
        },
    },
    created() {
        if (this.$labeller.attributeValues)
            this.attributeValues = this.$labeller.attributeValues;
    }
};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uk-padding-small"},_vm._l((_vm.attributes),function(attr){return _c('div',{key:attr.name,staticClass:"uk-width-1-1 class-attribute-item"},[_c('app-field',{attrs:{"field":attr,"required":true},model:{value:(_vm.attributeValues[attr.name]),callback:function ($$v) {_vm.$set(_vm.attributeValues, attr.name, $$v);},expression:"attributeValues[attr.name]"}})],1)}),0)};
var __vue_staticRenderFns__$3 = [];

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-3faa6309_0", { source: ".class-attribute-item[data-v-3faa6309]:nth-child(n+2){margin-top:.5rem}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = "data-v-3faa6309";
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  

  
  var ClassAttributeSelectComponent = __vue_normalize__(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    __vue_create_injector__,
    undefined
  );

class ClassAttributesPanel extends labelmoreDevkit.Panel {
    constructor() {
        super(...arguments);
        this.name = "panels.default.attributes.class";
        this.title = 'Class Attributes';
        this.icon = `<i class="fas fa-tags"></i>`;
        this.component = 'app-panel-class-attributes';
        this.options = {
            showTitle: true
        };
    }
}
var ClassAttributesPanel$1 = {
    install(Vue, opts) {
        Vue.mixin({
            beforeCreate() {
                if (this.$workspace) {
                    const panel = new ClassAttributesPanel();
                    if (!this.$workspace.hasPanel(panel.name)) {
                        this.$workspace.registerPanel(panel.name, panel);
                        Vue.component(panel.component, ClassAttributeSelectComponent);
                    }
                }
            }
        });
    }
};

var script$4 = {
    name: 'app-scene-attribute-select',
    data() {
        return {
            scene: {}
        };
    },
    watch: {
        scene: {
            handler(attrs) {
                console.log('sc', this.scene);
                this.$projects.scene = attrs;
            },
            deep: true
        },
        sceneVals() {
            console.log('scene', this.sceneVals);
            this.scene = this.sceneVals || {};
        }
    },
    computed: {
        attributes() {
            return this.$projects.sceneAttributes;
        },
        sceneVals() {
            return this.$projects.scene;
        }
    },
    mounted() {
        if (this.sceneVals && Object.keys(this.sceneVals).length > 0) {
            this.scene = this.$projects.scene;
        }
    }
};

/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uk-padding-small"},_vm._l((_vm.attributes),function(attr){return _c('div',{key:attr.name,staticClass:"uk-width-1-1 class-attribute-item"},[_c('app-field',{attrs:{"field":attr,"required":true},model:{value:(_vm.scene[attr.name]),callback:function ($$v) {_vm.$set(_vm.scene, attr.name, $$v);},expression:"scene[attr.name]"}})],1)}),0)};
var __vue_staticRenderFns__$4 = [];

  /* style */
  const __vue_inject_styles__$4 = function (inject) {
    if (!inject) return
    inject("data-v-c6218ee8_0", { source: ".class-attribute-item[data-v-c6218ee8]{margin-top:1rem}.class-attribute-item[data-v-c6218ee8]:first-child{margin-top:0}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$4 = "data-v-c6218ee8";
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  

  
  var SceneAttributeSelectComponent = __vue_normalize__(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    __vue_create_injector__,
    undefined
  );

class SceneAttributesPanel extends labelmoreDevkit.Panel {
    constructor() {
        super(...arguments);
        this.name = "panels.default.attributes.scene";
        this.title = 'Scene Attributes';
        this.icon = `<i class="fas fa-cloud-sun-rain"></i>`;
        this.component = 'app-panel-scene-attributes';
        this.options = {
            showTitle: true
        };
    }
}
var SceneAttributesPanel$1 = {
    install(Vue, opts) {
        Vue.mixin({
            beforeCreate() {
                if (this.$workspace) {
                    const panel = new SceneAttributesPanel();
                    if (!this.$workspace.hasPanel(panel.name)) {
                        this.$workspace.registerPanel(panel.name, panel);
                        Vue.component(panel.component, SceneAttributeSelectComponent);
                    }
                }
            }
        });
    }
};

const IMAGE_DATA = "PHN2ZyB2ZXJzaW9uPSIxLjEiCgkgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6YT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZVNWR1ZpZXdlckV4dGVuc2lvbnMvMy4wLyIKCSB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjU2cHgiIGhlaWdodD0iNTZweCIgdmlld0JveD0iMCAwIDU2IDU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NiA1NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNFOUU5RTA7fQoJLnN0MXtmaWxsOiNEOUQ3Q0E7fQoJLnN0MntmaWxsOiM5Nzc3QTg7fQoJLnN0M3tmaWxsOiNGRkZGRkY7fQoJLnN0NHtmaWxsOm5vbmU7fQo8L3N0eWxlPgo8ZGVmcz4KPC9kZWZzPgo8Zz4KCTxnPgoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zNywwSDhDNy4yLDAsNi41LDAuNyw2LjUsMS45VjU1YzAsMC4zLDAuNywxLDEuNSwxSDQ4YzAuOCwwLDEuNS0wLjcsMS41LTFWMTNjMC0wLjctMC4xLTAuOS0wLjMtMS4xCgkJCUwzNy42LDAuM0MzNy40LDAuMSwzNy4yLDAsMzcsMHoiLz4KCQk8cG9seWdvbiBjbGFzcz0ic3QxIiBwb2ludHM9IjM3LjUsMC4yIDM3LjUsMTIgNDkuMywxMiAJCSIvPgoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik00OCw1Nkg4Yy0wLjgsMC0xLjUtMC43LTEuNS0xLjVWMzloNDN2MTUuNUM0OS41LDU1LjMsNDguOCw1Niw0OCw1NnoiLz4KCQk8Zz4KCQkJPHBhdGggY2xhc3M9InN0MyIgZD0iTTE3LDQyLjd2Ny44YzAsMC41LTAuMSwwLjktMC4zLDEuMnMtMC40LDAuNi0wLjcsMC44cy0wLjYsMC4zLTEsMC40cy0wLjgsMC4xLTEuMiwwLjFjLTAuMiwwLTAuNCwwLTAuNy0wLjEKCQkJCXMtMC41LTAuMS0wLjgtMC4ycy0wLjYtMC4yLTAuOC0wLjNzLTAuNS0wLjItMC43LTAuNGwwLjctMS4xYzAuMSwwLjEsMC4yLDAuMSwwLjQsMC4yczAuNCwwLjEsMC42LDAuMnMwLjQsMC4xLDAuNiwwLjIKCQkJCXMwLjQsMC4xLDAuNiwwLjFjMC41LDAsMC45LTAuMSwxLjItMC4zczAuNC0wLjUsMC41LTF2LTcuN0wxNyw0Mi43TDE3LDQyLjd6Ii8+CgkJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0yNS4yLDUwLjJjMCwwLjQtMC4xLDAuNy0wLjIsMS4xcy0wLjQsMC42LTAuNiwwLjlzLTAuNiwwLjUtMSwwLjZzLTAuOSwwLjItMS40LDAuMmMtMC4yLDAtMC40LDAtMC43LDAKCQkJCXMtMC41LTAuMS0wLjctMC4xYy0wLjItMC4xLTAuNS0wLjEtMC43LTAuMnMtMC40LTAuMi0wLjYtMC4zbDAuMy0xLjJjMC4xLDAuMSwwLjMsMC4xLDAuNSwwLjJzMC40LDAuMSwwLjYsMC4yczAuNCwwLjEsMC42LDAuMQoJCQkJczAuNCwwLjEsMC42LDAuMWMwLjYsMCwxLTAuMSwxLjMtMC40czAuNC0wLjYsMC40LTEuMmMwLTAuMy0wLjEtMC42LTAuMy0wLjhzLTAuNS0wLjQtMC44LTAuNnMtMC43LTAuNC0xLTAuNXMtMC43LTAuNC0xLTAuNgoJCQkJcy0wLjYtMC41LTAuOC0wLjlzLTAuMy0wLjctMC4zLTEuMmMwLTAuNCwwLjEtMC44LDAuMi0xLjJzMC40LTAuNiwwLjctMC45czAuNi0wLjQsMS0wLjZzMC44LTAuMiwxLjItMC4yYzAuNCwwLDAuOCwwLDEuMywwLjEKCQkJCXMwLjgsMC4yLDEsMC40Yy0wLjEsMC4xLTAuMSwwLjItMC4yLDAuNHMtMC4xLDAuMy0wLjIsMC40cy0wLjEsMC4yLTAuMiwwLjNzLTAuMSwwLjEtMC4xLDAuMWMtMC4xLDAtMC4xLTAuMS0wLjItMC4xCgkJCQlzLTAuMi0wLjEtMC4zLTAuMXMtMC4zLTAuMS0wLjUtMC4xcy0wLjUsMC0wLjgsMGMtMC4yLDAtMC40LDAuMS0wLjUsMC4ycy0wLjMsMC4yLTAuNCwwLjNzLTAuMiwwLjMtMC4zLDAuNFMyMSw0NS40LDIxLDQ1LjUKCQkJCWMwLDAuNCwwLjEsMC43LDAuMywwLjlzMC41LDAuNCwwLjgsMC42czAuNiwwLjMsMSwwLjVzMC43LDAuNCwxLDAuNnMwLjYsMC41LDAuOCwwLjlTMjUuMiw0OS43LDI1LjIsNTAuMnoiLz4KCQkJPHBhdGggY2xhc3M9InN0MyIgZD0iTTM1LjEsNDcuOWMwLDAuOC0wLjEsMS42LTAuMywyLjJzLTAuNSwxLjItMC45LDEuNnMtMC44LDAuOC0xLjMsMXMtMS4xLDAuMy0xLjcsMC4zcy0xLjItMC4xLTEuNy0wLjMKCQkJCXMtMC45LTAuNS0xLjMtMXMtMC43LTEtMC45LTEuNnMtMC4zLTEuNC0wLjMtMi4yczAuMS0xLjYsMC4zLTIuMnMwLjUtMS4yLDAuOS0xLjZzMC44LTAuOCwxLjMtMXMxLjEtMC4zLDEuNy0wLjMKCQkJCXMxLjIsMC4xLDEuNywwLjNzMC45LDAuNSwxLjMsMXMwLjcsMSwwLjksMS42UzM1LjEsNDcuMSwzNS4xLDQ3Ljl6IE0zMC44LDUxLjdjMC4zLDAsMC43LTAuMSwxLTAuMnMwLjYtMC4zLDAuOC0wLjYKCQkJCXMwLjQtMC43LDAuNi0xLjJzMC4yLTEuMSwwLjItMS44YzAtMC43LTAuMS0xLjMtMC4yLTEuN3MtMC4zLTAuOS0wLjUtMS4ycy0wLjUtMC41LTAuOC0wLjdzLTAuNi0wLjItMC45LTAuMgoJCQkJYy0wLjMsMC0wLjcsMC4xLTEsMC4ycy0wLjYsMC4zLTAuOCwwLjZzLTAuNCwwLjctMC42LDEuMmMtMC4xLDAuNS0wLjIsMS4xLTAuMiwxLjhjMCwwLjcsMC4xLDEuMywwLjIsMS44czAuMywwLjksMC41LDEuMgoJCQkJczAuNSwwLjUsMC44LDAuN1MzMC41LDUxLjcsMzAuOCw1MS43eiIvPgoJCQk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNNDQuNyw0Mi45VjUzSDQzbC00LTYuOVY1M2gtMS43VjQyLjloMS43bDQsNi45di02LjlINDQuN3oiLz4KCQk8L2c+CgkJPGc+CgkJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xOS41LDE5di00YzAtMC42LDAuNC0xLDEtMWMwLjYsMCwxLTAuNCwxLTFzLTAuNC0xLTEtMWMtMS43LDAtMywxLjMtMywzdjRjMCwxLjEtMC45LDItMiwyCgkJCQljLTAuNiwwLTEsMC40LTEsMXMwLjQsMSwxLDFjMS4xLDAsMiwwLjksMiwydjRjMCwxLjcsMS4zLDMsMywzYzAuNiwwLDEtMC40LDEtMXMtMC40LTEtMS0xYy0wLjYsMC0xLTAuNC0xLTF2LTQKCQkJCWMwLTEuMi0wLjUtMi4zLTEuNC0zQzE5LDIxLjMsMTkuNSwyMC4yLDE5LjUsMTl6Ii8+CgkJCTxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjI3LjUiIGN5PSIxOC41IiByPSIxLjUiLz4KCQkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTM5LjUsMjFjLTEuMSwwLTItMC45LTItMnYtNGMwLTEuNy0xLjMtMy0zLTNjLTAuNiwwLTEsMC40LTEsMXMwLjQsMSwxLDFjMC42LDAsMSwwLjQsMSwxdjQKCQkJCWMwLDEuMiwwLjUsMi4zLDEuNCwzYy0wLjgsMC43LTEuNCwxLjgtMS40LDN2NGMwLDAuNi0wLjQsMS0xLDFjLTAuNiwwLTEsMC40LTEsMXMwLjQsMSwxLDFjMS43LDAsMy0xLjMsMy0zdi00YzAtMS4xLDAuOS0yLDItMgoJCQkJYzAuNiwwLDEtMC40LDEtMVM0MC4xLDIxLDM5LjUsMjF6Ii8+CgkJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0yNy41LDI0Yy0wLjYsMC0xLDAuNC0xLDF2M2MwLDAuNiwwLjQsMSwxLDFzMS0wLjQsMS0xdi0zQzI4LjUsMjQuNCwyOC4xLDI0LDI3LjUsMjR6Ii8+CgkJPC9nPgoJPC9nPgoJPHJlY3QgY2xhc3M9InN0NCIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2Ii8+CjwvZz4KPC9zdmc+";
class JsonEncoder extends labelmoreDevkit.Encoder {
    constructor() {
        super();
        this.title = "JSON";
        this.icon = `<img src="data:image/svg+xml;base64,${IMAGE_DATA}"/>`;
        this.formats = new Map();
    }
    encode(frame, project) {
        const labelData = frame.labels
            // convert
            .map(label => {
            const class_ = project.options.labelClasses.find(cl => cl.id === label.class_id);
            return this.convertLabel(label, class_);
        })
            // filter out incompatable labels
            .filter(obj => obj);
        const json = {
            path: `${project.options.inputPath}/${frame.name}`,
            description: project.title,
            output: {
                objects: labelData,
                image: Object.assign({ name: removeExtension(frame.name) }, frame.props.size, { attributes: frame.props.scene })
            },
            time_labeled: new Date().getTime(),
            labeled: labelData.length > 0
        };
        const data = new Buffer(JSON.stringify(json, undefined, 4));
        return [{
                name: removeExtension(frame.name) + '.json',
                subdirectory: labelmoreDevkit.Encoder.SUBFOLDERS.ANNOTATIONS,
                data: data
            }];
    }
    finalize(project) {
        const options = project.options;
        const title = project.title;
        const type = project.type;
        const json = { options, title, type };
        const data = new Buffer(JSON.stringify(json, undefined, 4));
        return [{
                name: 'meta.json',
                data
            }];
    }
    /**
     * Register a format into the json encoder
     * @param type label type
     * @param format object with an encode function
     */
    registerFormat(type, format) {
        if (!this.formats.has(type)) {
            this.formats.set(type, format);
        }
        else {
            console.warn(`Format register failed: Collision on type ${type}`);
        }
    }
    /**
     * Check if a format exist or not
     * @param type type of label
     */
    hasFormat(type) {
        return this.formats.has(type);
    }
    convertLabel(label, class_) {
        if (this.formats.has(label.type)) {
            return this.formats.get(label.type).encode(label, class_);
        }
        return null;
    }
}
JsonEncoder.NAME = 'encoders.default.json';
var JsonEncoder$1 = labelmoreDevkit.Plugin.Encoder({
    name: JsonEncoder.NAME,
    provides: JsonEncoder,
    uses: []
});

// tools
var index = {
    install(vue, opts) {
        // encoders
        vue.use(JsonEncoder$1);
        // wizards
        vue.use(LocalizationWizard$1);
        // sources
        vue.use(DiskSource$1);
        // labels
        vue.use(BoundboxLabel$1);
        vue.use(ContourLabel$1);
        vue.use(PolylineLabel$1);
        vue.use(KeypointLabel$1);
        // tools
        vue.use(SelectTool$1);
        vue.use(BoundboxTool$1);
        vue.use(ContourTool$1);
        vue.use(LineTool$1);
        vue.use(KeypointTool$1);
        vue.use(PanTool$1);
        // panels
        vue.use(LabelClassesPanel);
        vue.use(KeypointsPanel$1);
        vue.use(ClassAttributesPanel$1);
        vue.use(SceneAttributesPanel$1);
        // settings
        vue.use(EssentialSettings);
    }
};

module.exports = index;
