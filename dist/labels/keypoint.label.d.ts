import { SimpleLabelType, BoundboxProps, BasicLabelTypeOptions, SettingsManager, WorkspaceManager, LabelManager, ProjectManager, Plugin, Label, Control } from "@infolks/labelmore-devkit";
import { PaperScope } from "paper";
export interface KeypointProps {
    boundbox: BoundboxProps;
    keypoints: {
        point: {
            x: number;
            y: number;
        };
        name: string;
    }[];
}
export declare class KeypointLabel extends SimpleLabelType<KeypointProps> {
    private projectManager;
    readonly title = "Keypoint";
    static NAME: string;
    options: Partial<BasicLabelTypeOptions>;
    constructor(projectManager: ProjectManager, labeller: LabelManager, workspace: WorkspaceManager, settings: SettingsManager, paper: PaperScope);
    private readonly prefs;
    private readonly ratio;
    private readonly keypoints;
    vectorize(label: Label<KeypointProps>): paper.Group;
    controls(path: paper.Group): Control[];
    apply(path: paper.Item): KeypointProps;
    private keypointsControls;
    private bboxControls;
    private keypointPath;
    private createSkeleton;
}
declare const _default: Plugin;
export default _default;
