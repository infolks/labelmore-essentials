import { SimpleLabelType, Control} from "@infolks/labelmore-devkit";
import { LabelClass, DEFAULT_LABEL_TYPES, Label } from "@infolks/labelmore-devkit";
import { LabelManager } from "@infolks/labelmore-devkit";
import { WorkspaceManager } from "@infolks/labelmore-devkit";
import { SettingsManager } from "@infolks/labelmore-devkit";
import { PathItem, PaperScope } from "paper";

export class BoundboxLabel extends SimpleLabelType {

    public readonly title = 'Boundbox'
    public readonly name = DEFAULT_LABEL_TYPES.boundbox

    constructor(labeller: LabelManager, workspace: WorkspaceManager, settings: SettingsManager, paper: PaperScope) {
        super(labeller, workspace, settings, paper)
    }

    tagContent(label: Label, labelClass: LabelClass): string {
        return labelClass.name
    }

    vectorize (label: Label) {

        const min = new this.paper.Point(label.props.xmin, label.props.ymin)
        const max = new this.paper.Point(label.props.xmax, label.props.ymax)
    
        const path = new this.paper.Path.Rectangle(min, max)

        // console.log('bndbx.vectorize', path)
    
        return path;
    
    }

    controls(path: PathItem): Control[] {

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
        ]
    }

    apply(path: PathItem): any {

        const {topLeft, bottomRight} = path.bounds

        return {
            xmin: topLeft.x,
            ymin: topLeft.y,
            xmax: bottomRight.x,
            ymax: bottomRight.y
        }
    }
}

export default {
    install(vue: any, opts: any) {

        vue.mixin({
            beforeCreate() {
                
                if (this.$labeller && this.$workspace && this.$settings) {

                    const boundboxLabel = new BoundboxLabel(this.$labeller, this.$workspace, this.$settings, this.$paper);

                    if (!this.$labeller.has(boundboxLabel.name)) this.$labeller.register(boundboxLabel.name, boundboxLabel)

                }
            }
        })
    }
}