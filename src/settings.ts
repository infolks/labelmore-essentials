import { Interface } from "@infolks/labelmore-devkit";
import SettingsComponent from "./Settings.vue"

export interface GeneralToolSettings {
    preview: {
        color: string,
        width: number,
        dashed: boolean,
        hotspots: boolean,
    }
}

export interface BoundboxToolSettings {
    minArea: number
}

export interface ContourToolSettings {
    closeDistance: number
    snap: {
        enabled: boolean
        distance: number
    }
    minSides: number
}

export interface ContourLabelSettings {
    showPoints: boolean
}

export interface KeypointLabelSettings {
    keypoint: {
        radius: number,
        // thickness: number
    },
    skeleton: boolean
}

// export interface SelectToolSettings {
// }

export interface EssentialSettings {
    tools: {
        general: GeneralToolSettings
        boundbox: BoundboxToolSettings
        contour: ContourToolSettings
        // select: SelectToolSettings
    },
    labels: {
        contour: ContourLabelSettings,
        keypoints: KeypointLabelSettings
    }
}

export const NAME = 'settings.default.essentials'
export const DEFAULT_SETTINGS: EssentialSettings = {
    tools: {
        general: {
            preview: {
                color: "#00ffff",
                width: 1,
                dashed: true,
                hotspots: true
            }
        },
        boundbox: {
            minArea: 1
        },
        contour: {
            closeDistance: 10,
            snap: {
                enabled: true,
                distance: 10
            },
            minSides: 3
        }
        // select: {
        //     highlight: false
        // }
    },
    labels: {
        contour: {
            showPoints: true
        },
        keypoints: {
            keypoint: {
                radius: 3,
                // thickness: 1
            },
            skeleton: true
        }
    }
}


export class EssentialInterface extends Interface {

    public readonly name = NAME
    public readonly title = 'Essentials';
    public readonly icon = `<i class="fas fa-boxes"></i>`;

    public readonly component = 'app-settings-essentials';

}

export default {
    install(vue: any, optns: any) {

        vue.mixin({
            beforeCreate() {

                if (this.$settings) {

                    // register settings
                    if(!this.$settings.hasSettings(NAME)) this.$settings.registerSettings(NAME, DEFAULT_SETTINGS)

                    // register interface
                    if (!this.$settings.hasInterface(NAME)) {

                        const essInterface = new EssentialInterface()
                        this.$settings.registerInterface(NAME, essInterface)

                        vue.component(essInterface.component, SettingsComponent)
                        
                    }
                }
            }

        })
    }
}