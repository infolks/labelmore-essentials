import { Label, SimpleLabelType, Control, ContourProps, LabelManager, WorkspaceManager, SettingsManager, BasicLabelTypeOptions, Plugin, ProjectManager } from "@infolks/labelmore-devkit";
import { Path, PaperScope } from "paper";
export declare class ContourLabel extends SimpleLabelType<ContourProps> {
    readonly title = "Contour";
    options: Partial<BasicLabelTypeOptions>;
    constructor(projectManager: ProjectManager, labeller: LabelManager, workspace: WorkspaceManager, settings: SettingsManager, paper: PaperScope);
    vectorize(label: Label<ContourProps>): Path;
    controls(path: Path): Control[];
    apply(path: Path): ContourProps;
}
declare const _default: Plugin;
export default _default;
