import { DEFAULT_LABEL_TYPES } from "@infolks/labelmore-devkit";
import { ToolEvent, Path, Point, Item, PointText, Group, Color, PaperScope } from "paper";
import { LabelManager } from "@infolks/labelmore-devkit";
import { WorkspaceManager } from "@infolks/labelmore-devkit";
import {SettingsManager} from '@infolks/labelmore-devkit';
import { AnnotationToolOptions, AnnotationTool } from "@infolks/labelmore-devkit";
import {NAME as ESSENTAIL_SETTINGS, BoundboxToolSettings} from "../settings"

export class BoundboxTool extends AnnotationTool {

    public readonly name = 'tools.default.boundbox'
    public readonly title = 'Boundbox'
    public readonly icon = '<i class="fas fa-vector-square"></i>'
    public readonly cursor = 'crosshair'

    protected options: Partial<AnnotationToolOptions> = {
        showGuide: true,
        limitToArtboard: true
    }

    private preview: Path;
    private downPoint: Point;

    private hotspots: Item;

    constructor (
        protected labeller: LabelManager, 
        protected workspace: WorkspaceManager, 
        protected settings: SettingsManager,
        protected paper: PaperScope) {
        super(workspace, settings, paper)
    }

    get prefs(): BoundboxToolSettings {
        return this.settings.getSettings(ESSENTAIL_SETTINGS).tools.boundbox
    }

    onmousedrag(event: ToolEvent) {

        if (this.downPoint) {

            const min = this.downPoint
            const max = event.point

            const ratio = 1/this.workspace.zoom;

            // show preview {

            this.preview && this.preview.remove()

            this.preview = new this.paper.Path.Rectangle(min, max)
            
            //@ts-ignore
            this.preview.style = {
                strokeColor: new Color(this.prefs.preview.color),
                fillColor: null,
                strokeWidth: this.prefs.preview.width*ratio,
                dashArray: this.prefs.preview.dashed? [6*ratio, 3*ratio]: []
            }

            // }

            // show hotspots {

            if (this.prefs.preview.hotspots) {

                this.hotspots && this.hotspots.remove()

                // point for padding
                const padPoint = new Point(5,5)

                const txtStart = new this.paper.PointText(padPoint/* dummy point*/)
                txtStart.content = `(${event.downPoint.round().x}, ${event.downPoint.round().y})` // coordinates

                // apply style
                //@ts-ignore
                txtStart.style = {
                    fontSize: 9 * ratio,
                    fontWeight: 300,
                    fillColor: new Color(this.prefs.preview.color)
                }

                txtStart.bounds.bottomRight = event.downPoint.subtract(padPoint) // real point

                const txtEnd = new this.paper.PointText(padPoint/* dummy point*/)
                txtEnd.content = `(${event.point.round().x}, ${event.point.round().y})` // coordinates
                txtEnd.style = txtStart.style
                txtEnd.bounds.bottomRight = event.point.subtract(padPoint) // real point

                this.hotspots = new this.paper.Group([txtStart, txtEnd])

            }

            //}

        }
    }

    onmousedown(event: ToolEvent) {

        this.downPoint = event.point
    }

    onmouseup(event: ToolEvent) {

        if (this.preview && this.preview.area > this.prefs.minArea && this.labeller.class) {

            this.labeller.add({
                type: DEFAULT_LABEL_TYPES.boundbox,
                props: {
                    xmin: this.preview.bounds.left,
                    ymin: this.preview.bounds.top,
                    xmax: this.preview.bounds.right,
                    ymax: this.preview.bounds.bottom
                }
            })

        }

        this.preview && this.preview.remove();
        this.hotspots && this.hotspots.remove()

        this.preview = null
        this.downPoint = null

        this.hotspots = null

    }
}


export default {
    install(vue: any, opts: any) {

        vue.mixin({
            beforeCreate() {
                
                if (this.$labeller && this.$tools && this.$workspace && this.$settings) {

                    const bndbox = new BoundboxTool(this.$labeller, this.$workspace, this.$settings, this.$paper)
                    
                    if (!this.$tools.hasTool(bndbox.name)) {

                        this.$tools.register(bndbox.name, bndbox)

                    }
                }
            }
        })
    }
}