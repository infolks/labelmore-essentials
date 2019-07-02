import { 
    DEFAULT_LABEL_TYPES, 
    Label, 
    SimpleLabelType, 
    Control,
    ContourProps,
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

export class ContourLabel extends SimpleLabelType<ContourProps> {

    public readonly title = 'Contour'

    public options: Partial<BasicLabelTypeOptions> = {
        showLabelTag: false,
        hasFill: true
    }

    constructor(projectManager: ProjectManager, labeller: LabelManager, workspace: WorkspaceManager, settings: SettingsManager, paper: PaperScope) {
        super(labeller, workspace, settings, paper)

        if (projectManager.hasEncoder('encoders.default.json')) {

            const jsonEnc = <JsonEncoder>projectManager.getEncoder('encoders.default.json')

            if (!jsonEnc.hasFormat(DEFAULT_LABEL_TYPES.contour)) {

                jsonEnc.registerFormat(DEFAULT_LABEL_TYPES.contour, new PolyJsonFormat(labeller))
            }
        }
    }

    vectorize(label: Label<ContourProps>) {

        const p = new this.paper.Path()

        for (let point of label.props.points) {

            p.add(new Point(point.x, point.y))

            p.selected = true
        }

        p.closePath()

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


    apply(path: Path): ContourProps {
        
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

//                     const contourLabel = new ContourLabel(this.$labeller, this.$workspace, this.$settings, this.$paper);

//                     if (!this.$labeller.has(contourLabel.name)) this.$labeller.register(contourLabel.name, contourLabel)

//                 }
//             }
//         })
//     }
// }

export default Plugin.Label({
    name: DEFAULT_LABEL_TYPES.contour,
    provides: ContourLabel,
    uses: [
        'projects',
        'labeller',
        'workspace',
        'settings',
        'paper'
    ]
})