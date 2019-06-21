declare const _default: {
    name: string;
    data(): {
        attributeValues: {};
    };
    computed: {
        attributes(): any;
    };
    watch: {
        attributeValues: {
            handler(attrs: any): void;
            deep: boolean;
        };
    };
    methods: {
        limitText(count: any): string;
    };
    created(): void;
    filters: {
        beutify(value: any): any;
    };
};
export default _default;
