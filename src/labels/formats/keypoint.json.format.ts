import { EncodeFormat } from "../../encoders/json.encoder";
import { LabelManager, Label, LabelClass, ProjectManager, Keypoint } from "@infolks/labelmore-devkit";
import { KeypointProps } from "../keypoint.label";
import { getSkeleton } from "../../helpers";

export class KeypointJsonFormat implements EncodeFormat {

    constructor(private pm: ProjectManager, private labeller: LabelManager) {}

    encode(label: Label<KeypointProps>, class_: LabelClass) {

        const keypoints = this.pm.project.options.keypoints
            .filter((kp: Keypoint) => {
                        
                return kp.classes.some(cl => cl === class_.id)
            })

        const bndbox = label.props.boundbox

        return {
            name: this.labeller.getName(label),
            description: {
                type: label.type
            },
            classTitle: class_.name,
            attributes: label.attributes || {},
            skeleton: getSkeleton(keypoints),
            bndbox: [
                [bndbox.xmin, bndbox.ymin],
                [bndbox.xmax, bndbox.ymax]
            ],
            points: keypoints.map(kp => {

                const annotation = label.props.keypoints.find(ann => ann.name === kp.name)

                if (annotation) {

                    return [
                        annotation.name,
                        annotation.point.x,
                        annotation.point.y,
                        annotation.visibility
                    ]
                }

                return [
                    kp.name,
                    0,
                    0,
                    0
                ]
            })

        }
    }
}