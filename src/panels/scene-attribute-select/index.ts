import SceneAttributeSelectComponent from './SceneAttributeSelectComponent.vue'
import { Panel, PanelOptions } from "@infolks/labelmore-devkit";

class SceneAttributesPanel extends Panel {

    public readonly name = "panels.default.attributes.scene"
    public readonly title = 'Scene Attributes'
    public readonly icon = `<i class="fas fa-cloud-sun-rain"></i>`
    public readonly component = 'app-panel-scene-attributes'

    public readonly options: PanelOptions = {
        showTitle: true
    }
}

export default {
    install(Vue: any, opts: any) {

        Vue.mixin({
    
            beforeCreate() {

                if (this.$workspace) {

                    const panel = new SceneAttributesPanel()

                    if (!this.$workspace.hasPanel(panel.name)) {
                        this.$workspace.registerPanel(panel.name, panel)
                        Vue.component(panel.component, SceneAttributeSelectComponent)
                    }
                }
            }
        })
    
    }
}