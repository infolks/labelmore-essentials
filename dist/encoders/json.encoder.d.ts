import { Encoder, Project, FileWriteInfo, Frame, Label, LabelClass, Plugin } from "@infolks/labelmore-devkit";
export interface EncodeFormat {
    encode(label: Label<any>, class_: LabelClass): any;
}
export declare class JsonEncoder extends Encoder {
    static NAME: string;
    readonly title = "JSON";
    readonly icon: string;
    private formats;
    constructor();
    encode(frame: Frame, project: Project): FileWriteInfo[];
    finalize(project: Project): FileWriteInfo[];
    /**
     * Register a format into the json encoder
     * @param type label type
     * @param format object with an encode function
     */
    registerFormat(type: string, format: EncodeFormat): void;
    /**
     * Check if a format exist or not
     * @param type type of label
     */
    hasFormat(type: string): boolean;
    private convertLabel;
}
declare const _default: Plugin;
export default _default;
