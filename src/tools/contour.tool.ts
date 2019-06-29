import { AnnotationToolOptions, AnnotationTool, LabelManager, WorkspaceManager, SettingsManager, DEFAULT_LABEL_TYPES, ContourProps, Label } from "@infolks/labelmore-devkit";
import { ToolEvent, Path, Point, Color, PaperScope, KeyEvent, Group } from "paper";
import {NAME as ESSENTAIL_SETTINGS, GeneralToolSettings, ContourToolSettings} from "../settings";
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
    private hotspot: Path

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

    get prefs(): ContourToolSettings {
        return this.settings.getSettings(ESSENTAIL_SETTINGS).tools.contour
    }

    get generalPrefs(): GeneralToolSettings {
        return this.settings.getSettings(ESSENTAIL_SETTINGS).tools.general
    }

    get ratio(): number {
        return 1/this.workspace.zoom
    }

    onmousedown(event: ToolEvent) {

        if (event.modifiers.shift) {

            this.onmousedown_shift(event)
        }

        else if (event.modifiers.alt) {

            this.onmousedown_alt(event)
        }

        else {

            // perform normal mouse down action if not on top of control
            if (!(
                event.item &&
                event.item.data &&
                event.item.data.index === this.workspace.RESERVED_ITEMS.CONTROL)
            ) {

                this.onmousedown_normal(event)

            }
        }
    }

    onmousemove(event: ToolEvent) {

        if (event.modifiers.shift) {

            this.onmousemove_shift(event)

        }

        else if (event.modifiers.alt) {
            this.onmousemove_alt(event)
        }

        else {

            this.onmousemove_normal(event)
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
                    this.contourJoints.remove()
                }

            }
            
        }

        // snap on tab
        else if (key === 'tab') {

            console.log('snap on')

            const label = this.labeller.selected

            if (label && label.type === DEFAULT_LABEL_TYPES.contour) {

                // get path
                const path = <Path>this.workspace.getPath(label)

                let changed = false

                path.segments.forEach((segment) => {

                    const nearest = this.getNearest(segment.point, label.id)

                    if (segment.point.getDistance(nearest) < this.prefs.snap.distance*this.ratio) {

                        segment.point.set(nearest.x, nearest.y)

                        changed = true
                    }
                })

                console.log(changed)

                if (changed) this.labeller.apply(label.id, path)
            }
        }

        else if (key === 'enter') {

            this.makeLabel()
            
        }

        // modify labels

    }

    
    /// PRIVATE


    private reset() {

        this.preview && this.preview.remove()
        this.contour && this.contour.remove()
        this.contourJoints && this.contourJoints.remove()
        this.closePoint && this.closePoint.remove()
        this.hotspot && this.hotspot.remove()

        this.preview = this.contour = this.closePoint = this.hotspot = null

        this.closePathActive = false

        this.points = []

        this.workspace.cursor = this.cursor

    }

    // ===================
    //  MOUSE DOWN EVENTS
    // ===================
    private onmousedown_normal(event: ToolEvent) {

        if (this.closePathActive) {

            this.makeLabel()
        }

        else {

            this.points.push(event.point)

        }

        this.createContour()
    }

    private onmousedown_shift(event: ToolEvent) {

        const label = this.labeller.selected

        if (label && label.type === DEFAULT_LABEL_TYPES.contour) {

            const path = <Path>this.workspace.getPath(this.labeller.selected)

            const loc = path.getNearestLocation(event.point)

            if (path.divideAt(loc)) {
                this.labeller.apply(label.id, path)
            }

            this.hotspot && this.hotspot.remove()
            this.hotspot = null
        }

        else {

            this.onmousedown_normal(event)
        }
    }

    private onmousedown_alt(event: ToolEvent) {

        const label = this.labeller.selected

        if (label && label.type === DEFAULT_LABEL_TYPES.contour) {

            // get path
            const path = <Path>this.workspace.getPath(label)

            // get nearest segment
            const seg = path.getNearestLocation(event.point).segment

            // if path has more than 3 segments remove
            if (path.segments.length > 3) {

                seg.remove()

                // apply path
                this.labeller.apply(label.id, path)

                // remove hotspot
                this.hotspot && this.hotspot.remove()
            }

        }
        
        else {

            if (this.prefs.snap.enabled) {
                const nearest = this.getNearest(event.point)

                if (event.point.getDistance(nearest) < this.prefs.snap.distance*this.ratio) {
                    event.point = nearest
                }

            }

            this.onmousedown_normal(event)
        }
    }
    
    // ===================
    //  MOUSE MOVE EVENTS
    // ===================
    private onmousemove_normal(event: ToolEvent) {

        if (this.points.length) {

            this.createContour()

            this.createPreview(event.point)

            if (event.point.getDistance(this.firstPoint) < this.prefs.closeDistance*this.ratio) {

                this.createClosePoint()

                this.closePathActive = true
            }

            else {

                this.closePoint && this.closePoint.remove()

                this.closePoint = null

                this.closePathActive = false

            }

        }

        // remove hotspot
        this.hotspot && this.hotspot.remove()

    }

    /**
     * move with shift modifier
     * @param event Tool Event
     */
    private onmousemove_shift(event: ToolEvent) {

        const label = this.labeller.selected

        if (label && label.type === DEFAULT_LABEL_TYPES.contour) {

            // remove old hotspot
            this.hotspot && this.hotspot.remove()

            // get selected label's path
            const path = <Path>this.workspace.getPath(label)

            // get nearest point
            const point = path.getNearestPoint(event.point)

            // get stroke width of label
            const strokeWidth = this.settings.general.workspace.labels.stroke.width

            // create hotspot
            this.hotspot = new this.paper.Path.Circle(point, strokeWidth*this.ratio*5)
            this.hotspot.fillColor = path.strokeColor

        }

        else {
            this.onmousemove_normal(event)
        }

    }

    private onmousemove_alt(event: ToolEvent) {

        const label = this.labeller.selected

        if (label && label.type === DEFAULT_LABEL_TYPES.contour) {

            // remove hotspot
            this.hotspot && this.hotspot.remove()

            // get path
            const path = this.workspace.getPath(label)

            // get nearest segment
            const seg = path.getNearestLocation(event.point).segment

            // get radius of control
            const radius = this.settings.general.workspace.control.radius

            // create hotspot
            this.hotspot = new this.paper.Path.Circle(seg.point, radius*this.ratio)
            this.hotspot.fillColor = path.strokeColor
        }

        else {
            
            if (this.prefs.snap.enabled) {
                const nearest = this.getNearest(event.point)

                if (event.point.getDistance(nearest) < this.prefs.snap.distance*this.ratio) {
                    event.point = nearest
                }
            }

            this.onmousemove_normal(event)
        }
    }

    // =================
    //  PREVIEW METHODS
    // =================

    /**
     * get nearest point
     */
    private getNearest(evPoint: Point, avoid?: number): Point {

        const contourLabels: Label<ContourProps>[] = this.labeller.all.filter(l => (l.type === DEFAULT_LABEL_TYPES.contour) && (l.id !== avoid))

        const allPoints = contourLabels.reduce((points, item) => {
            
            return [...points, ...item.props.points.map(p => new Point(p.x, p.y))]

        }, <Point[]>[])

        const nearest = allPoints.slice(1).reduce((minPt, point) => {

            const minDist = evPoint.getDistance(minPt)
            const dist = evPoint.getDistance(point)

            return (dist < minDist)? point:minPt

        }, allPoints[0])

        console.log(nearest)

        return nearest
    }

    /**
     * Complete the label
     */
    private makeLabel() {

        const class_ = this.labeller.class

        if (this.points && this.points.length >= this.prefs.minSides) {

            if (class_) {

                // console.log('making label')
    
                this.labeller.add({
                    type: DEFAULT_LABEL_TYPES.contour,
                    props: {
                        points: this.points.map(p => ({x: p.x, y: p.y}))
                    }
                })
    
            }
    
            // reset
            this.reset()

        }

    }


    /**
     * Create the contour
     */
    private createContour() {


        this.contour && this.contour.remove()

        this.contourJoints && this.contourJoints.remove()

        if (this.points.length) {

            this.contour = new this.paper.Path(this.points)

            this.contourJoints = new this.paper.Group()

            // joints
            for (let point of this.points) {
                this.contourJoints.addChild(new this.paper.Path.Circle(point, this.generalPrefs.preview.width*this.ratio*5))
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

    /**
     * Create the circle used to close the path
     */
    private createClosePoint() {

        this.closePoint && this.closePoint.remove()

        if (this.points.length) {

            this.closePoint = new this.paper.Path.Circle(this.firstPoint, this.prefs.closeDistance*this.ratio)

            const color = this.labeller.class? this.labeller.class.color: '#ffff00'

            // @ts-ignore
            this.closePoint.style = {
                strokeColor: new Color(color),
                fillColor: null,
                strokeWidth: this.generalPrefs.preview.width*this.ratio
            }
        }
    }

    /**
     * Create preiew dotted
     * @param cursorPoint current cursor position
     */
    private createPreview(cursorPoint: Point) {

        if (this.firstPoint && cursorPoint) {

            this.preview && this.preview.remove()

            this.preview = new this.paper.Path()

            this.preview.add(this.firstPoint)

            this.preview.add(cursorPoint)

            if (this.lastPoint && !this.firstPoint.equals(this.lastPoint)) {
                this.preview.add(this.lastPoint)
            }


            // @ts-ignore
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

                    const contour = new ContourTool(this.$labeller, this.$workspace, this.$settings, this.$paper)
                    
                    if (!this.$tools.hasTool(contour.name)) {

                        this.$tools.register(contour.name, contour)

                    }
                }
            }
        })
    }
}