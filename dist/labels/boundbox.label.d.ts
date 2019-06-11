import { SimpleLabelType, Control } from "@infolks/labelmore-devkit";
import { LabelClass, Label } from "@infolks/labelmore-devkit";
import { LabelManager } from "@infolks/labelmore-devkit";
import { WorkspaceManager } from "@infolks/labelmore-devkit";
import { SettingsManager } from "@infolks/labelmore-devkit";
import { PathItem, Path, PaperScope } from "paper";
export declare class BoundboxLabel extends SimpleLabelType {
    readonly title = "Boundbox";
    readonly name: string;
    constructor(labeller: LabelManager, workspace: WorkspaceManager, settings: SettingsManager, paper: PaperScope);
    tagContent(label: Label, labelClass: LabelClass): string;
    vectorize(label: Label): Path.Rectangle;
    controls(path: PathItem): Control[];
    apply(path: PathItem): any;
}
declare const _default: {
    install(vue: any, opts: any): void;
};
export default _default;
