import { AnnotationTool, AnnotationToolOptions, LabelManager, WorkspaceManager, SettingsManager, Plugin, DEFAULT_LABEL_TYPES, Label } from "@infolks/labelmore-devkit";
import { Point, Path, PaperScope, ToolEvent, Group, Rectangle, KeyEvent, Item } from "paper";
import {NAME as ESSENTIAL_SETTINGS, GeneralToolSettings } from "../settings";
import { KeypointLabel, KeypointProps } from "../labels/keypoint.label";

const NAME = 'tools.default.keypoint'

class KeypointTool extends AnnotationTool {

    public readonly name = NAME
    public readonly title = 'Keypoint'
    public readonly icon = `<i class="far fa-dot-circle"></i>`
    public readonly cursor = 'crosshair'

    private points: {name: string, point: Point, visibility: number}[] = []
    private bbox: Rectangle
    private preview: Path
    private boundboxMode: boolean = true
    private downPoint: Point
    private contour: Path
    private contourPoints: Group

    protected options: Partial<AnnotationToolOptions>= {
        showGuide: true,
        limitToArtboard: true
    }

    constructor(
        protected store     : any,
        protected labeller  : LabelManager, 
        protected workspace : WorkspaceManager, 
        protected settings  : SettingsManager,
        protected paper     : PaperScope
    ) {
        super(workspace, settings, paper)

        this.visibility = 2
    }

    private get ratio() {
        return 1/this.workspace.zoom
    }

    private get visibility() {
        return this.store.state.globals[`${this.name}.visibility`]
    }

    private set visibility(val: number) {
        this.store.dispatch('setGlobal', {
            key: `${this.name}.visibility`,
            value: val
        })
    }

    get generalPrefs(): GeneralToolSettings {
        return this.settings.getSettings(ESSENTIAL_SETTINGS).tools.general
    }

    onmouseup(event: ToolEvent) {

        console.log('keypoint mouseup', `boxmode: ${this.boundboxMode}`)

        if (this.boundboxMode) {

            this.onmouseup_bbox(event)

        }

        else {

            this.onmouseup_kp(event)
        }
    }

    onmousemove(event: ToolEvent) {

        console.log('keypoint mousemove', `boxmode: ${this.boundboxMode}`)

        this.createContour()

    }

    onmousedown(event: ToolEvent) {

        console.log('keypoint mousedown', `boxmode: ${this.boundboxMode}`)

        if (event.modifiers.shift) {
            this.onmousedown_shift(event)
        }

        else if (event.modifiers.alt) {

            this.onmousedown_alt(event)
        }

        else if (this.boundboxMode) {
            this.onmousedown_bbox(event)
        }
    }

    onmousedrag(event: ToolEvent) {

        console.log('keypoint mousedrag', `boxmode: ${this.boundboxMode}`)

        if (this.boundboxMode) {
            this.onmousedrag_bbox(event)
        }
    }

    onkeyup(event: KeyEvent) {

        if (event.modifiers.alt) {
            this.onkeyup_alt(event)
        }

        else {
            this.onkeyup_normal(event)
        }
    }

    /*
     |------------------------
     | Private
     |------------------------
    */

    private makeLabel() {

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
                        }
                    })
                }
            })
        }
    }

    /*
     |--------------------------------
     | Keyup Modifiers
     |--------------------------------
    */

    private onkeyup_normal(event: KeyEvent) {

        const key = event.key

        if (key === 'backspace') {

            if (this.points && this.points.length) {

                this.points.pop()

                this.createContour()
            }

            else if (this.bbox) {

                this.bbox = null
                this.boundboxMode = true

                this.createContour()
            }
        }

        else if (key === 'enter') {

            this.makeLabel()

            this.boundboxMode = true

            this.reset()
        }
    }

    private onkeyup_alt(event: KeyEvent) {
        const key = event.key

        if (key.toLowerCase() === 'v') {

            this.visibility = this.visibility === 1 ? 2 : 1

        }
    }
    
    /*
     |---------------------------------
     | Mousedown Modifiers
     |---------------------------------
    */
    private onmousedown_alt(event: ToolEvent) {

        const label = this.labeller.selected

        const item = event.item

        if (
            label && 
            label.type === KeypointLabel.NAME && 
            item.data.index === this.workspace.RESERVED_ITEMS.CONTROL
        ) {

            const path = <Item>this.workspace.getPath(this.labeller.selected)

            const points = path.children[2]

            const kp = points.hitTest(item.position).item

            kp.remove()

            this.labeller.apply(label.id, path)

        }
    }

    private onmousedown_shift(event: ToolEvent) {

            const label: Label<KeypointProps> = this.labeller.selected

            if (
                label && 
                label.type === KeypointLabel.NAME
            ) {

                const keypoint = this.labeller.keypoint

                console.log(keypoint)

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
                    })

                }


            }
        }

    /* 
     |---------------------------------
     | Keypoint drawing
     |---------------------------------
    */

    private onmouseup_kp(event: ToolEvent) {

        const keypoint = this.labeller.keypoint

        if (keypoint) {
            this.points.push({
                name: keypoint.name,
                point: event.point,
                visibility: this.visibility
            })
            this.createContour()
        }

    }

    /* 
     |---------------------------------
     | Bound box drawing
     |---------------------------------
    */

    private onmousedown_bbox(event: ToolEvent) {

        if (!(
            event.item &&
            event.item.data &&
            event.item.data.index === this.workspace.RESERVED_ITEMS.CONTROL
        )) {
            this.downPoint = event.point
        }

    }

    private onmousedrag_bbox(event: ToolEvent) {

        if (this.downPoint) {

            const min = this.downPoint
            const max = event.point

            // show preview {

            this.preview && this.preview.remove()

            this.preview = new this.paper.Path.Rectangle(min, max)
            
            //@ts-ignore
            this.preview.style = {
                strokeColor: new this.paper.Color(this.generalPrefs.preview.color),
                fillColor: null,
                strokeWidth: this.generalPrefs.preview.width*this.ratio,
                dashArray: this.generalPrefs.preview.dashed? [6*this.ratio, 3*this.ratio]: []
            }

            // }

            // show hotspots {

            // if (this.generalPrefs.preview.hotspots) {

            //     this.createHotspot(event, ratio)

            // }

            //}

        }
    }

    private onmouseup_bbox(event: ToolEvent) {

        if (this.preview && this.preview.area > 0 && this.labeller.class) {

            this.bbox = this.preview.bounds
            
            this.preview.remove()
            this.preview = null

            this.createContour()

            this.boundboxMode = false

        }

        this.downPoint = null
    }

   private reset() {

        this.preview && this.preview.remove()
        this.contour && this.contour.remove()
        this.contourPoints && this.contourPoints.remove()
        // this.hotspots && this.hotspots.remove()

        this.preview = this.downPoint = this.contour = this.contourPoints = this.bbox = null
        this.points = []

        // this.hotspots = null

    }

    private createContour() {

        this.contour && this.contour.remove()
        this.contourPoints && this.contourPoints.remove()

        const color = this.labeller.class ? this.labeller.class.color: '#ffff00'

        if (this.bbox) {

            this.contour = new this.paper.Path.Rectangle(this.bbox)

            this.contour.style = {
                strokeColor: new this.paper.Color(color),
                fillColor: null,
                strokeWidth: this.generalPrefs.preview.width*this.ratio
            }
            
        }

        if (this.points.length) {

            this.contourPoints = new this.paper.Group()

            for (let kp of this.points) {
                this.contourPoints.addChild(new this.paper.Path.Circle(kp.point, this.generalPrefs.preview.width*this.ratio*3))
            }
            
            this.contourPoints.fillColor = new this.paper.Color(color)
        }

    }

}

export default Plugin.Tool({
    name: NAME,
    provides: KeypointTool,
    uses: [
        'store',
        'labeller',
        'workspace',
        'settings',
        'paper'
    ]
})