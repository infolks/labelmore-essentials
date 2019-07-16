<template>
    <form @submit.prevent="submit()" id="boundbox-settings-form">

        <!--General Tool Settings -->
        <h5 class="settings-sub-heading">Tool Settings</h5>
        <div class="uk-margin">
            <div class="uk-grid-small" uk-grid>

                <!-- General -->
                <div class="uk-width-1-2 uk-width-1-3@s uk-width-1-6@m">
                    <label for="guide_color" class="uk-form-label">Preview Color: </label>
                    <app-color-input pos="bottom" v-model="settings.tools.general.preview.color"></app-color-input>
                </div>
                <div class="uk-width-1-2 uk-width-1-3@s uk-width-1-6@m">
                    <label for="guide_color" class="uk-form-label">Preview Stroke Width:</label>
                    <input type="number" name="min_area" :min="1" class="uk-input" v-model.number="settings.tools.general.preview.width">
                </div>
                <div class="uk-width-1-2 uk-width-1-3@s uk-width-1-6@m">
                    <label for="guide_color" class="uk-form-label">Preview Dashed:</label>
                    <app-check-toggle class="uk-width-1-1" v-model="settings.tools.general.preview.dashed">{{settings.tools.general.preview.dashed? 'dashed' : 'not dashed'}}</app-check-toggle>
                </div>
                <div class="uk-width-1-2 uk-width-1-3@s uk-width-1-6@m">
                    <label for="guide_color" class="uk-form-label">Hotspots:</label>
                    <app-check-toggle class="uk-width-1-1" v-model="settings.tools.general.preview.hotspots">{{settings.tools.general.preview.hotspots? 'enabled' : 'disabled'}}</app-check-toggle>
                </div>

            </div>
        </div>

        <!-- Boundbox Settings -->
        <h5 class="settings-sub-heading small">Boundbox Tool</h5>
        <div class="uk-margin">
            <div class="uk-grid-small" uk-grid>
                <div class="uk-width-1-2 uk-width-1-3@s uk-width-1-6@m">
                    <label class="uk-form-label" for="min_area">Minimum Area</label>
                    <input type="number" name="min_area" :min="0.01" :step="0.01" class="uk-input" v-model.number="settings.tools.boundbox.minArea">
                </div>
            </div>
        </div>

        <!-- Contour Settings -->
        <h5 class="settings-sub-heading small">Contour Tool</h5>
        <div class="uk-margin">
            <div class="uk-grid-small" uk-grid>
                <div class="uk-width-1-2 uk-width-1-3@s uk-width-1-6@m">
                    <label class="uk-form-label" for="min_close_distance">Minimum Close Distance</label>
                    <input type="number" name="min_close_distance" :min="5" :step="1" class="uk-input" v-model.number="settings.tools.contour.closeDistance">
                </div>

                <div class="uk-width-1-2 uk-width-1-3@s uk-width-1-6@m">
                    <label class="uk-form-label" for="min_sides">Minimum Sides</label>
                    <input type="number" name="min_sides" :min="3" :step="1" class="uk-input" v-model.number="settings.tools.contour.minSides">
                </div>

                <div class="uk-width-1-2 uk-width-1-3@s uk-width-1-6@m">
                    <label class="uk-form-label" for="snap_enabled">Snap to Point</label>
                    <app-check-toggle class="uk-width-1-1" v-model="settings.tools.contour.snap.enabled">{{settings.tools.contour.snap.enabled? 'enabled' : 'disabled'}}</app-check-toggle>
                </div>

                <div class="uk-width-1-2 uk-width-1-3@s uk-width-1-6@m" v-if="settings.tools.contour.snap.enabled">
                    <label class="uk-form-label" for="min_snap_distance">Minimum Snap Distance</label>
                    <input type="number" name="min_snap_distance" :min="2" :step="1" class="uk-input" v-model.number="settings.tools.contour.snap.distance">
                </div>
            </div>
        </div>

        <!-- Label Settings -->
        <h5 class="settings-sub-heading">Label Settings</h5>

        <!-- Contour Label -->
        <h5 class="settings-sub-heading small">Contour Label</h5>
        <div class="uk-margin">
            <div class="uk-grid-small" uk-grid>
                <div class="uk-width-1-2 uk-width-1-3@s uk-width-1-6@m">
                    <app-checkbox v-model="settings.labels.contour.showPoints">Show Vertex Points</app-checkbox>
                </div>
            </div>
        </div>

        <!-- Keypoint Label -->
        <h5 class="settings-sub-heading small">Keypoint Label</h5>
        <div class="uk-margin">
            <div class="uk-grid-small uk-flex-middle" uk-grid>
                <div class="uk-width-1-2 uk-width-1-3@s uk-width-1-6@m">
                    <label class="uk-form-label" for="min_close_distance">Keypoint Radius</label>
                    <input type="number" name="min_close_distance" :min="2" :step="1" class="uk-input" v-model.number="settings.labels.keypoints.keypoint.radius">
                </div>
                <!-- <div class="uk-width-1-2 uk-width-1-3@s uk-width-1-6@m">
                    <label class="uk-form-label" for="min_close_distance">Keypoint Thickness</label>
                    <input type="number" name="min_close_distance" :min="2" :step="0.5" :max="settings.labels.keypoints.keypoint.radius" class="uk-input" v-model.number="settings.labels.keypoints.keypoint.thickness">
                </div> -->
                <div class="uk-width-1-2 uk-width-1-3@s uk-width-1-6@m">
                    <app-checkbox v-model="settings.labels.keypoints.skeleton">Show Skeleton</app-checkbox>
                </div>
                <div class="uk-width-1-2 uk-width-1-3@s uk-width-1-6@m">
                    <label class="uk-form-label" for="snap_enabled">Skeleton</label>
                    <app-check-toggle class="uk-width-1-1" v-model="settings.labels.keypoints.skeleton">{{settings.labels.keypoints.skeleton? 'enabled' : 'disabled'}}</app-check-toggle>
                </div>
            </div>
        </div>

    </form>
</template>

<script lang="ts">
    import {DEFAULT_SETTINGS, NAME} from "./settings"
    import { deepAssign } from './helpers';

    export default {
        name: 'app-settings-essentials',
        props: ['value'],
        data() {
            return {
                settings: DEFAULT_SETTINGS,
            }
        },
        watch: {
            value() {
                this.value && (this.settings = deepAssign(this.settings, this.value))
            },
            settings: {
                handler() {

                    this.change()

                },
                deep: true
            }
        },
        methods: {
            submit() {
                this.$emit('submit', {
                    data: {
                        name: NAME,
                        settings: this.settings
                    }
                })
            },

            change() {
                this.$emit('change', {
                    data: {
                        name: NAME,
                        settings: this.settings
                    }
                })
            }
        },
        created() {

            if (this.value) this.settings = deepAssign(this.settings, this.value)

        }
    }
</script>

<style scoped>

</style>