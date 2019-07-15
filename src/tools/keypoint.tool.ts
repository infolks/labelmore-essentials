import { AnnotationTool, AnnotationToolOptions, LabelManager, WorkspaceManager, SettingsManager, Plugin } from "@infolks/labelmore-devkit";
import { Point, Path, PaperScope, ToolEvent, Group, Rectangle, KeyEvent } from "paper";
import {NAME as ESSENTIAL_SETTINGS, GeneralToolSettings } from "../settings";
import { KeypointLabel } from "../labels/keypoint.label";

const NAME = 'tools.default.keypoint'

class KeypointTool extends AnnotationTool {

    public readonly name = NAME
    public readonly title = 'Keypoint'
    public readonly icon = `<i class="far fa-dot-circle"></i>`
    public readonly cursor = 'crosshair'

    private points: {name: string, point: Point}[] = []
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
        protected labeller: LabelManager, 
        protected workspace: WorkspaceManager, 
        protected settings: SettingsManager,
        protected paper: PaperScope
    ) {
        super(workspace, settings, paper)
    }

    private get ratio() {
        return 1/this.workspace.zoom
    }

    get generalPrefs(): GeneralToolSettings {
        return this.settings.getSettings(ESSENTIAL_SETTINGS).tools.general
    }

    activate() {
        // this.boundboxMode = true
    }

    onmouseup(event: ToolEvent) {

        if (this.boundboxMode) {

            this.onmouseup_bbox(event)

        }

        else {

            this.onmouseup_kp(event)
        }
    }

    onmousedown(event: ToolEvent) {

        if (this.boundboxMode) {
            this.onmousedown_bbox(event)
        }
    }

    onmousedrag(event: ToolEvent) {

        if (this.boundboxMode) {
            this.onmousedrag_bbox(event)
        }
    }

    onkeyup(event: KeyEvent) {

        const key = event.key

        if (key === 'backspace') {

            if (this.points && this.points.length) {

                this.points.pop()

                this.createContour()
            }
        }

        else if (key === 'enter') {

            this.makeLabel()

            this.boundboxMode = true

            this.reset()
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
                            name: kp.name
                        }
                    })
                }
            })
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
                point: event.point
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

        if (this.preview && this.labeller.class) {

            this.bbox = this.preview.bounds
            
            this.preview.remove()
            this.preview = null

            this.createContour()

            this.boundboxMode = false

        }
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

        if (this.bbox) {

            this.contour = new this.paper.Path.Rectangle(this.bbox)
            
        }

        if (this.points.length) {

            this.contourPoints = new this.paper.Group()

            for (let kp of this.points) {
                this.contourPoints.addChild(new this.paper.Path.Circle(kp.point, this.generalPrefs.preview.width*this.ratio*5))
            }
            
            this.contour.addChild(this.contourPoints)
        }

        const color = this.labeller.class ? this.labeller.class.color: '#ffff00'

        this.contour.style = {
            strokeColor: new this.paper.Color(color),
            fillColor: null,
            strokeWidth: this.generalPrefs.preview.width*this.ratio
        }

        this.contourPoints.fillColor = new this.paper.Color(color)

    }

}

export default Plugin.Tool({
    name: NAME,
    provides: KeypointTool,
    uses: [
        'labeller',
        'workspace',
        'settings',
        'paper'
    ]
})