import { Interface } from "@infolks/labelmore-devkit";
export interface BoundboxToolSettings {
    minArea: number;
    preview: {
        color: string;
        width: number;
        dashed: boolean;
        hotspots: boolean;
    };
}
export interface EssentialSettings {
    tools: {
        boundbox: BoundboxToolSettings;
    };
}
export declare const NAME = "settings.default.essentials";
export declare const DEFAULT_SETTINGS: EssentialSettings;
export declare class EssentialInterface extends Interface {
    readonly name = "settings.default.essentials";
    readonly title = "Essentials";
    readonly icon = "<i class=\"fas fa-boxes\"></i>";
    readonly component = "app-settings-essentials";
}
declare const _default: {
    install(vue: any, optns: any): void;
};
export default _default;
