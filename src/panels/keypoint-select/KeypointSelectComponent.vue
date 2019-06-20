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
    <div class="uk-list uk-list-clickable">
        <li :class="{'uk-active': keypoint && (keypoint.name === kp.name)}" v-for="kp in keypoints" :key="kp.name">
            <div class="uk-padding-small keypoint-item" @click="$labeller.selectKeypoint(kp.name)">
                <span class="uk-margin-right uk-text-primary">
                    <i class="fas fa-caret-right" v-if="keypoint && (keypoint.name === kp.name)"></i>
                    <i class="far fa-circle" v-else></i>
                </span>
                {{kp.name}}
            </div>
        </li>
    </div>
</template>

<script lang="ts">

    export default {
        name: 'app-panel-keypoints',
        computed: {
            keypoints() {
                console.log(this, this.$labeller)
                return this.$labeller.keypoints
            },

            keypoint() {
                return this.$labeller.keypoint
            }
        }
    }
</script>

<style scoped>

</style>