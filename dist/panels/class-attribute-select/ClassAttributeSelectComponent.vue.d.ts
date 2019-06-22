declare const _default: {
    name: string;
    data(): {
        attributeValues: {};
    };
    computed: {
        attributes(): any;
        attributeVals(): any;
    };
    watch: {
        attributeValues: {
            handler(attrs: any): void;
            deep: boolean;
        };
        attributeVals(): void;
    };
    methods: {
        limitText(count: any): string;
    };
    created(): void;
    filters: {
        beautify(value: any): any;
    };
};
export default _default;
