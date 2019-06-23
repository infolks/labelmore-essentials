import { Label, SimpleLabelType, Control, PolylineProps, LabelManager, WorkspaceManager, SettingsManager, BasicLabelTypeOptions } from "@infolks/labelmore-devkit";
import { Path, PaperScope } from "paper";
export declare class PolylineLabel extends SimpleLabelType<PolylineProps> {
    readonly title = "Polyline";
    readonly name: string;
    options: Partial<BasicLabelTypeOptions>;
    constructor(labeller: LabelManager, workspace: WorkspaceManager, settings: SettingsManager, paper: PaperScope);
    vectorize(label: Label<PolylineProps>): Path;
    controls(path: Path): Control[];
    apply(path: Path): PolylineProps;
}
declare const _default: {
    install(vue: any, opts: any): void;
};
export default _default;
