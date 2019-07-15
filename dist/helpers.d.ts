import { Keypoint } from "@infolks/labelmore-devkit";
/**
 * remove extension from a file name
 * @param str string file name
 */
export declare function removeExtension(str: string): string;
/**
 * Deeply assing an object to another object
 * @param object1 first object
 * @param object2 second object
 */
export declare function deepAssign(object1: {
    [key: string]: any;
}, object2: {
    [key: string]: any;
}): {
    [key: string]: any;
};
/**
 * Return the skeleton for the array of keypoints
 * @param projectKeypoints project keypoints
 */
export declare function getSkeleton(projectKeypoints: Keypoint[]): number[][];
