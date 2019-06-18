import { Panel, PanelOptions } from "@infolks/labelmore-devkit";
import KeypointSelectComponent from './KeypointSelectComponent.vue'

class KeypointsPanel extends Panel {

    public readonly name = "panels.default.keypoints"
    public readonly title = 'Keypoints'
    public readonly icon = `<i class="fas fa-dot-circle"></i>`
    public readonly component = 'app-panel-keypoints'

    public readonly options: PanelOptions = {
        showTitle: true
    }

}

export default {
    install(Vue: any, opts: any) {

        Vue.mixin({
    
            beforeCreate() {

                if (this.$workspace) {

                    const panel = new KeypointsPanel()

                    if (!this.$workspace.hasPanel(panel.name)) {
                        this.$workspace.registerPanel(panel.name, panel)
                        Vue.component(panel.component, KeypointSelectComponent)
                    }
                }
            }
        })
    
    }
}