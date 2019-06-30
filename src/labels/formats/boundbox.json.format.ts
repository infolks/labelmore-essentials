import { EncodeFormat } from "../../encoders/json.encoder";
import { LabelManager, BoundboxProps, Label, LabelClass } from "@infolks/labelmore-devkit";

export class BoundboxJsonFormat implements EncodeFormat {

    constructor(private labeller: LabelManager) {}

    encode(label: Label<BoundboxProps>, class_: LabelClass) {

        return {
            name: this.labeller.getName(label),
            description: {
                type: label.type
            },
            classTitle: class_.name,
            attributes: label.attributes || {},
            points: {
                exterior: [[label.props.xmin, label.props.ymin], [label.props.xmax, label.props.ymax]],
                interior: []
            }

        }
    }
}