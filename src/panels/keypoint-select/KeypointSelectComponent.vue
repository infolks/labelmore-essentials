<template>
    <!-- <div class="uk-padding-small" id="keypoint-select">
        <div v-if="keypoints && keypoints.length">

            <button class="uk-button uk-width-1-1 uk-button-default uk-flex uk-flex-middle" type="button">
                {{keypoint? keypoint.name: 'Select Keypoint'}}
                <span class="uk-margin-auto-left">
                    <i class="fas fa-chevron-down"></i>
                </span>
            </button>
            <div v-if="keypoints" class="uk-padding-remove keypoint-dropdown" uk-dropdown="mode: click; pos; bottom-justify, boundary: #keypoint-select, boundary-align: true">
                <div class="uk-padding-small keypoint-item uk-dropdown-close" v-for="kp in keypoints" :key="kp.name" @click="$labeller.selectKeypoint(kp.name)">
                    {{kp.name}}
                </div>
            </div>
            
        </div>

        <div v-else>
            <div class="uk-placeholder uk-text-center">
                No Keypoints available
            </div>
        </div>
        
    </div> -->
    <div>
        <div class="uk-padding-small uk-flex">
            <button @click="visible = !visible" uk-tooltip="title: Toggle Visibility" class="uk-button uk-button-small" :class="{'uk-button-default' : !visible, 'uk-button-primary': visible}">
                <i class="fas fa-eye"></i> <span class="uk-margin-left">{{visible? 'visible' : 'hidden'}}</span>
            </button>
        </div>
        <div class="uk-list uk-list-clickable">
            <li :class="{'uk-active': keypoint && (keypoint.name === kp.name)}" v-for="kp in keypoints" :key="kp.name">
                <div class="uk-padding-small keypoint-item" @click="$labeller.selectKeypoint(kp.name)">
                    <span class="uk-margin-right uk-text-primary">
                        <i class="far fa-dot-circle" v-if="keypoint && (keypoint.name === kp.name)"></i>
                        <i class="far fa-circle" v-else></i>
                    </span>
                    {{kp.name}}
                </div>
            </li>
        </div>
    </div>
    
</template>

<script lang="ts">
    import { KeypointLabel } from '../../labels/keypoint.label';

    const VISIBILITY = `tools.default.keypoint.visibility`

    export default {
        name: 'app-panel-keypoints',
        computed: {
            keypoints() {
                return this.$labeller.keypoints
            },

            keypoint() {
                return this.$labeller.keypoint
            },

            visible: {
                get() {
                    return this.$store.state.globals[VISIBILITY] === 2
                },

                set(val: boolean) {

                    const visibility = val? 2 : 1

                    this.$store.dispatch('setGlobal', {
                        key: VISIBILITY,
                        value: visibility
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>