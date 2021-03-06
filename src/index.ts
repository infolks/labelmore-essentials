// tools
// import SelectTool from "./tools/select.tool"
// import BoundboxTool from "./tools/boundbox.tool"
// import ContourTool from "./tools/contour.tool"
// import LineTool from "./tools/line.tool"
// import KeypointTool from "./tools/keypoint.tool";
// import PanTool from "./tools/pan.tool"

// labels
import BoundboxLabel from "./labels/boundbox.label"
import ContourLabel from "./labels/contour.label"
import PolylineLabel from "./labels/polyline.label"
import KeypointLabel from "./labels/keypoint.label"

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

        // encoders
        vue.use(JsonEncoder)

        // wizards
        vue.use(LocalizationWizard)

        // sources
        vue.use(DiskSource)

        // labels
        vue.use(BoundboxLabel)
        vue.use(ContourLabel)
        vue.use(PolylineLabel)
        vue.use(KeypointLabel)

        // tools
        vue.use(SelectTool)
        vue.use(BoundboxTool)
        vue.use(ContourTool)
        vue.use(LineTool)
        vue.use(KeypointTool)
        vue.use(PanTool)

        // panels
        vue.use(LabelClassesPanel)
        vue.use(KeypointsPanel)
        vue.use(ClassAttributesPanel)
        vue.use(SceneAttributesPanel)

        // settings
        vue.use(EssentialSettings)

    }
}