import { AnnotationTool, LabelManager, WorkspaceManager, SettingsManager, AnnotationToolOptions, DEFAULT_LABEL_TYPES } from "@infolks/labelmore-devkit";
import { PaperScope, Point, Path, ToolEvent, KeyEvent, Group, Color } from "paper";
import {NAME as ESSENTAIL_SETTINGS, GeneralToolSettings} from "../settings";


class LineTool extends AnnotationTool {

    public readonly name = 'tools.default.line'
    public readonly title = 'Polyline'
    public readonly icon = `<i>&#9585;</i>`
    public readonly cursor = 'crosshair'

    private points: Point[] = []
    private preview: Path
    private contour: Path
    private contourJoints: Group

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

    private get ratio() {
        return 1/this.workspace.zoom
    }

    private get generalPrefs(): GeneralToolSettings {
        return this.settings.getSettings(ESSENTAIL_SETTINGS).tools.general
    }

    private get lastPoint() {
        return this.points[this.points.length - 1]
    }

    onmousedown(event: ToolEvent) {

        this.points.push(event.point)

        this.createContour()
    }

    onmousemove(event: ToolEvent) {

        if (this.points.length) {

            this.createContour()

            this.createPreview(event.point)
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
                if (this.preview.segments.length > 1) {

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

        this.preview = this.contour = this.contourJoints = null

        this.points = []

    }

    private makeLabel() {

        if (this.labeller.class) {

            this.labeller.add({
                type: DEFAULT_LABEL_TYPES.line,
                props: {
                    points: this.points.map(p => ({x: p.x, y: p.y}))
                }
            })

            this.reset()
        }
    }

    private createContour() {

        this.contour && this.contour.remove()

        this.contourJoints && this.contourJoints.remove()

        if (this.points.length) {

            this.contour = new this.paper.Path(this.points)

            this.contourJoints = new this.paper.Group()

            // joints
            for (let point of this.points) {
                this.contourJoints.addChild(new this.paper.Path.Circle(point, this.generalPrefs.preview.width*5))
            }

            const color = this.labeller.class? this.labeller.class.color: '#ffff00'

            // @ts-ignore
            this.contour.style = {
                strokeColor: new Color(color),
                fillColor: null,
                strokeWidth: this.generalPrefs.preview.width*this.ratio 
            }
            
            this.contourJoints.fillColor = new Color(color)
        }

    }

    private createPreview(cursorPoint: Point) {

        if (this.lastPoint && cursorPoint) {

            this.preview && this.preview.remove()

            this.preview = new this.paper.Path([this.lastPoint, cursorPoint])

            this.preview.style = {
                strokeWidth: this.generalPrefs.preview.width*this.ratio,
                fillColor: null,
                strokeColor: this.generalPrefs.preview.color,
                dashArray: this.generalPrefs.preview.dashed? [6*this.ratio, 3*this.ratio] : []
            }
        }
    }
}

export default {
    install(vue: any, opts: any) {

        vue.mixin({
            beforeCreate() {
                
                if (this.$labeller && this.$tools && this.$workspace && this.$settings) {

                    const line = new LineTool(this.$labeller, this.$workspace, this.$settings, this.$paper)
                    
                    if (!this.$tools.hasTool(line.name)) {

                        this.$tools.register(line.name, line)

                    }
                }
            }
        })
    }
}