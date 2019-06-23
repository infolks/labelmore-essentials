import { AnnotationToolOptions, AnnotationTool, LabelManager, WorkspaceManager, SettingsManager } from "@infolks/labelmore-devkit";
import { ToolEvent, PaperScope, KeyEvent } from "paper";
import { GeneralToolSettings, ContourToolSettings } from "../settings";
/**
 * Settings
 * --------
 * Snap Distance
 * Min Sides
 * Preview color
 */
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
    private contourJoints;
    private closePoint;
    private closePathActive;
    private points;
    protected options: Partial<AnnotationToolOptions>;
    constructor(labeller: LabelManager, workspace: WorkspaceManager, settings: SettingsManager, paper: PaperScope);
    private readonly firstPoint;
    private readonly lastPoint;
    readonly prefs: ContourToolSettings;
    readonly generalPrefs: GeneralToolSettings;
    onmousedown(event: ToolEvent): void;
    onmousemove(event: ToolEvent): void;
    onkeyup(event: KeyEvent): void;
    private reset;
    /**
     * Complete the label
     */
    private makeLabel;
    private createContour;
    /**
     * Create the circle used to close the path
     */
    private createClosePoint;
    private createPreview;
}
declare const _default: {
    install(vue: any, opts: any): void;
};
export default _default;
