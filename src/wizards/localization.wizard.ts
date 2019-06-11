import { Wizard, Project, ProjectOptions, WizardType, WizardOptions } from "@infolks/labelmore-devkit";
import { FileManager } from "@infolks/labelmore-devkit";

class LocalizationWizard extends Wizard {

    public readonly name = "wizards.default.localization"
    public readonly title = "Localization Project";
    public readonly icon = '<i class="fas fa-object-group"></i>';
    public readonly description = `Locate and Seperate different objects in an image`;
    public readonly type: WizardType = 'creator';

    protected options: Partial<WizardOptions> = {
        allowOutputSelection: true,
        allowToolSelection: true,
        allowLabelClassCreation: true,
        allowKeypointCreation: true,
    };

    public readonly allowExtensions = true

    constructor(private fileManager: FileManager) {
        super()
    }

    async input(title: string, dir: string, files: string[], options: ProjectOptions): Promise<Project> {

        return {
            type: this.name,
            title,
            files,
            options: options,
            frames: null
        }
    }

    async load(data: Buffer, options: any): Promise<Buffer> {
        
        return data;
    }

}

export default {
    install(Vue: any, opts: any) {

        Vue.mixin({
    
            beforeCreate() {

                if (this.$files && this.$projects) {

                    const locWiz = new LocalizationWizard(this.$files);
    
                    if (!this.$projects.hasWizard(locWiz.name)) {
                        this.$projects.registerWizard(locWiz.name, locWiz)
                    }

                } 
            }
        })
    
    }
}