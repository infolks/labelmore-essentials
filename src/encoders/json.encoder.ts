import { Encoder, Project, FileWriteInfo } from "@infolks/labelmore-devkit";
import { Frame } from "@infolks/labelmore-devkit";
import { Label, DEFAULT_LABEL_TYPES, LabelClass } from "@infolks/labelmore-devkit";
import { ProjectManager } from "@infolks/labelmore-devkit";
import { LabelManager } from "@infolks/labelmore-devkit";
import { removeExtension } from "../helpers";

const IMAGE_DATA = "PHN2ZyB2ZXJzaW9uPSIxLjEiCgkgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6YT0iaHR0cDovL25zLmFkb2JlLmNvbS9BZG9iZVNWR1ZpZXdlckV4dGVuc2lvbnMvMy4wLyIKCSB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjU2cHgiIGhlaWdodD0iNTZweCIgdmlld0JveD0iMCAwIDU2IDU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NiA1NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNFOUU5RTA7fQoJLnN0MXtmaWxsOiNEOUQ3Q0E7fQoJLnN0MntmaWxsOiM5Nzc3QTg7fQoJLnN0M3tmaWxsOiNGRkZGRkY7fQoJLnN0NHtmaWxsOm5vbmU7fQo8L3N0eWxlPgo8ZGVmcz4KPC9kZWZzPgo8Zz4KCTxnPgoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zNywwSDhDNy4yLDAsNi41LDAuNyw2LjUsMS45VjU1YzAsMC4zLDAuNywxLDEuNSwxSDQ4YzAuOCwwLDEuNS0wLjcsMS41LTFWMTNjMC0wLjctMC4xLTAuOS0wLjMtMS4xCgkJCUwzNy42LDAuM0MzNy40LDAuMSwzNy4yLDAsMzcsMHoiLz4KCQk8cG9seWdvbiBjbGFzcz0ic3QxIiBwb2ludHM9IjM3LjUsMC4yIDM3LjUsMTIgNDkuMywxMiAJCSIvPgoJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik00OCw1Nkg4Yy0wLjgsMC0xLjUtMC43LTEuNS0xLjVWMzloNDN2MTUuNUM0OS41LDU1LjMsNDguOCw1Niw0OCw1NnoiLz4KCQk8Zz4KCQkJPHBhdGggY2xhc3M9InN0MyIgZD0iTTE3LDQyLjd2Ny44YzAsMC41LTAuMSwwLjktMC4zLDEuMnMtMC40LDAuNi0wLjcsMC44cy0wLjYsMC4zLTEsMC40cy0wLjgsMC4xLTEuMiwwLjFjLTAuMiwwLTAuNCwwLTAuNy0wLjEKCQkJCXMtMC41LTAuMS0wLjgtMC4ycy0wLjYtMC4yLTAuOC0wLjNzLTAuNS0wLjItMC43LTAuNGwwLjctMS4xYzAuMSwwLjEsMC4yLDAuMSwwLjQsMC4yczAuNCwwLjEsMC42LDAuMnMwLjQsMC4xLDAuNiwwLjIKCQkJCXMwLjQsMC4xLDAuNiwwLjFjMC41LDAsMC45LTAuMSwxLjItMC4zczAuNC0wLjUsMC41LTF2LTcuN0wxNyw0Mi43TDE3LDQyLjd6Ii8+CgkJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0yNS4yLDUwLjJjMCwwLjQtMC4xLDAuNy0wLjIsMS4xcy0wLjQsMC42LTAuNiwwLjlzLTAuNiwwLjUtMSwwLjZzLTAuOSwwLjItMS40LDAuMmMtMC4yLDAtMC40LDAtMC43LDAKCQkJCXMtMC41LTAuMS0wLjctMC4xYy0wLjItMC4xLTAuNS0wLjEtMC43LTAuMnMtMC40LTAuMi0wLjYtMC4zbDAuMy0xLjJjMC4xLDAuMSwwLjMsMC4xLDAuNSwwLjJzMC40LDAuMSwwLjYsMC4yczAuNCwwLjEsMC42LDAuMQoJCQkJczAuNCwwLjEsMC42LDAuMWMwLjYsMCwxLTAuMSwxLjMtMC40czAuNC0wLjYsMC40LTEuMmMwLTAuMy0wLjEtMC42LTAuMy0wLjhzLTAuNS0wLjQtMC44LTAuNnMtMC43LTAuNC0xLTAuNXMtMC43LTAuNC0xLTAuNgoJCQkJcy0wLjYtMC41LTAuOC0wLjlzLTAuMy0wLjctMC4zLTEuMmMwLTAuNCwwLjEtMC44LDAuMi0xLjJzMC40LTAuNiwwLjctMC45czAuNi0wLjQsMS0wLjZzMC44LTAuMiwxLjItMC4yYzAuNCwwLDAuOCwwLDEuMywwLjEKCQkJCXMwLjgsMC4yLDEsMC40Yy0wLjEsMC4xLTAuMSwwLjItMC4yLDAuNHMtMC4xLDAuMy0wLjIsMC40cy0wLjEsMC4yLTAuMiwwLjNzLTAuMSwwLjEtMC4xLDAuMWMtMC4xLDAtMC4xLTAuMS0wLjItMC4xCgkJCQlzLTAuMi0wLjEtMC4zLTAuMXMtMC4zLTAuMS0wLjUtMC4xcy0wLjUsMC0wLjgsMGMtMC4yLDAtMC40LDAuMS0wLjUsMC4ycy0wLjMsMC4yLTAuNCwwLjNzLTAuMiwwLjMtMC4zLDAuNFMyMSw0NS40LDIxLDQ1LjUKCQkJCWMwLDAuNCwwLjEsMC43LDAuMywwLjlzMC41LDAuNCwwLjgsMC42czAuNiwwLjMsMSwwLjVzMC43LDAuNCwxLDAuNnMwLjYsMC41LDAuOCwwLjlTMjUuMiw0OS43LDI1LjIsNTAuMnoiLz4KCQkJPHBhdGggY2xhc3M9InN0MyIgZD0iTTM1LjEsNDcuOWMwLDAuOC0wLjEsMS42LTAuMywyLjJzLTAuNSwxLjItMC45LDEuNnMtMC44LDAuOC0xLjMsMXMtMS4xLDAuMy0xLjcsMC4zcy0xLjItMC4xLTEuNy0wLjMKCQkJCXMtMC45LTAuNS0xLjMtMXMtMC43LTEtMC45LTEuNnMtMC4zLTEuNC0wLjMtMi4yczAuMS0xLjYsMC4zLTIuMnMwLjUtMS4yLDAuOS0xLjZzMC44LTAuOCwxLjMtMXMxLjEtMC4zLDEuNy0wLjMKCQkJCXMxLjIsMC4xLDEuNywwLjNzMC45LDAuNSwxLjMsMXMwLjcsMSwwLjksMS42UzM1LjEsNDcuMSwzNS4xLDQ3Ljl6IE0zMC44LDUxLjdjMC4zLDAsMC43LTAuMSwxLTAuMnMwLjYtMC4zLDAuOC0wLjYKCQkJCXMwLjQtMC43LDAuNi0xLjJzMC4yLTEuMSwwLjItMS44YzAtMC43LTAuMS0xLjMtMC4yLTEuN3MtMC4zLTAuOS0wLjUtMS4ycy0wLjUtMC41LTAuOC0wLjdzLTAuNi0wLjItMC45LTAuMgoJCQkJYy0wLjMsMC0wLjcsMC4xLTEsMC4ycy0wLjYsMC4zLTAuOCwwLjZzLTAuNCwwLjctMC42LDEuMmMtMC4xLDAuNS0wLjIsMS4xLTAuMiwxLjhjMCwwLjcsMC4xLDEuMywwLjIsMS44czAuMywwLjksMC41LDEuMgoJCQkJczAuNSwwLjUsMC44LDAuN1MzMC41LDUxLjcsMzAuOCw1MS43eiIvPgoJCQk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNNDQuNyw0Mi45VjUzSDQzbC00LTYuOVY1M2gtMS43VjQyLjloMS43bDQsNi45di02LjlINDQuN3oiLz4KCQk8L2c+CgkJPGc+CgkJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xOS41LDE5di00YzAtMC42LDAuNC0xLDEtMWMwLjYsMCwxLTAuNCwxLTFzLTAuNC0xLTEtMWMtMS43LDAtMywxLjMtMywzdjRjMCwxLjEtMC45LDItMiwyCgkJCQljLTAuNiwwLTEsMC40LTEsMXMwLjQsMSwxLDFjMS4xLDAsMiwwLjksMiwydjRjMCwxLjcsMS4zLDMsMywzYzAuNiwwLDEtMC40LDEtMXMtMC40LTEtMS0xYy0wLjYsMC0xLTAuNC0xLTF2LTQKCQkJCWMwLTEuMi0wLjUtMi4zLTEuNC0zQzE5LDIxLjMsMTkuNSwyMC4yLDE5LjUsMTl6Ii8+CgkJCTxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjI3LjUiIGN5PSIxOC41IiByPSIxLjUiLz4KCQkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTM5LjUsMjFjLTEuMSwwLTItMC45LTItMnYtNGMwLTEuNy0xLjMtMy0zLTNjLTAuNiwwLTEsMC40LTEsMXMwLjQsMSwxLDFjMC42LDAsMSwwLjQsMSwxdjQKCQkJCWMwLDEuMiwwLjUsMi4zLDEuNCwzYy0wLjgsMC43LTEuNCwxLjgtMS40LDN2NGMwLDAuNi0wLjQsMS0xLDFjLTAuNiwwLTEsMC40LTEsMXMwLjQsMSwxLDFjMS43LDAsMy0xLjMsMy0zdi00YzAtMS4xLDAuOS0yLDItMgoJCQkJYzAuNiwwLDEtMC40LDEtMVM0MC4xLDIxLDM5LjUsMjF6Ii8+CgkJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0yNy41LDI0Yy0wLjYsMC0xLDAuNC0xLDF2M2MwLDAuNiwwLjQsMSwxLDFzMS0wLjQsMS0xdi0zQzI4LjUsMjQuNCwyOC4xLDI0LDI3LjUsMjR6Ii8+CgkJPC9nPgoJPC9nPgoJPHJlY3QgY2xhc3M9InN0NCIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2Ii8+CjwvZz4KPC9zdmc+"


class JsonEncoder extends Encoder {
    
    public readonly title = "JSON"
    public readonly icon = `<img src="data:image/svg+xml;base64,${IMAGE_DATA}"/>`
    public readonly name = 'encoders.default.json'

    constructor(private projectManager: ProjectManager, private labeller: LabelManager) {
        super()
    }

    encode(frame: Frame, project: Project): FileWriteInfo[] {

        const labelData = frame.labels
            // convert
            .map(label => {

                const class_ = project.options.labelClasses.find(cl => cl.id === label.class_id)

                return this.convertLabel(label, class_)

            })
            // filter out incompatable labels
            .filter(obj => obj!==null)

        const source = this.projectManager.getSource(project.options.outputSource)

        const json = {
            path: source.join(project.options.inputPath, frame.name),
            description: project.title,
            output: {
                objects: labelData
            },
            time_labeled: new Date().getTime(),
            labeled: labelData.length > 0
        }

        const data = new Buffer(JSON.stringify(json, undefined, 4))

        return [{
            name: removeExtension(frame.name)+'.json',
            subdirectory: Encoder.SUBFOLDERS.ANNOTATIONS,
            data: data
        }]
    }

    finalize(project: Project): FileWriteInfo[] {
        
        const options = project.options
        const title = project.title
        const type = project.type

        const json = {options, title, type}
        const data = new Buffer(JSON.stringify(json, undefined, 4))

        return [{
            name: 'meta.json',
            data
        }]
    }

    private convertLabel(label: Label<any>, class_: LabelClass) {

        if (label.type === DEFAULT_LABEL_TYPES.boundbox) {

            return {
                name: this.labeller.getName(label),
                description: {
                    type: label.type
                },
                tags: label.props.tags || [],
                classTitle: class_.name,
                attributes: label.props.attributes || {},
                points: {
                    exterior: [[label.props.xmin, label.props.ymin], [label.props.xmax, label.props.ymax]],
                    interior: []
                }

            }
        }

        return null;

    }
}

export default {
    install(Vue: any, opts: any) {

        Vue.mixin({
            beforeCreate() {

                if (this.$projects) {

                    const json = new JsonEncoder(this.$projects, this.$labeller)

                    if (!this.$projects.hasEncoder(json.name)) {

                        this.$projects.registerEncoder(json.name, json)
                    }
                }
            }
        })
    }
}