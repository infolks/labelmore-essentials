import { AnnotationTool, AnnotationToolOptions } from "@infolks/labelmore-devkit";
import { ToolEvent } from "paper";
export declare class PanTool extends AnnotationTool {
    readonly name = "tools.default.pan";
    readonly title = "Pan";
    readonly icon = "<i class=\"fas fa-hand-paper\"></i>";
    readonly cursor = "grab";
    private lastPoint;
    protected options: Partial<AnnotationToolOptions>;
    onmousedown(event: ToolEvent): void;
    onmouseup(): void;
    ondeactivate(): void;
    onmousedrag(event: ToolEvent): void;
}
declare const _default: {
    install(vue: any, opts: any): void;
};
export default _default;
