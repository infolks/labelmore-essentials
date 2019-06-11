import { Source } from "@infolks/labelmore-devkit";
import { FileManager } from "@infolks/labelmore-devkit";
import { OpenDialogOptions } from "electron";

class DiskSource extends Source {

    public readonly name = 'sources.default.disk'

    public readonly title = 'Disk'
    public readonly icon = `<i class="far fa-hdd"></i>`

    constructor(private fileManager: FileManager) {
        super()
    }

    async trigger(): Promise<string> {

        const options: OpenDialogOptions = {
            properties: ["openDirectory", "createDirectory"]
        }
        
        const dir = await this.fileManager.browse(options)

        if (dir.filePaths) return dir.filePaths[0]
        else return null
    }    
    
    async list(dir: string): Promise<string[]> {
        
        const files = await this.fileManager.list(dir, {
            file: true,
            extensions: ['jpeg', 'jpg', 'png']
        })

        return files
    }

    async read(dir: string, filename: string): Promise<Buffer> {
        
        const data = await this.fileManager.read(dir, filename)

        return data
    }

    async write(dir: string, filename: string, data: Buffer): Promise<void> {
        
        return await this.fileManager.write(dir, filename, data)
    }

    async join(dir: string, subdir: string): Promise<string> {

        return (dir + '/' + subdir).replace(/(\/)+/, '/')
    }

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