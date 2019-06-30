import { 
    LabelClass, 
    DEFAULT_LABEL_TYPES, 
    Label, 
    SimpleLabelType, 
    Control,
    BoundboxProps,
    LabelManager,
    WorkspaceManager,
    SettingsManager,
    Plugin,
    ProjectManager
} from "@infolks/labelmore-devkit";

import { PathItem, PaperScope } from "paper";
import { JsonEncoder } from "../encoders/json.encoder";
import { BoundboxJsonFormat } from "./formats/boundbox.json.format";

export class BoundboxLabel extends SimpleLabelType<BoundboxProps> {

    public readonly title = 'Boundbox'

    constructor(projectManager: ProjectManager, labeller: LabelManager, workspace: WorkspaceManager, settings: SettingsManager, paper: PaperScope) {
        super(labeller, workspace, settings, paper)

        // register json format

        if (projectManager.hasEncoder('encoders.default.json')) {

            const jsonEnc = <JsonEncoder>projectManager.getEncoder('encoders.default.json')

            if (!jsonEnc.hasFormat(DEFAULT_LABEL_TYPES.boundbox)) {

                jsonEnc.registerFormat(DEFAULT_LABEL_TYPES.boundbox, new BoundboxJsonFormat(labeller))
            }
        }
    }

    tagContent(label: Label<BoundboxProps>, labelClass: LabelClass): string {
        return labelClass.name
    }

    vectorize (label: Label<BoundboxProps>) {

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

    apply(path: PathItem): BoundboxProps {

        const {topLeft, bottomRight} = path.bounds

        return {
            xmin: topLeft.x,
            ymin: topLeft.y,
            xmax: bottomRight.x,
            ymax: bottomRight.y
        }
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

export default Plugin.Label({
    name: DEFAULT_LABEL_TYPES.boundbox,
    provides: BoundboxLabel,
    uses: [
        'projects',
        'labeller',
        'workspace',
        'settings',
        'paper'
    ]
})