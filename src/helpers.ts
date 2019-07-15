import { Keypoint } from "@infolks/labelmore-devkit";

/**
 * remove extension from a file name
 * @param str string file name
 */
export function removeExtension(str: string) {

    return str.split('.').slice(0,-1).join('.')
    
}

/**
 * Deeply assing an object to another object
 * @param object1 first object
 * @param object2 second object
 */
export function deepAssign(object1: {[key:string]:any}, object2: {[key:string]:any}) {

    for (let key in object1) {
        if (Object.keys(object2).indexOf(key) !== -1) {

            if (typeof object1[key] === "object" && typeof object2[key] === "object") {

                // arrays are not deep assigned
                if (object1[key] instanceof Array || object2 instanceof Array) {
                    object1[key] = object2[key]
                }
                
                else {
                    object1[key] = deepAssign(object1[key], object2[key])
                }
            }

            else {
                object1[key] = object2[key]
            }
        }
    }

    for (let key in object2) {
        if (Object.keys(object1).indexOf(key) === -1) {
            object1[key] = object2[key]
        }
    }

    return object1;
}

/**
 * Return the skeleton for the array of keypoints
 * @param projectKeypoints project keypoints
 */
export function getSkeleton(projectKeypoints: Keypoint[]) {

    // create a dictionary to connect ids

    const kpDict = {}

    for (let i=0; i<projectKeypoints.length; i++) {
        
        kpDict[projectKeypoints[i].name] = i

    }

    // we have a dictionary with names mapped to index

    // we will create an array of edges from this dictionary
    const edges: number[][] = []

    // lets clone the keypoints array
    const keypoints: Keypoint[] = JSON.parse(JSON.stringify(projectKeypoints))

    for (let i=0; i<keypoints.length; i++) {

        const kp = keypoints[i]

        for (let conn of kp.connections) {

            const j = kpDict[conn]

            if (j) {
                // push connection to edges array
                edges.push([i, j])

                // remove the reverse connection
                keypoints[j].connections = keypoints[j].connections.filter(c => c!==kp.name)
            }
        }
    }

    return edges
}