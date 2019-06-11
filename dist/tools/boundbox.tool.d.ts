import { ToolEvent, PaperScope } from "paper";
import { LabelManager } from "@infolks/labelmore-devkit";
import { WorkspaceManager } from "@infolks/labelmore-devkit";
import { SettingsManager } from '@infolks/labelmore-devkit';
import { AnnotationToolOptions, AnnotationTool } from "@infolks/labelmore-devkit";
import { BoundboxToolSettings } from "../settings";
export declare class BoundboxTool extends AnnotationTool {
    protected labeller: LabelManager;
    protected workspace: WorkspaceManager;
    protected settings: SettingsManager;
    protected paper: PaperScope;
    readonly name = "tools.default.boundbox";
    readonly title = "Boundbox";
    readonly icon = "<i class=\"fas fa-vector-square\"></i>";
    readonly cursor = "crosshair";
    protected options: Partial<AnnotationToolOptions>;
    private preview;
    private downPoint;
    private hotspots;
    constructor(labeller: LabelManager, workspace: WorkspaceManager, settings: SettingsManager, paper: PaperScope);
    readonly prefs: BoundboxToolSettings;
    onmousedrag(event: ToolEvent): void;
    onmousedown(event: ToolEvent): void;
    onmouseup(event: ToolEvent): void;
}
declare const _default: {
    install(vue: any, opts: any): void;
};
export default _default;
