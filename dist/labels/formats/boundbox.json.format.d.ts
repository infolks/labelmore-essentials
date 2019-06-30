import { EncodeFormat } from "../../encoders/json.encoder";
import { LabelManager, BoundboxProps, Label, LabelClass } from "@infolks/labelmore-devkit";
export declare class BoundboxJsonFormat implements EncodeFormat {
    private labeller;
    constructor(labeller: LabelManager);
    encode(label: Label<BoundboxProps>, class_: LabelClass): {
        name: string;
        description: {
            type: string;
        };
        classTitle: string;
        attributes: import("@infolks/labelmore-devkit").AttributeValues;
        points: {
            exterior: number[][];
            interior: any[];
        };
    };
}
