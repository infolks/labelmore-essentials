import { SimpleLabelType, BasicLabelTypeOptions, Control } from "@infolks/labelmore-devkit";
import { DEFAULT_LABEL_TYPES, Label } from "@infolks/labelmore-devkit";
import { LabelManager } from "@infolks/labelmore-devkit";
import { WorkspaceManager } from "@infolks/labelmore-devkit";
import { SettingsManager } from "@infolks/labelmore-devkit";
import { Path, Point, PaperScope } from "paper";

export class ContourLabel extends SimpleLabelType {

    public readonly title = 'Contour'
    public readonly name = DEFAULT_LABEL_TYPES.contour

    public readonly options: Partial<BasicLabelTypeOptions> = {
        showLabelTag: false
    }

    constructor(labeller: LabelManager, workspace: WorkspaceManager, settings: SettingsManager, paper: PaperScope) {
        super(labeller, workspace, settings, paper)
    }

    vectorize(label: Label) {

        const p = new this.paper.Path()

        for (let point of label.props.points) {

            p.add(new Point(point.x, point.y))
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


    apply(path: Path): any {
        
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

                    const contourLabel = new ContourLabel(this.$labeller, this.$workspace, this.$settings, this.$paper);

                    if (!this.$labeller.has(contourLabel.name)) this.$labeller.register(contourLabel.name, contourLabel)

                }
            }
        })
    }
}