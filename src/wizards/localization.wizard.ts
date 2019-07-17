import { Wizard, Project, ProjectOptions, WizardType, WizardOptions, Field, TextField } from "@infolks/labelmore-devkit";
import { FileManager } from "@infolks/labelmore-devkit";

export class LocalizationWizard extends Wizard {

    public readonly name: string = "wizards.default.localization"
    public readonly title: string = "Localization Project";
    public readonly icon: string = '<i class="fas fa-object-group"></i>';
    public readonly description: string = `Locate and Seperate different objects in an image`;
    public readonly type: WizardType = 'creator';

    public options: Partial<WizardOptions> = {
        allowToolSelection: true,
        allowOutputSelection: true,
        allowPanelSelection: true,
        allowLabelClassCreation: true,
        allowClassAttributeCreation: true,
        allowKeypointCreation: true,
        allowSceneAttributeCreation: false,
    };

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

    fields(): Field[] {
        return []
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