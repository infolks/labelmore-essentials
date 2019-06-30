import { EncodeFormat } from "../../encoders/json.encoder";
import { ContourProps, PolylineProps, LabelClass, Label, LabelManager } from "@infolks/labelmore-devkit";

export class PolyJsonFormat implements EncodeFormat {

    constructor(private labeller: LabelManager) {}

    encode(label: Label<ContourProps | PolylineProps>, class_: LabelClass) {

        return {
            name: this.labeller.getName(label),
            description: {
                type: label.type
            },
            classTitle: class_.name,
            attributes: label.attributes || {},
            points: {
                exterior: label.props.points.map(p => [p.x, p.y]),
                interior: []
            }
        }

    }
}