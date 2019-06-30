import { LabelClass, Label, SimpleLabelType, Control, BoundboxProps, LabelManager, WorkspaceManager, SettingsManager, Plugin, ProjectManager } from "@infolks/labelmore-devkit";
import { PathItem, PaperScope } from "paper";
export declare class BoundboxLabel extends SimpleLabelType<BoundboxProps> {
    readonly title = "Boundbox";
    constructor(projectManager: ProjectManager, labeller: LabelManager, workspace: WorkspaceManager, settings: SettingsManager, paper: PaperScope);
    tagContent(label: Label<BoundboxProps>, labelClass: LabelClass): string;
    vectorize(label: Label<BoundboxProps>): paper.Path.Rectangle;
    controls(path: PathItem): Control[];
    apply(path: PathItem): BoundboxProps;
}
declare const _default: Plugin;
export default _default;
