// tools
import SelectTool from "./tools/select.tool"
import BoundboxTool from "./tools/boundbox.tool"
import ContourTool from "./tools/contour.tool"
import LineTool from "./tools/line.tool"
import PanTool from "./tools/pan.tool"

// labels
import BoundboxLabel from "./labels/boundbox.label"
import ContourLabel from "./labels/contour.label"
import PolylineLabel from "./labels/polyline.label"

// wizards
import LocalizationWizard from "./wizards/localization.wizard"

// source
import DiskSource from "./sources/disk.source"

// panels
import LabelClassesPanel from "./panels/label-classes"
import KeypointsPanel from "./panels/keypoint-select"
import ClassAttributesPanel from "./panels/class-attribute-select"
import SceneAttributesPanel from "./panels/scene-attribute-select"

// encoders
import JsonEncoder from "./encoders/json.encoder"

// settings
import EssentialSettings from "./settings"

export default {
    install(vue: any, opts: any) {

        // settings
        vue.use(SelectTool)
        vue.use(BoundboxTool)
        vue.use(ContourTool)
        vue.use(LineTool)
        vue.use(PanTool)

        // labels
        vue.use(BoundboxLabel)
        vue.use(ContourLabel)
        vue.use(PolylineLabel)

        // wizards
        vue.use(LocalizationWizard)

        // sources
        vue.use(DiskSource)

        // panels
        vue.use(LabelClassesPanel)
        vue.use(KeypointsPanel)
        vue.use(ClassAttributesPanel)
        vue.use(SceneAttributesPanel)

        // encoders
        vue.use(JsonEncoder)

        // settings
        vue.use(EssentialSettings)
    }
}