import { Label, SimpleLabelType, Control, ContourProps, LabelManager, WorkspaceManager, SettingsManager, BasicLabelTypeOptions } from "@infolks/labelmore-devkit";
import { Path, PaperScope } from "paper";
export declare class ContourLabel extends SimpleLabelType<ContourProps> {
    readonly title = "Contour";
    readonly name: string;
    options: Partial<BasicLabelTypeOptions>;
    constructor(labeller: LabelManager, workspace: WorkspaceManager, settings: SettingsManager, paper: PaperScope);
    vectorize(label: Label<ContourProps>): Path;
    controls(path: Path): Control[];
    apply(path: Path): ContourProps;
}
declare const _default: {
    install(vue: any, opts: any): void;
};
export default _default;
