import { AnnotationTool, AnnotationToolOptions } from "@infolks/labelmore-devkit";
import { Point, ToolEvent } from "paper";

export class PanTool extends AnnotationTool {

    public readonly name = 'tools.default.pan'
    public readonly title = 'Pan'
    public readonly icon = `<i class="fas fa-hand-paper"></i>`
    public readonly cursor = 'grab'

    private lastPoint: Point;

    protected options: Partial<AnnotationToolOptions> = {
        limitToArtboard: false,
        showGuide: false
    }

    // on mouse down to keep the last point
    onmousedown(event: ToolEvent) {
        this.lastPoint = this.workspace.view.projectToView(event.point);
    }

    // refresh
    onmouseup() {
        this.lastPoint = null
    }

    // refresh
    ondeactivate() {
        this.lastPoint = null
    }

    // pan the view
    onmousedrag(event: ToolEvent) {

        //convert the point to view coordinates to prevent the jaggering due to instability in coordinates when view is changed
        const point = this.workspace.view.projectToView(event.point);

        //convert the last point back to project coordinate to calculate delta value
        const last = this.workspace.view.viewToProject(this.lastPoint);

        // calculate delta
        const delta = last.subtract(event.point)

        //scroll the view by the delta value computed by subtracting the current mouse point from the downpoint
        this.workspace.offset = this.workspace.offset.add(delta)

        //set last point as the current point
        this.lastPoint = point;
    }
}

export default {
    install(vue: any, opts: any) {

        vue.mixin({
            beforeCreate() {
                
                if (this.$labeller && this.$tools && this.$workspace && this.$settings) {

                    const pan = new PanTool(this.$workspace, this.$settings, this.$paper)
                    
                    if (!this.$tools.hasTool(pan.name)) {

                        this.$tools.register(pan.name, pan)
                        
                        this.$tools.activate(pan.name)
                    }
                }
            }
        })
    }
}