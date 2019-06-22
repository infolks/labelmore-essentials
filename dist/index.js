/*!
 * @infolks/labelmore-essentials v0.5.0
 * (c) infolks
 * Released under the ISC License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var labelmoreDevkit = require('@infolks/labelmore-devkit');
var paper = require('paper');
var __vue_normalize__ = _interopDefault(require('vue-runtime-helpers/dist/normalize-component.js'));
var tslib_1 = require('tslib');
var __vue_create_injector__ = _interopDefault(require('vue-runtime-helpers/dist/inject-style/browser.js'));

// import {NAME as ESSENTIAL_SETTINGS} from "../settings"
class SelectTool extends labelmoreDevkit.AnnotationTool {
    // private item: Item;
    // private moved: boolean = false;
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
    // get prefs():SelectToolSettings {
    //     return this.settings.getSettings(ESSENTIAL_SETTINGS).tools.select
    // }
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
        this.labeller.deselect();
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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form',{attrs:{"id":"boundbox-settings-form"},on:{"submit":function($event){$event.preventDefault();return _vm.submit()}}},[_c('h5',{staticClass:"settings-sub-heading"},[_vm._v("Tool Settings")]),_vm._v(" "),_c('div',{staticClass:"uk-margin"},[_c('div',{staticClass:"uk-grid-small",attrs:{"uk-grid":""}},[_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"guide_color"}},[_vm._v("Preview Color: ")]),_vm._v(" "),_c('app-color-input',{attrs:{"pos":"bottom"},model:{value:(_vm.settings.tools.general.preview.color),callback:function ($$v) {_vm.$set(_vm.settings.tools.general.preview, "color", $$v);},expression:"settings.tools.general.preview.color"}})],1),_vm._v(" "),_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"guide_color"}},[_vm._v("Preview Stroke Width:")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.settings.tools.general.preview.width),expression:"settings.tools.general.preview.width",modifiers:{"number":true}}],staticClass:"uk-input",attrs:{"type":"number","name":"min_area","min":1},domProps:{"value":(_vm.settings.tools.general.preview.width)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.settings.tools.general.preview, "width", _vm._n($event.target.value));},"blur":function($event){return _vm.$forceUpdate()}}})]),_vm._v(" "),_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"guide_color"}},[_vm._v("Preview Dashed:")]),_vm._v(" "),_c('app-check-toggle',{staticClass:"uk-width-1-1",model:{value:(_vm.settings.tools.general.preview.dashed),callback:function ($$v) {_vm.$set(_vm.settings.tools.general.preview, "dashed", $$v);},expression:"settings.tools.general.preview.dashed"}},[_vm._v(_vm._s(_vm.settings.tools.general.preview.dashed? 'dashed' : 'not dashed'))])],1),_vm._v(" "),_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"guide_color"}},[_vm._v("Hotspots:")]),_vm._v(" "),_c('app-check-toggle',{staticClass:"uk-width-1-1",model:{value:(_vm.settings.tools.general.preview.hotspots),callback:function ($$v) {_vm.$set(_vm.settings.tools.general.preview, "hotspots", $$v);},expression:"settings.tools.general.preview.hotspots"}},[_vm._v(_vm._s(_vm.settings.tools.general.preview.hotspots? 'enabled' : 'disabled'))])],1),_vm._v(" "),_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"min_area"}},[_vm._v("Minimum Area")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.settings.tools.boundbox.minArea),expression:"settings.tools.boundbox.minArea",modifiers:{"number":true}}],staticClass:"uk-input",attrs:{"type":"number","name":"min_area","min":0.01,"step":0.01},domProps:{"value":(_vm.settings.tools.boundbox.minArea)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.settings.tools.boundbox, "minArea", _vm._n($event.target.value));},"blur":function($event){return _vm.$forceUpdate()}}})]),_vm._v(" "),_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"min_snap_distance"}},[_vm._v("Minimum Snap Distance")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.settings.tools.contour.snapDistance),expression:"settings.tools.contour.snapDistance",modifiers:{"number":true}}],staticClass:"uk-input",attrs:{"type":"number","name":"min_snap_distance","min":5,"step":1},domProps:{"value":(_vm.settings.tools.contour.snapDistance)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.settings.tools.contour, "snapDistance", _vm._n($event.target.value));},"blur":function($event){return _vm.$forceUpdate()}}})]),_vm._v(" "),_c('div',{staticClass:"uk-width-1-2 uk-width-1-3@s uk-width-1-6@m"},[_c('label',{staticClass:"uk-form-label",attrs:{"for":"min_sides"}},[_vm._v("Minimum Sides")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.settings.tools.contour.minSides),expression:"settings.tools.contour.minSides",modifiers:{"number":true}}],staticClass:"uk-input",attrs:{"type":"number","name":"min_sides","min":3,"step":1},domProps:{"value":(_vm.settings.tools.contour.minSides)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.settings.tools.contour, "minSides", _vm._n($event.target.value));},"blur":function($event){return _vm.$forceUpdate()}}})])])])])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = "data-v-4cbf1986";
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
            snapDistance: 10,
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
                this.hotspots && this.hotspots.remove();
                // point for padding
                const padPoint = new paper.Point(5, 5);
                const txtStart = new this.paper.PointText(padPoint /* dummy point*/);
                txtStart.content = `(${event.downPoint.round().x}, ${event.downPoint.round().y})`; // coordinates
                // apply style
                txtStart.style = {
                    fontSize: 9 * ratio,
                    fontWeight: 300,
                    fillColor: new paper.Color(this.generalPrefs.preview.color)
                };
                txtStart.bounds.bottomRight = event.downPoint.subtract(padPoint); // real point
                const txtEnd = new this.paper.PointText(padPoint /* dummy point*/);
                txtEnd.content = `(${event.point.round().x}, ${event.point.round().y})`; // coordinates
                txtEnd.style = txtStart.style;
                txtEnd.bounds.bottomRight = event.point.subtract(padPoint); // real point
                this.hotspots = new this.paper.Group([txtStart, txtEnd]);
            }
            //}
        }
    }
    onmousedown(event) {
        this.downPoint = event.point;
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
        this.preview && this.preview.remove();
        this.hotspots && this.hotspots.remove();
        this.preview = null;
        this.downPoint = null;
        this.hotspots = null;
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
    onmousedown(event) {
        if (this.closePathActive) {
            this.makeLabel();
        }
        else {
            this.points.push(event.point);
        }
        this.createContour();
    }
    onmousemove(event) {
        if (this.points.length) {
            const ratio = 1 / this.workspace.zoom;
            this.createContour();
            this.createPreview(event.point);
            if (event.point.getDistance(this.firstPoint) < this.prefs.snapDistance) {
                this.createClosePoint();
                this.closePathActive = true;
            }
            else {
                this.closePoint && this.closePoint.remove();
                this.closePoint = null;
                this.closePathActive = false;
            }
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
                }
            }
        }
        else if (key === 'enter') {
            this.makeLabel();
        }
    }
    reset() {
        this.preview && this.preview.remove();
        this.contour && this.contour.remove();
        this.contourJoints && this.contourJoints.remove();
        this.closePoint && this.closePoint.remove();
        this.preview = this.contour = this.closePoint = null;
        this.closePathActive = false;
        this.points = [];
        this.workspace.cursor = this.cursor;
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
                    id: new Date().getTime(),
                    type: labelmoreDevkit.DEFAULT_LABEL_TYPES.contour,
                    class_id: class_.id,
                    props: {
                        points: this.points.map(p => ({ x: p.x, y: p.y }))
                    }
                });
            }
            // reset
            this.reset();
        }
    }
    /// PRIVATE
    createContour() {
        this.contour && this.contour.remove();
        this.contourJoints && this.contourJoints.remove();
        if (this.points.length) {
            const ratio = 1 / this.workspace.zoom;
            this.contour = new this.paper.Path(this.points);
            this.contourJoints = new this.paper.Group();
            // joints
            for (let point of this.points) {
                this.contourJoints.addChild(new this.paper.Path.Circle(point, this.generalPrefs.preview.width * 5));
            }
            const color = this.labeller.class ? this.labeller.class.color : '#ffff00';
            // @ts-ignore
            this.contour.style = {
                strokeColor: new paper.Color(color),
                fillColor: null,
                strokeWidth: this.generalPrefs.preview.width * ratio
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
            const ratio = 1 / this.workspace.zoom;
            this.closePoint = new this.paper.Path.Circle(this.firstPoint, this.prefs.snapDistance);
            const color = this.labeller.class ? this.labeller.class.color : '#ffff00';
            // @ts-ignore
            this.closePoint.style = {
                strokeColor: new paper.Color(color),
                fillColor: null,
                strokeWidth: this.generalPrefs.preview.width * ratio
            };
        }
    }
    createPreview(cursorPoint) {
        if (this.firstPoint && cursorPoint) {
            this.preview && this.preview.remove();
            this.preview = new this.paper.Path();
            this.preview.add(this.firstPoint);
            this.preview.add(cursorPoint);
            if (this.lastPoint && !this.firstPoint.equals(this.lastPoint)) {
                this.preview.add(this.lastPoint);
            }
            const ratio = 1 / this.workspace.zoom;
            // @ts-ignore
            this.preview.style = {
                strokeWidth: this.generalPrefs.preview.width * ratio,
                fillColor: null,
                strokeColor: this.generalPrefs.preview.color,
                dashArray: this.generalPrefs.preview.dashed ? [6 * ratio, 3 * ratio] : []
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

class BoundboxLabel extends labelmoreDevkit.SimpleLabelType {
    constructor(labeller, workspace, settings, paper) {
        super(labeller, workspace, settings, paper);
        this.title = 'Boundbox';
        this.name = labelmoreDevkit.DEFAULT_LABEL_TYPES.boundbox;
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
var BoundboxLabel$1 = {
    install(vue, opts) {
        vue.mixin({
            beforeCreate() {
                if (this.$labeller && this.$workspace && this.$settings) {
                    const boundboxLabel = new BoundboxLabel(this.$labeller, this.$workspace, this.$settings, this.$paper);
                    if (!this.$labeller.has(boundboxLabel.name))
                        this.$labeller.register(boundboxLabel.name, boundboxLabel);
                }
            }
        });
    }
};

class ContourLabel extends labelmoreDevkit.SimpleLabelType {
    constructor(labeller, workspace, settings, paper) {
        super(labeller, workspace, settings, paper);
        this.title = 'Contour';
        this.name = labelmoreDevkit.DEFAULT_LABEL_TYPES.contour;
        this.options = {
            showLabelTag: false
        };
    }
    vectorize(label) {
        const p = new this.paper.Path();
        for (let point of label.props.points) {
            p.add(new paper.Point(point.x, point.y));
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
var ContourLabel$1 = {
    install(vue, opts) {
        vue.mixin({
            beforeCreate() {
                if (this.$labeller && this.$workspace && this.$settings) {
                    const contourLabel = new ContourLabel(this.$labeller, this.$workspace, this.$settings, this.$paper);
                    if (!this.$labeller.has(contourLabel.name))
                        this.$labeller.register(contourLabel.name, contourLabel);
                }
            }
        });
    }
};

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
            allowClassAttributeCreation: true,
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
            const dir = yield this.fileManager.browse(options);
            if (dir.filePaths)
                return dir.filePaths[0];
            else
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
    read(dir, filename) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield this.fileManager.read(dir, filename);
            return data;
        });
    }
    write(dir, filename, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.fileManager.write(dir, filename, data);
        });
    }
    join(dir, subdir) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (dir + '/' + subdir).replace(/(\/)+/, '/');
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
  const __vue_scope_id__$1 = "data-v-04397312";
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

var script$2 = {
    name: 'app-panel-keypoints',
    computed: {
        keypoints() {
            console.log(this, this.$labeller);
            return this.$labeller.keypoints;
        },
        keypoint() {
            return this.$labeller.keypoint;
        }
    }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uk-list uk-list-clickable"},_vm._l((_vm.keypoints),function(kp){return _c('li',{key:kp.name,class:{'uk-active': _vm.keypoint && (_vm.keypoint.name === kp.name)}},[_c('div',{staticClass:"uk-padding-small keypoint-item",on:{"click":function($event){return _vm.$labeller.selectKeypoint(kp.name)}}},[_c('span',{staticClass:"uk-margin-right uk-text-primary"},[(_vm.keypoint && (_vm.keypoint.name === kp.name))?_c('i',{staticClass:"far fa-dot-circle"}):_c('i',{staticClass:"far fa-circle"})]),_vm._v("\n            "+_vm._s(kp.name)+"\n        ")])])}),0)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = "data-v-a92710a0";
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
    },
    filters: {
        beautify(value) {
            if (!value)
                return '';
            value = value.toString();
            return value.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        }
    }
};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uk-padding-small"},_vm._l((_vm.attributes),function(attr){return _c('div',{key:attr.name,staticClass:"uk-width-1-1 class-attribute-item"},[_c('div',{staticClass:"uk-text-small"},[_vm._v(_vm._s(_vm._f("beautify")(attr.name)))]),_vm._v(" "),_c('app-multi-select',{attrs:{"options":attr.values,"multiple":attr.multi,"placeholder":"Select","limit":3,"limit-text":_vm.limitText,"close-on-select":!attr.multi},model:{value:(_vm.attributeValues[attr.name]),callback:function ($$v) {_vm.$set(_vm.attributeValues, attr.name, $$v);},expression:"attributeValues[attr.name]"}})],1)}),0)};
var __vue_staticRenderFns__$3 = [];

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-d52a87aa_0", { source: ".class-attribute-item[data-v-d52a87aa]:nth-child(n+2){margin-top:.5rem}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = "data-v-d52a87aa";
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
                this.$projects.scene = attrs;
            },
            deep: true
        },
        sceneVals() {
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
    created() {
        if (this.$projects.scene)
            this.scene = this.$projects.scene;
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
    inject("data-v-15a50a61_0", { source: ".class-attribute-item[data-v-15a50a61]{margin-top:1rem}.class-attribute-item[data-v-15a50a61]:first-child{margin-top:0}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$4 = "data-v-15a50a61";
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
    constructor(projectManager, labeller) {
        super();
        this.projectManager = projectManager;
        this.labeller = labeller;
        this.title = "JSON";
        this.icon = `<img src="data:image/svg+xml;base64,${IMAGE_DATA}"/>`;
        this.name = 'encoders.default.json';
    }
    encode(frame, project) {
        const labelData = frame.labels
            // convert
            .map(label => {
            const class_ = project.options.labelClasses.find(cl => cl.id === label.class_id);
            return this.convertLabel(label, class_);
        })
            // filter out incompatable labels
            .filter(obj => obj !== null);
        const source = this.projectManager.getSource(project.options.outputSource);
        const json = {
            path: source.join(project.options.inputPath, frame.name),
            description: project.title,
            output: {
                objects: labelData
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
    convertLabel(label, class_) {
        if (label.type === labelmoreDevkit.DEFAULT_LABEL_TYPES.boundbox) {
            return {
                name: this.labeller.getName(label),
                description: {
                    type: label.type
                },
                tags: label.props.tags || [],
                classTitle: class_.name,
                attributes: label.props.attributes || {},
                points: {
                    exterior: [[label.props.xmin, label.props.ymin], [label.props.xmax, label.props.ymax]],
                    interior: []
                }
            };
        }
        return null;
    }
}
var JsonEncoder$1 = {
    install(Vue, opts) {
        Vue.mixin({
            beforeCreate() {
                if (this.$projects) {
                    const json = new JsonEncoder(this.$projects, this.$labeller);
                    if (!this.$projects.hasEncoder(json.name)) {
                        this.$projects.registerEncoder(json.name, json);
                    }
                }
            }
        });
    }
};

// tools
var index = {
    install(vue, opts) {
        // settings
        vue.use(SelectTool$1);
        vue.use(BoundboxTool$1);
        vue.use(ContourTool$1);
        vue.use(PanTool$1);
        // labels
        vue.use(BoundboxLabel$1);
        vue.use(ContourLabel$1);
        // wizards
        vue.use(LocalizationWizard$1);
        // sources
        vue.use(DiskSource$1);
        // panels
        vue.use(LabelClassesPanel);
        vue.use(KeypointsPanel$1);
        vue.use(ClassAttributesPanel$1);
        vue.use(SceneAttributesPanel$1);
        // encoders
        vue.use(JsonEncoder$1);
        // settings
        vue.use(EssentialSettings);
    }
};

module.exports = index;
