import { AnnotationToolOptions, AnnotationTool } from "@infolks/labelmore-devkit";
import { LabelManager } from "@infolks/labelmore-devkit";
import { WorkspaceManager } from "@infolks/labelmore-devkit";
import { SettingsManager } from "@infolks/labelmore-devkit";
import { ToolEvent, PaperScope } from "paper";
export declare class ContourTool extends AnnotationTool {
    protected labeller: LabelManager;
    protected workspace: WorkspaceManager;
    protected settings: SettingsManager;
    protected paper: PaperScope;
    readonly name = "tools.default.contour";
    readonly title = "Contour";
    readonly icon = "<i class=\"fas fa-draw-polygon\"></i>";
    readonly cursor = "crosshair";
    private preview;
    private contour;
    private closePoint;
    private closePathActive;
    private points;
    protected options: Partial<AnnotationToolOptions>;
    constructor(labeller: LabelManager, workspace: WorkspaceManager, settings: SettingsManager, paper: PaperScope);
    private readonly firstPoint;
    private readonly lastPoint;
    onmousedown(event: ToolEvent): void;
    onmousemove(event: ToolEvent): void;
    private makeLabel;
    private createContour;
    private createClosePoint;
    private createPreview;
}
declare const _default: {
    install(vue: any, opts: any): void;
};
export default _default;
