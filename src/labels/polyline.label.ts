import { 
    DEFAULT_LABEL_TYPES, 
    Label, 
    SimpleLabelType, 
    Control,
    PolylineProps,
    LabelManager,
    WorkspaceManager,
    SettingsManager,
    BasicLabelTypeOptions,
    Plugin,
    ProjectManager
} from "@infolks/labelmore-devkit";
import { Path, Point, PaperScope } from "paper";
import { JsonEncoder } from "../encoders/json.encoder";
import { PolyJsonFormat } from "./formats/poly.json.format";

export class PolylineLabel extends SimpleLabelType<PolylineProps> {

    public readonly title = 'Polyline'

    public options: Partial<BasicLabelTypeOptions> = {
        showLabelTag: false,
        hasFill: false
    }

    constructor(projectManager: ProjectManager, labeller: LabelManager, workspace: WorkspaceManager, settings: SettingsManager, paper: PaperScope) {
        super(labeller, workspace, settings, paper)

        if (projectManager.hasEncoder('encoders.default.json')) {

            const jsonEnc = <JsonEncoder>projectManager.getEncoder('encoders.default.json')

            if (!jsonEnc.hasFormat(DEFAULT_LABEL_TYPES.line)) {

                jsonEnc.registerFormat(DEFAULT_LABEL_TYPES.line, new PolyJsonFormat(labeller))
            }
        }
    }

    vectorize(label: Label<PolylineProps>) {

        const p = new this.paper.Path()

        for (let point of label.props.points) {

            p.add(new Point(point.x, point.y))
        }

        return p
    }

    controls(path: Path): Control[] {
        return path.segments.map((s): Control => {
            return {
                hotspot: s.point,
                cursor: 'pointer'
            }
        })
    }


    apply(path: Path): PolylineProps {
        
        return {
            points: path.segments.map(s => {

                return {x: s.point.x, y: s.point.y}
            })
        }
    }

}


// export default {
//     install(vue: any, opts: any) {

//         vue.mixin({
//             beforeCreate() {
                
//                 if (this.$labeller && this.$workspace && this.$settings) {

//                     const polylineLabel = new PolylineLabel(this.$labeller, this.$workspace, this.$settings, this.$paper);

//                     if (!this.$labeller.has(polylineLabel.name)) this.$labeller.register(polylineLabel.name, polylineLabel)

//                 }
//             }
//         })
//     }
// }

export default Plugin.Label({
    name: DEFAULT_LABEL_TYPES.line,
    provides: PolylineLabel,
    uses: [
        'projects',
        'labeller',
        'workspace',
        'settings',
        'paper'
    ]
})