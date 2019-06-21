<template>
    <div class="uk-padding-small">
        <div class="uk-width-1-1 class-attribute-item" v-for="attr in attributes" :key="attr.name">
            <div class="uk-text-small">{{attr.name | capitalize}}</div>
            <app-multi-select
                v-model="attributeValues[attr.name]"
                :options="attr.values"
                :multiple="attr.multi"
                placeholder="Select"
                :limit="3"
                :limit-text="limitText"
                :close-on-select="!attr.multi">
            </app-multi-select>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'app-class-attribute-select',
        data() {
            return {
                attributeValues: {}
            }
        },
        computed: {
            attributes() {
                return this.$labeller.attributes
            }
        },
        watch: {
            attributeValues: {
                handler(attrs) {
                    for (let name in attrs) {
                        this.$labeller.setAttribute(name, attrs[name])
                    }
                },
                deep: true
            }
        },
        methods: {
            limitText (count) {
                return `and ${count} more..`
            },
        },
        created() {
            if (this.$labeller.attributeValues)
                this.attributeValues = this.$labeller.attributeValues
        },
        filters: {
            beutify(value) {
                if (!value) return ''
                
                value = value.toString()

                return value.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
            }
        }
    }
</script>

<style scoped>

    .class-attribute-item:nth-child(n+2) {
        margin-top: 0.5rem;
    }
</style>