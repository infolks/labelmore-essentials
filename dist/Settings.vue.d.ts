declare const _default: {
    name: string;
    props: string[];
    data(): {
        settings: import("./settings").EssentialSettings;
    };
    watch: {
        value(): void;
        settings: {
            handler(): void;
            deep: boolean;
        };
    };
    methods: {
        submit(): void;
        change(): void;
    };
    created(): void;
};
export default _default;
