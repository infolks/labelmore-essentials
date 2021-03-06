import { Panel, PanelOptions } from "@infolks/labelmore-devkit";
import LabelClassComponent from './LabelClassComponent.vue'

class LabelClassPanel extends Panel {

    public readonly name = "panels.default.labelclass"
    public readonly title = 'Label Classes'
    public readonly icon = `<i class="fas fa-shapes"></i>`
    public readonly component = 'app-panel-labelclass'

    public readonly options: PanelOptions = {
        showTitle: true
    }

}

export default {
    install(Vue: any, opts: any) {

        Vue.mixin({
    
            beforeCreate() {

                if (this.$workspace) {

                    const panel = new LabelClassPanel()

                    if (!this.$workspace.hasPanel(panel.name)) {
                        this.$workspace.registerPanel(panel.name, panel)
                        Vue.component(panel.component, LabelClassComponent)
                    }
                }
            }
        })
    
    }
}