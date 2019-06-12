import { AnnotationToolOptions, AnnotationTool } from "@infolks/labelmore-devkit";
import { LabelManager } from "@infolks/labelmore-devkit";
import { WorkspaceManager } from "@infolks/labelmore-devkit";
import { SettingsManager } from "@infolks/labelmore-devkit";
import { ToolEvent, Path, Point, Color, PaperScope, KeyEvent, Key, Group } from "paper";
import { DEFAULT_LABEL_TYPES } from "@infolks/labelmore-devkit";

/**
 * Settings
 * --------
 * Snap Distance
 * Min Sides
 * Preview color
 */
export class ContourTool extends AnnotationTool {
    public readonly name = 'tools.default.contour'
    public readonly title = 'Contour'
    public readonly icon = `<i class="fas fa-draw-polygon"></i>`
    public readonly cursor = 'crosshair'

    private preview: Path
    private contour: Path
    private contourJoints: Group
    private closePoint: Path

    private closePathActive: boolean = false

    private points: Point[] = []

    protected options: Partial<AnnotationToolOptions>= {
        showGuide: true,
        limitToArtboard: true
    }

    constructor (
        protected labeller: LabelManager, 
        protected workspace: WorkspaceManager, 
        protected settings: SettingsManager,
        protected paper: PaperScope
        ) {
        super(workspace, settings, paper)
    }

    private get firstPoint() {
        return this.points[0]
    }

    private get lastPoint() {
        return this.points[this.points.length - 1]
    }

    onmousedown(event: ToolEvent) {

        if (this.closePathActive) {

            if (this.points.length > 2) this.makeLabel()
        }

        else {

            this.points.push(event.point)

        }

        this.createContour()
    }

    onmousemove(event: ToolEvent) {

        if (this.points.length) {

            const ratio = 1/this.workspace.zoom

            this.createContour()

            this.createPreview(event.point)

            // TODO: change to settings
            if (event.point.getDistance(this.firstPoint) < 10) {

                this.createClosePoint()

                this.closePathActive = true
            }

            else {

                this.closePoint && this.closePoint.remove()

                this.closePoint = null

                this.closePathActive = false
            }

        }
    }

    onkeyup(event: KeyEvent) {

        const key = event.key

        if (key === 'backspace') {

            // if there are points
            if (this.points && this.points.length) {

                // pop last point
                this.points.pop()
                
                // update preview
                if (this.preview.segments.length === 3) {

                    this.createPreview(this.preview.segments[1].point)

                    this.createContour()
                } 

                else {
                    this.preview.remove()
                }

            }
            
        }

        else if (key === 'enter') {

            this.makeLabel()
            
        }
    }

    private reset() {

        this.preview && this.preview.remove()
        this.contour && this.contour.remove()
        this.contourJoints && this.contourJoints.remove()
        this.closePoint && this.closePoint.remove()

        this.preview = this.contour = this.closePoint = null

        this.closePathActive = false

        this.points = []

        this.workspace.cursor = this.cursor

    }

    /**
     * Complete the label
     */
    private makeLabel() {

        const class_ = this.labeller.class

        if (this.points && this.points.length > 2) {

            if (class_) {

                // console.log('making label')
    
                this.labeller.add({
                    id: new Date().getTime(),
                    type: DEFAULT_LABEL_TYPES.contour,
                    class_id: class_.id,
                    props: {
                        points: this.points.map(p => ({x: p.x, y: p.y}))
                    }
                })
    
            }
    
            // reset
            this.reset()

        }

    }


    /// PRIVATE
    private createContour() {


        this.contour && this.contour.remove()

        this.contourJoints && this.contourJoints.remove()

        if (this.points.length) {

            const ratio = 1/this.workspace.zoom

            this.contour = new this.paper.Path(this.points)

            this.contourJoints = new this.paper.Group()

            // joints
            for (let point of this.points) {
                this.contourJoints.addChild(new this.paper.Path.Circle(point, 5))
            }

            const color = this.labeller.class? this.labeller.class.color: '#ffff00'

            // @ts-ignore
            this.contour.style = {
                strokeColor: new Color(color),
                fillColor: null,
                strokeWidth: 1*ratio //TODO: preview stroke width
            }
            
            this.contourJoints.fillColor = new Color(color)
        }
    }

    /**
     * Create the circle used to close the path
     */
    private createClosePoint() {

        this.closePoint && this.closePoint.remove()

        if (this.points.length) {

            const ratio = 1/this.workspace.zoom

            this.closePoint = new this.paper.Path.Circle(this.firstPoint, 10) // TODO: replace with settings

            const color = this.labeller.class? this.labeller.class.color: '#ffff00'

            // @ts-ignore
            this.closePoint.style = {
                strokeColor: new Color(color),
                fillColor: null,
                strokeWidth: 1*ratio //TODO: preview stroke width
            }
        }
    }

    private createPreview(cursorPoint: Point) {

        if (this.firstPoint && cursorPoint) {

            this.preview && this.preview.remove()

            this.preview = new this.paper.Path()

            this.preview.add(this.firstPoint)

            this.preview.add(cursorPoint)

            if (this.lastPoint && !this.firstPoint.equals(this.lastPoint)) {
                this.preview.add(this.lastPoint)
            }

            const ratio = 1/this.workspace.zoom

            // TODO: Use settings here
            // @ts-ignore
            this.preview.style = {
                strokeWidth: 1*ratio,
                fillColor: null,
                strokeColor: new Color('#00ffff'),
                dashArray: [6*ratio, 3*ratio]
            }
        }
    }
}

export default {
    install(vue: any, opts: any) {

        vue.mixin({
            beforeCreate() {
                
                if (this.$labeller && this.$tools && this.$workspace && this.$settings) {

                    const contour = new ContourTool(this.$labeller, this.$workspace, this.$settings, this.$paper)
                    
                    if (!this.$tools.hasTool(contour.name)) {

                        this.$tools.register(contour.name, contour)

                    }
                }
            }
        })
    }
}