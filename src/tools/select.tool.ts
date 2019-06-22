import { AnnotationTool } from "@infolks/labelmore-devkit";
import { LabelManager } from "@infolks/labelmore-devkit";
import { ToolEvent, KeyEvent, PaperScope, Path, PointText} from "paper";
import { WorkspaceManager } from "@infolks/labelmore-devkit";
import { SettingsManager } from "@infolks/labelmore-devkit";

// import {NAME as ESSENTIAL_SETTINGS} from "../settings"

class SelectTool extends AnnotationTool {

    public readonly name = 'tools.default.select'
    public readonly title = 'Select'
    public readonly icon = `<i class="fas fa-mouse-pointer"></i>`


    // private item: Item;

    // private moved: boolean = false;

    private preview: PointText;

    constructor (
        protected labeller: LabelManager, 
        protected workspace: WorkspaceManager,
        protected settings: SettingsManager,
        protected paper: PaperScope
    ) {
        super(workspace, settings, paper)
    }

    // get prefs():SelectToolSettings {

    //     return this.settings.getSettings(ESSENTIAL_SETTINGS).tools.select
    // }

    onmouseup (event: ToolEvent) {

        // if (this.item) {

        //     const id = this.item.data.index

        //     if (this.moved) this.labeller.apply(id, <PathItem>this.item)
        // }

        // this.moved = false
        // this.item = null

    }

    // deslect any selection on deactivation of tool
    ondeactivate () {
        this.preview && this.preview.remove()
        this.labeller.deselect()
    }

    onmousedown (event: ToolEvent) {

        const item = event.item

        const id = item? item.data['index'] : -1

        // -1048 refers to controls
        // id < -100 are reserved
        if (id > -100) {
            // this.item = item
            this.labeller.select(id)

        }
        
    }

    onmousemove(event: ToolEvent) {

        const item = event.item

        if (item) {

            this.preview && this.preview.remove()

            const size = item.bounds.size.round()

            this.preview = new this.paper.PointText(new this.paper.Point(0,0))

            const ratio = 1/this.workspace.zoom

            this.preview.content = `${size.width} x ${size.height}`
            this.preview.style = {
                fontSize: 9 * ratio,
                fontWeight: 400,
                fillColor: 'white'
            }
            this.preview.bounds.center = item.bounds.center
            this.preview.locked = true
        }

        else {
            this.preview && this.preview.remove()
        }
    }

    // onmousedrag (event: ToolEvent) {

    //     if (this.item && !this.item.parent && event.item && event.item.data.index > -100) this.item = event.item;

    //     const delta = event.delta

    //     if (this.item) {

    //         this.item.translate(this.limitMotion(this.item.bounds, delta))

    //         // emit that the 
    //         this.item.emit('moving', {
    //             point: this.item.position.clone()
    //         })

    //         this.moved = true

    //     }

    // }

    onkeyup (event: KeyEvent) {


        if (event.key == 'delete') {

            if (this.labeller.selected) {
                this.labeller.remove(this.labeller.selected.id)
            }

        }

        else if (event.key == 'up') {

            // move selected label up
            if (this.labeller.selected) this.labeller.raise()
        }

        else if (event.key == 'down') {

            // move selected label down
            if (this.labeller.selected) this.labeller.fall()
        }
    }

}

export default {
    install(vue: any, opts: any) {

        vue.mixin({
            beforeCreate() {
                
                if (this.$labeller && this.$tools && this.$workspace && this.$settings) {

                    const select = new SelectTool(this.$labeller, this.$workspace, this.$settings, this.$paper)
                    
                    if (!this.$tools.hasTool(select.name)) {

                        this.$tools.register(select.name, select)
                        
                        this.$tools.activate(select.name)
                    }
                }
            }
        })
    }
}