<template>
    <div class="uk-padding-small">
        <div class="uk-width-1-1 class-attribute-item" v-for="attr in attributes" :key="attr.name">
            <app-field :field="attr" v-model="scene[attr.name]" :required="true"></app-field>
        </div>
    </div>
</template>

<script lang="ts">

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
                    console.log('sc',this.scene)
                    this.$projects.scene = attrs
                },
                deep: true
            },
            sceneVals() {
                console.log('scene', this.sceneVals)
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
        mounted() {
            if (this.sceneVals && Object.keys(this.sceneVals).length > 0){
                
                this.scene = this.$projects.scene
            }
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