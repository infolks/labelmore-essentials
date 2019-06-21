import ClassAttributeSelectComponent from './ClassAttributeSelectComponent.vue'
import { Panel, PanelOptions } from "@infolks/labelmore-devkit";

class ClassAttributesPanel extends Panel {

    public readonly name = "panels.default.attributes.class"
    public readonly title = 'Class Attributes'
    public readonly icon = `<i class="fas fa-tags"></i>`
    public readonly component = 'app-panel-class-attributes'

    public readonly options: PanelOptions = {
        showTitle: true
    }
}

export default {
    install(Vue: any, opts: any) {

        Vue.mixin({
    
            beforeCreate() {

                if (this.$workspace) {

                    const panel = new ClassAttributesPanel()

                    if (!this.$workspace.hasPanel(panel.name)) {
                        this.$workspace.registerPanel(panel.name, panel)
                        Vue.component(panel.component, ClassAttributeSelectComponent)
                    }
                }
            }
        })
    
    }
}