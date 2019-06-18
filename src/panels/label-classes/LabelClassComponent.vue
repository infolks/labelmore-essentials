<template>
    <div class="uk-padding-small" id="label-classes-select">
        <button class="uk-button uk-width-1-1 uk-button-default uk-flex uk-flex-middle" type="button">
            <span class="uk-margin-right" :style="{color: labelClass.color}">
                <i class="fas fa-square"></i>
            </span>
            {{labelClass.name}}
            <span class="uk-margin-auto-left">
                <i class="fas fa-chevron-down"></i>
            </span>
        </button>
        <div v-if="labelClasses" class="uk-padding-remove label-class-dropdown" uk-dropdown="mode: click; pos; bottom-justify, boundary: #label-classes-select, boundary-align: true">
            <div class="uk-padding-small label-class-item uk-dropdown-close" v-for="cl in labelClasses" :key="cl.id" @click="$labeller.selectClass(cl.id)">
                <span class="uk-margin-right" :style="{color: cl.color}">
                    <i class="fa-square" :class="{fas: cl.id === labelClass.id, far: cl.id !== labelClass.id}"></i>
                </span>
                {{cl.name}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { LabelClass } from '@infolks/labelmore-devkit';

    export default {
        name: 'app-panel-labelclass',
        computed: {
            labelClasses() {
                return this.$labeller.classes
            },

            labelClass() {
                return this.class_ || {name: 'select class', color: '#7e7e7e'}
            },

            class_() {
                return this.$labeller.class
            },

            keypoints() {
                return this.$labeller.keypoints
            },

            keypoint() {
                return this.$labeller.keypoint
            }
        },
    }
</script>

<style scoped>

    .label-class-item {
        transition: background 0.3s ease-in-out;
        cursor: pointer;
    }

    .label-class-item:hover {
        background: darken(white, 5%);
    }

    .label-class-dropdown {
        max-height: 300px;
        overflow-y: auto;
    }
</style>