import { LabelClass, Label, SimpleLabelType, Control, BoundboxProps, LabelManager, WorkspaceManager, SettingsManager } from "@infolks/labelmore-devkit";
import { PathItem, PaperScope } from "paper";
export declare class BoundboxLabel extends SimpleLabelType<BoundboxProps> {
    readonly title = "Boundbox";
    readonly name: string;
    constructor(labeller: LabelManager, workspace: WorkspaceManager, settings: SettingsManager, paper: PaperScope);
    tagContent(label: Label<BoundboxProps>, labelClass: LabelClass): string;
    vectorize(label: Label<BoundboxProps>): paper.Path.Rectangle;
    controls(path: PathItem): Control[];
    apply(path: PathItem): BoundboxProps;
}
declare const _default: {
    install(vue: any, opts: any): void;
};
export default _default;
