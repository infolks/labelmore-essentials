/// <reference types="node" />
import { Wizard, Project, ProjectOptions, WizardType, WizardOptions, Field } from "@infolks/labelmore-devkit";
import { FileManager } from "@infolks/labelmore-devkit";
export declare class LocalizationWizard extends Wizard {
    private fileManager;
    readonly name: string;
    readonly title: string;
    readonly icon: string;
    readonly description: string;
    readonly type: WizardType;
    options: Partial<WizardOptions>;
    constructor(fileManager: FileManager);
    input(title: string, dir: string, files: string[], options: ProjectOptions): Promise<Project>;
    load(data: Buffer, options: any): Promise<Buffer>;
    fields(): Field[];
}
declare const _default: {
    install(Vue: any, opts: any): void;
};
export default _default;
