# LabelMore Essentials

![core](https://img.shields.io/badge/labelmore-official-blue.svg)
![core](https://img.shields.io/badge/core-true-blueviolet.svg)
[![npm version](https://badge.fury.io/js/%40infolks%2Flabelmore-essentials.svg)](https://badge.fury.io/js/%40infolks%2Flabelmore-essentials)


The **Essentials** plugin package provides the necessary tools to start up the LabelMore Annotation Tool.

*Note: The **Essentials** is a core package and cannot be removed from the tool.*

> **What's New**
> - Added Keypoint Annotation Support

## Contents

- [Encoders](#encoders)
    - [JSON Encoder](#json-encoder)
- [Label Types](#label-types)
    - [Bounding Box](#bounding-box-label)
    - [Contour Label](#contour-label)
    - [Polyline Label](#polyline-label)
- [Panels](#panels)
- [Sources](#sources)
- [Tools](#tools)
- [Wizards](#wizards)
- [Settings](#settings)

---

## Encoders

These are used to export the annotation project into a target format

### JSON Encoder

Exports the annotation in a JSON format.
The JSON encoder by default doesn't contain any export formats.
Format for each label type can be registered using the ```registerFormat``` method of the encoder.

*Note: The format registered must be a proper COCO JSON format.*

**The format must contain the following informations:**

- name *String*         : name of the annotation label
- description *Object*  : any extra information related to the annotation
- classTitle *String*   : name of the annotation class. E.g. Car, Pedestrian etc.
- attributes *Object*   : label attributes E.g. Occluded, Truncated etc.
- points *Object*       : spacial information of the annotation (co-ordinate points)

#### JSON Format Example

```json
{
    "name": "Car_1562909220502",
    "description": {
        "type": "types.default.bndbox"
    },
    "classTitle": "Car",
    "attributes": {},
    "points": {
        "exterior": [
            [
                220.71155595996362,
                242.18926296633305
            ],
            [
                326.2729754322112,
                312.9262966333031
            ]
        ],
        "interior": []
    }
}
```

#### Registering a JSON Format

A new format is registered to JSON Encoder by using an **EncoderFormat** object.
An **EncoderFormat** object is a javascript object with an *encode* method.

A common method to create a format is to:
1. Create a format class implementing the encode method.
2. Create an instance of the class and register it to JSON encoder.

##### Example: Registering bounding box format

**boundbox.json.format.ts**

```typescript
export class BoundboxJsonFormat {

    constructor(private labeller: LabelManager) {}

    /**
     * @param label - label to encode
     * @param class_ - class of the label
     */
    encode(label: Label<BoundboxProps>, class_: LabelClass) {

        /*
        * return a js object defining the json export format for boundbox label
        */
        return {
            name: this.labeller.getName(label),
            description: {
                type: label.type
            },
            classTitle: class_.name,
            attributes: label.attributes || {},
            points: {
                exterior: [[label.props.xmin, label.props.ymin], [label.props.xmax, label.props.ymax]],
                interior: []
            }

        }
    }
}
```

**boundbox.label.ts**

```typescript
// import BoundboxJsonFormat from boundbox.json.format.ts

export class BoundboxLabel extends SimpleLabelType<BoundboxProps> {

    // ....
    constructor(projectManager: ProjectManager, /*...other dependencies*/) {

        //...

        if (projectManager.hasEncoder('encoders.default.json')) {

            const jsonEnc = <JsonEncoder>projectManager.getEncoder('encoders.default.json')

            if (!jsonEnc.hasFormat(DEFAULT_LABEL_TYPES.boundbox)) {

                jsonEnc.registerFormat(DEFAULT_LABEL_TYPES.boundbox, new BoundboxJsonFormat(labeller))

                // DEFAULT_LABEL_TYPES.boundbox is constant giving the registered name of default bounding box label type
                // this should be replaced with the registered name of the label type for which the format is registered
            }
        }

        //...
    }
}
```

## Label Types

The Essentials package contains BoundingBox, Contour and Polyline labels.

### Bounding Box Label

The default bounding box label, implements the BoundboxProps.
Represents a rectangular bounding box.

To draw a boundbox label into workspace:

- The type should be set as **types.default.bndbox** *(Note: The type name of default boundbox can be accessed using the constant DEFAULT_LABEL_TYPES.boundbox)*
- The props should have:
    - xmin *Number* : X co-ordinate of top left point
    - ymin *Number* : Y co-ordinate of top left point
    - xmax *Number* : X co-ordinate of bottom right point
    - ymax *Number* : Y co-ordinate of bottom right point

#### Example : Adding a bounding box label to workspace

```typescript

// adding boundbox label
// code block from the boundbox tool

this.labeller.add({
    type: DEFAULT_LABEL_TYPES.boundbox,
    props: {
        xmin: this.preview.bounds.left,
        ymin: this.preview.bounds.top,
        xmax: this.preview.bounds.right,
        ymax: this.preview.bounds.bottom
    }
})
```

### Contour Label

The default contour or polygon label, implements the ContourProps.
Represents a closed polygon shape.

To draw a contour label into workspace:

- The type should be set as **types.default.contour** *(Note: The type name of default contour can be accessed using the constant DEFAULT_LABEL_TYPES.contour)*
- The props should have:
    - points *Array*    : Array of co-ordinate points

#### Example : Adding a contour label to workspace

```typescript

// adding contour label
// code block from the contour tool

this.labeller.add({
    type: DEFAULT_LABEL_TYPES.contour,
    props: {
        points: this.points.map(p => ({x: p.x, y: p.y}))
    }
})
```

### Polyline Label

The default polyline label, implements the PolylineProps.
Represents an open polyline shape.

To draw a polyline label into workspace:

- The type should be set as **types.default.line** *(Note: The type name of default polyline can be accessed using the constant DEFAULT_LABEL_TYPES.line)*
- The props should have:
    - points *Array*    : Array of co-ordinate points

#### Example : Adding a polyline label to workspace

```typescript

// adding polyline label
// code block from line tool

this.labeller.add({
    type: DEFAULT_LABEL_TYPES.line,
    props: {
        points: this.points.map(p => ({x: p.x, y: p.y}))
    }
})
```

### Keypoint Label

The default keypoint label.
Represents a keypoint skeleton.

To draw a keypoint label into workspace:

- The type should be set as **types.default.keypoint**
- The props should have:
    - boundbox *Object* : props of a boundbox label
        - xmin *Number* : X co-ordinate of top left point
        - ymin *Number* : Y co-ordinate of top left point
        - xmax *Number* : X co-ordinate of bottom right point
        - ymax *Number* : Y co-ordinate of bottom right point
    - keypoints *Array* : An array of object each of the form:
        - name *String* : name of the keypoint
        - point *Object*: coordinate of the point
            - x *Number*: x co-ordinate of the point
            - y *Number*: y co-ordinate of the point


## Panels

The Essentials package contains the necessary panels for selecting label class, keypoint, scene attributes and class attributes

![Panels](https://i.ibb.co/RNStY2m/panels-preview.png)

## Sources

The essentials package contains the **disk** source which allows projects to use the disk storage for input and output.

![Disk Source](https://i.ibb.co/wp1Vwry/disk-storage-preview.png)

## Tools

The essentials package contains tools for basic annotation.

It contains:

| Tool      | Default Shortcut |
| --------- | :--------------: |
| Select    | A                |
| Boundbox  | R                |
| Contour   | C                |
| Polyline  | W                |
| Keypoint  | X                |
| Pan       | D                |

*Note: Default shortcuts are set in the tool in-built and cannot be changed.*
*Note: Shortcuts can be changed for each project*

## Wizards

The essential package includes a basic localization annotation project.

## Settings

The essentials package comes with its own settings.

![Settings](https://i.ibb.co/fYSvynX/settings-preview.jpg)

### Tool Settings

1. Preview Color            : Stroke color of tool preview
2. Preview Stroke Width     : Stroke thickness of tool preview
3. Preview Dashed           : Whether stroke of tool preview is to be dashed or not
4. Hotspots                 : Enable hotspot info for tool

#### Boundbox Tool

5. Minimum Area             : Minimum area required to finalize a label creation

#### Contour Tool

6. Minimum Close Distance   : Minimum distance needed to trigger the auto-close circle
7. Minimum Sides            : Minimum sides needed for the polygon *(minimum value is 3)*
8. Snap to Point            : Snap to the closest point on the workspace *(Useful when working with semantic segmentations)*
9. Minimum Snap Distance    : Minimum distance needed between the points for them to snap together