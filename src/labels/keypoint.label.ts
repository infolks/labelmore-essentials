import { SimpleLabelType, BoundboxProps, BasicLabelTypeOptions, SettingsManager, WorkspaceManager, LabelManager, ProjectManager, Plugin, Label, Keypoint, Control } from "@infolks/labelmore-devkit";
import { PaperScope, Point } from "paper";
import { NAME as ESSENTIAL_SETTINGS, KeypointLabelSettings } from "../settings";
import { getSkeleton } from "../helpers";

export interface KeypointProps {
    boundbox: BoundboxProps
    keypoints: {
        point: {x: number, y: number},
        name: string
    }[]
}

export class KeypointLabel extends SimpleLabelType<KeypointProps> {

    public readonly title = 'Keypoint'

    public static NAME = 'types.default.keypoint'

    public options: Partial<BasicLabelTypeOptions> = {
        showLabelTag: false,
        hasFill: false
    }

    constructor(
        private projectManager: ProjectManager, 
        labeller: LabelManager, 
        workspace: WorkspaceManager, 
        settings: SettingsManager, 
        paper: PaperScope
    ) {
        super(labeller, workspace, settings, paper)

        if (projectManager.hasEncoder('encoders.default.json')) {

            // register json format
        }
    }

    private get prefs(): KeypointLabelSettings {
        return this.settings.getSettings(ESSENTIAL_SETTINGS).labels.contour
    }

    private get ratio(): number {
        return 1/this.workspace.zoom
    }

    private get keypoints(): Keypoint[] {
        return this.projectManager.project.options.keypoints
    }

    vectorize(label: Label<KeypointProps>) {

        const {xmin, xmax, ymin, ymax} = label.props.boundbox

        const bbox = new this.paper.Path.Rectangle(
            new this.paper.Point(xmin, ymin),
            new this.paper.Point(xmax, ymax)
        )

        const points = new this.paper.Group()

        for (let kp of label.props.keypoints) {

            const kp_path = this.keypointPath(kp.point.x, kp.point.y)

            kp_path.data.name = kp.name

            points.addChild(kp_path)
        }

        if (this.prefs.skeleton) {
            return new this.paper.Group([bbox, this.createSkeleton(label), points])
        }

        else {
            return new this.paper.Group([bbox, new this.paper.Group(), points])
        }

    }

    controls(path: paper.Group): Control[] {

        return [
            ...this.bboxControls(<paper.Path>path.children[0]),
            ...this.keypointsControls(<paper.Group>path.children[2])
        ]
    }

    apply(path: paper.Item): KeypointProps {

        const [bbox, skeleton, points] = path.children

        const {topLeft, bottomRight} = bbox.bounds

        const boundbox = {
            xmin: topLeft.x,
            ymin: topLeft.y,
            xmax: bottomRight.x,
            ymax: bottomRight.y
        }

        const keypoints = []

        for (let kp of points.children) {

            keypoints.push({
                name: kp.data.name,
                point: {
                    x: kp.position.x,
                    y: kp.position.y
                }
            })
        }

        return {
            boundbox,
            keypoints
        }

    }
    /*
     |------------------------------------------------------------
     | PRIVATE FUNCTIONS
     |------------------------------------------------------------
    */

    private keypointsControls(path: paper.Group): Control[] {

        return path.children.map((p): Control => {

            return {
                hotspot: p.position,
                cursor: 'pointer'
            }
        })
    }

    private bboxControls(path: paper.Path): Control[] {

        return [
            {
                hotspot: path.bounds.topLeft,
                cursor: 'nw-resize'
            },
            {
                hotspot: path.bounds.topCenter,
                cursor: 'n-resize',
                restrict: 'y'
            },
            {
                hotspot: path.bounds.topRight,
                cursor: 'ne-resize'
            },
            {
                hotspot: path.bounds.rightCenter,
                cursor: 'w-resize',
                restrict: 'x'
            },
            {
                hotspot: path.bounds.bottomRight,
                cursor: 'nw-resize'
            },
            {
                hotspot: path.bounds.bottomCenter,
                cursor: 'n-resize',
                restrict: 'y'
            },
            {
                hotspot: path.bounds.bottomLeft,
                cursor: 'ne-resize'
            },
            {
                hotspot: path.bounds.leftCenter,
                cursor: 'w-resize',
                restrict: 'x'
            },
            {
                hotspot: path.bounds.center,
                cursor: 'move',
                bounds: path.bounds
            }
        ]
    }

    private keypointPath(x: number, y: number) {

        const radius    = this.prefs.keypoint.radius
        // const thickness = this.prefs.keypoint.thickness
        
        // const hor = {
        //     start   : new this.paper.Point(x-radius, y-thickness/2),
        //     end     : new this.paper.Point(x+radius, y+thickness/2)
        // }

        // const ver = {
        //     start   : new this.paper.Point(x-thickness/2, y-radius),
        //     end     : new this.paper.Point(x+thickness/2, y+radius)
        // }

        // const r1 = new this.paper.Path.Rectangle(hor.start, hor.end)
        // const r2 = new this.paper.Path.Rectangle(ver.start, ver.end)

        // const plus = r1.unite(r2)

        // r1.remove()
        // r2.remove()

        return new this.paper.Path.Circle(new this.paper.Point(x, y), radius)
    }

    private createSkeleton(label: Label<KeypointProps>) {

        const skeleton = getSkeleton(this.keypoints)

        // make dictionary to get index of keypoints from names
        const kpDict = {}

        for (let i=0; i<this.keypoints.length; i++) {
            
            kpDict[this.keypoints[i].name] = i

        }

        // make correspond list to check which all keypoints are in the label

        const kpCorr = []

        for (let keypoint of label.props.keypoints) {

            kpCorr[kpDict[keypoint.name]] = keypoint

        }

        // create lines for each bone in skeleton and make a group
        const skeletonPath = new this.paper.Group()

        for (let bone in skeleton) {

            const from = kpCorr[bone[0]]
            const to = kpCorr[bone[1]]

            if (from && to) skeletonPath.addChild(
                new this.paper.Path.Line(
                    new Point(from.point.x, from.point.y),
                    new Point(to.point.x, to.point.y)
                )
            )
        }

        return skeletonPath

    }

}

export default Plugin.Label({
    name: KeypointLabel.NAME,
    provides: KeypointLabel,
    uses: [
        'projects',
        'labeller',
        'workspace',
        'settings',
        'paper'
    ]
})