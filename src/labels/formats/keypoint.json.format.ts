import { EncodeFormat } from "../../encoders/json.encoder";
import { LabelManager, Label, LabelClass, ProjectManager } from "@infolks/labelmore-devkit";
import { KeypointProps } from "../keypoint.label";
import { getSkeleton } from "../../helpers";

export class KeypointJsonFormat implements EncodeFormat {

    constructor(private labeller: LabelManager, private projectManager: ProjectManager) {}

    encode(label: Label<KeypointProps>, class_: LabelClass) {

        const keypoints = this.projectManager.project.options.keypoints.filter(kp => kp.classes.indexOf(class_.name) !== -1)

        return {
            name: this.labeller.getName(label),
            description: {
                type: label.type
            },
            classTitle: class_.name,
            attributes: label.attributes || {},
            skeleton: getSkeleton(keypoints),
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