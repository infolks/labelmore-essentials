<template>
    <div class="uk-padding-small">
        <div class="uk-width-1-1 class-attribute-item" v-for="attr in attributes" :key="attr.name">
            <!-- <div class="uk-text-small">{{attr.name | beautify}}</div> -->
            <!-- <app-multi-select
                v-model="attributeValues[attr.name]"
                :options="attr.values"
                :multiple="attr.multi"
                placeholder="Select"
                :limit="3"
                :limit-text="limitText"
                :close-on-select="!attr.multi">
            </app-multi-select> -->

            <app-field :field="attr" v-model="attributeValues[attr.name]" :required="true"></app-field>
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
            },
            attributeVals() {
                return this.$labeller.attributeValues
            }
        },
        watch: {
            attributeValues: {
                handler(attrs) {
                    this.$labeller.attributeValues = attrs
                },
                deep: true
            },
            attributeVals(val) {
                this.attributeValues = val
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
        }
    }
</script>

<style scoped>

    .class-attribute-item:nth-child(n+2) {
        margin-top: 0.5rem;
    }
</style>