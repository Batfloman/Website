import { Camara } from "../display/Camara.js";
import { Canvas } from "../display/Canvas.js";
import { Polygon2 } from "../physic/boundingBox/Polygon2.js";
import { Vector2 } from "./Vector2.js";
export type staticPosition = "center";
export declare const Util: {
    array: {
        getItem<T>(arr: T[], index: number): T;
        getLastItem<T_1>(arr: T_1[]): T_1;
        getRandomItem<T_2>(arr: T_2[]): T_2;
        removeItemAtIndex<T_3>(arr: T_3[], index: number): T_3;
        removeItem<T_4>(arr: T_4[], item: T_4): T_4 | undefined;
        sum(arr: number[]): number;
        isEmpty<T_5>(arr: T_5[]): boolean;
        copyOf<T_6>(arr: T_6[]): T_6[];
        connectArrays<T_7>(arrays: T_7[]): T_7[];
    };
    map: {
        copyOf<K, V>(map: Map<K, V>): Map<K, V>;
    };
    math: {
        random: {
            between(start: number, end: number, num_decimals?: number): number;
            mathSign(): number;
        };
        convert: {
            DegToRad(degree: number): number;
            RadToDeg(rad: number): number;
            percent(percent: number | string, value?: number): number;
        };
        trigonomitry: {
            cos(degree: number): number;
            arccos(num: number): number;
        };
        round(number: number, num_decimals?: number): number;
        floor(number: number, num_decimals?: number): number;
        ceil(number: number, num_decimals?: number): number;
    };
    shapes: {
        circle: {
            area(radius: number): number;
            radius(volume: number): number;
        };
        polygon: {
            area(polygon: Polygon2): number;
        };
    };
    object: {
        findClassName(clas: Object | Function): string;
        findSuperClassName(clas: Object | Function): string;
        findClass(clas: Object | Function): Function;
        findSuperClass(clas: Object | Function): Function;
        findAllClassNames(clas: Object | Function): string[];
        findAllClasses(clas: Object | Function): Function[];
        findAllSuperClassNames(clas: Object | Function): string[];
        findAllSuperClasses(clas: Object | Function): Function[];
    };
    position: {
        worldPos_to_staticPos(worldPos: Vector2, camara: Camara): Vector2;
        staticPos_to_worldPos(staticPos: Vector2, camara: Camara): Vector2;
        convertStaticPosInValue(pos: staticPosition, camara: Camara): Vector2;
        convertPercentInValue(canvas: Canvas, widthPercent: string, heightPercent: string): Vector2;
        convertWidthPercentInValue(canvas: Canvas, percent: string): number;
        convertHeightPercentInValue(canvas: Canvas, percent: string): number;
    };
    toVector(angle: number, lenght: number): Vector2;
    findAngleLine(startPoint: Vector2, endPoint: Vector2): number;
    calcHypothenuse(side1: number, side2: number): number;
    distance(point1: Vector2, point2: Vector2): number;
    closestPoint(mainPoint: Vector2, points: Vector2[], exclude?: Vector2 | Vector2[]): Vector2;
    farthestPoint(mainPoint: Vector2, points: Vector2[], exclude?: Vector2 | Vector2[]): Vector2;
    moveDirection(start: Vector2, direction: number, distance: number): Vector2;
    rotateAroundCenter(center: Vector2, point: Vector2, angle: number): Vector2;
};
