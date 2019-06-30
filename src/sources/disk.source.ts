import { Source } from "@infolks/labelmore-devkit";
import { FileManager } from "@infolks/labelmore-devkit";

class DiskSource extends Source {

    public readonly name = 'sources.default.disk'

    public readonly title = 'Disk'
    public readonly icon = `<i class="far fa-hdd"></i>`

    constructor(private fileManager: FileManager) {
        super()
    }

    async trigger(): Promise<string> {

        const options = {
            properties: ["openDirectory", "createDirectory"]
        }
        
        const dir = await this.fileManager.showOpenDialog(options)

        if (dir && dir.length) {

            return dir[0]
        }

        return null
    }    
    
    async list(dir: string): Promise<string[]> {
        
        const files = await this.fileManager.list(dir, {
            file: true,
            extensions: ['jpeg', 'jpg', 'png']
        })

        return files
    }

    async read(...paths: string[]): Promise<Buffer> {
        
        const data = await this.fileManager.read(...paths)

        return data
    }

    async write(data: Buffer, ...paths: string[]): Promise<void> {
        
        return await this.fileManager.write(data, ...paths)
    }

    // join(dir: string, subdir: string): string {

    //     return (dir + '/' + subdir).replace(/(\/)+/, '/')
    // }

}

export default {
    install(Vue: any, opts: any) {

        Vue.mixin({
            beforeCreate() {

                if (this.$projects && this.$files) {

                    const diskSource = new DiskSource(this.$files)

                    if (!this.$projects.hasSource(diskSource.name)) {

                        this.$projects.registerSource(diskSource.name, diskSource)
                    }
                }
            }
        })
    }
}