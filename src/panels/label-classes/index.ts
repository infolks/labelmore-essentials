import { Panel, PanelOptions } from "@infolks/labelmore-devkit";
import LabelClassComponent from './LabelClassComponent.vue'
import { ProjectManager } from "@infolks/labelmore-devkit";

class LabelClassPanel extends Panel {

    public readonly name = "panels.default.labelclass"
    public readonly title = 'Label Classes'
    public readonly icon = `<i class="fas fa-shapes"></i>`
    public readonly component = 'app-panel-labelclass'

    public readonly options: PanelOptions = {
        showTitle: true
    }

    constructor(private projectManager: ProjectManager) {
        super()
    }

}

export default {
    install(Vue: any, opts: any) {

        Vue.mixin({
    
            beforeCreate() {

                if (this.$workspace && this.$projects) {

                    const panel = new LabelClassPanel(this.$projects)

                    if (!this.$workspace.hasPanel(panel.name)) {
                        this.$workspace.registerPanel(panel.name, panel)
                        Vue.component(panel.component, LabelClassComponent)
                    }
                }
            }
        })
    
    }
}