import { SimpleLabelType, BasicLabelTypeOptions, Control } from "@infolks/labelmore-devkit";
import { Label } from "@infolks/labelmore-devkit";
import { LabelManager } from "@infolks/labelmore-devkit";
import { WorkspaceManager } from "@infolks/labelmore-devkit";
import { SettingsManager } from "@infolks/labelmore-devkit";
import { Path, PaperScope } from "paper";
export declare class ContourLabel extends SimpleLabelType {
    readonly title = "Contour";
    readonly name: string;
    readonly options: Partial<BasicLabelTypeOptions>;
    constructor(labeller: LabelManager, workspace: WorkspaceManager, settings: SettingsManager, paper: PaperScope);
    vectorize(label: Label): Path;
    controls(path: Path): Control[];
    apply(path: Path): any;
}
declare const _default: {
    install(vue: any, opts: any): void;
};
export default _default;
