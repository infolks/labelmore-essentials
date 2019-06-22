declare const _default: {
    name: string;
    data(): {
        scene: {};
    };
    watch: {
        scene: {
            handler(attrs: any): void;
            deep: boolean;
        };
        sceneVals(): void;
    };
    computed: {
        attributes(): any;
        sceneVals(): any;
    };
    created(): void;
};
export default _default;