import { EncodeFormat } from "../../encoders/json.encoder";
import { ContourProps, PolylineProps, LabelClass, Label, LabelManager } from "@infolks/labelmore-devkit";
export declare class PolyJsonFormat implements EncodeFormat {
    private labeller;
    constructor(labeller: LabelManager);
    encode(label: Label<ContourProps | PolylineProps>, class_: LabelClass): {
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
