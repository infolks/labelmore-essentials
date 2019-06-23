import { 
    DEFAULT_LABEL_TYPES, 
    Label, 
    SimpleLabelType, 
    Control,
    PolylineProps,
    LabelManager,
    WorkspaceManager,
    SettingsManager,
    BasicLabelTypeOptions
} from "@infolks/labelmore-devkit";
import { Path, Point, PaperScope } from "paper";

export class PolylineLabel extends SimpleLabelType<PolylineProps> {

    public readonly title = 'Polyline'
    public readonly name = DEFAULT_LABEL_TYPES.line

    public readonly options: Partial<BasicLabelTypeOptions> = {
        showLabelTag: false,
        hasFill: false
    }

    constructor(labeller: LabelManager, workspace: WorkspaceManager, settings: SettingsManager, paper: PaperScope) {
        super(labeller, workspace, settings, paper)
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


export default {
    install(vue: any, opts: any) {

        vue.mixin({
            beforeCreate() {
                
                if (this.$labeller && this.$workspace && this.$settings) {

                    const polylineLabel = new PolylineLabel(this.$labeller, this.$workspace, this.$settings, this.$paper);

                    if (!this.$labeller.has(polylineLabel.name)) this.$labeller.register(polylineLabel.name, polylineLabel)

                }
            }
        })
    }
}