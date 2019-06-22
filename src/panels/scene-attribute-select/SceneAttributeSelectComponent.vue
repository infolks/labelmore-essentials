<template>
    <div class="uk-padding-small">
        <div class="uk-width-1-1 class-attribute-item" v-for="attr in attributes" :key="attr.name">
            <app-field :field="attr" v-model="scene[attr.name]" :required="true"></app-field>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default {
        name: 'app-scene-attribute-select',
        data() {
            return {
                scene: {}
            }
        },
        watch: {
            scene: {
                handler(attrs) {
                    
                    this.$projects.scene = attrs
                },
                deep: true
            },
            sceneVals() {
                this.scene = this.sceneVals || {}
            }
        },
        computed: {
            attributes() {
                return this.$projects.sceneAttributes
            },

            sceneVals() {
                return this.$projects.scene
            }
        },
        created() {
            if (this.$projects.scene)
                this.scene = this.$projects.scene
        }
    }
</script>

<style lang="scss" scoped>
    .class-attribute-item {
        margin-top: 1rem;
        &:first-child {
            margin-top: 0;
        }
    }
</style>