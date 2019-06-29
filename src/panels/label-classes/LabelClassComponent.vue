<template>
    <div class="uk-list uk-list-clickable">
        <li :class="{'uk-active': class_ && (class_.id === cl.id)}" v-for="cl in labelClasses" :key="cl.id">
            <div class="uk-flex uk-padding-small label-class-item" @click="$labeller.selectClass(cl.id)">
                <span class="uk-margin-right" :style="{color: cl.color}">
                    <i class="fa-square" :class="{fas: cl.id === labelClass.id, far: cl.id !== labelClass.id}"></i>
                </span>
                {{cl.name}}
            </div>
        </li>
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
            }
        },

        methods: {
            isActive(class_id) {
                return this.class_ && this.class_.id === class_id
            },
        }
    }
</script>

<style scoped>

</style>