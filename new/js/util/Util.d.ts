import { Polygon2 } from "../physic/geometry/Polygon2.js";
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
            dtToSecValue(dt: number, perSecValue: number): number;
        };
        trigonomitry: {
            cos: (deg: number) => number;
            sin: (deg: number) => number;
            tan: (deg: number) => number;
            arccos(num: number): number;
            arcsin(num: number): number;
            arctan(num: number): number;
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
        /** Returns the static Position of a point with a world Position */
        worldPos_to_staticPos(worldPos: Vector2, camara: Camara): Vector2;
        /** Returns the world Position of a point with a static Position */
        staticPos_to_worldPos(staticPos: Vector2, camara: Camara): Vector2;
        convertStaticPosInValue(pos: staticPosition, camara: Camara): Vector2;
        convertPercentInValue(canvas: Canvas, widthPercent: string, heightPercent: string): Vector2;
        convertWidthPercentInValue(canvas: Canvas, percent: string): number;
        convertHeightPercentInValue(canvas: Canvas, percent: string): number;
    };
    toVector(angle: number, lenght: number): Vector2;
    findAngleLine(startPoint: Vector2, endPoint: Vector2): number;
    /**
     * Returns the Hypothenuse of a Triangle
     * @param side1 the lenght of the 1. side
     * @param side2 the lenght of the 2. side
     */
    calcHypothenuse(side1: number, side2: number): number;
    /**
     * Returns the distance between to Points
     * @param point1
     * @param point2
     */
    distance(point1: Vector2, point2: Vector2): number;
    /**
     * Returns the closest Point to the mainPoint
     * @param mainPoint point from which the distance will be measured
     * @param points collection of Points that will be tested
     * @param exclude point(s) that will be excluded
     */
    closestPoint(mainPoint: Vector2, points: Vector2[], exclude?: Vector2 | Vector2[]): Vector2;
    /**
     * Returns the farthest Point to the mainPoint
     * @param mainPoint point from which the distance will be measured
     * @param points collection of Points that will be tested
     * @param exclude point(s) that will be excluded
     */
    farthestPoint(mainPoint: Vector2, points: Vector2[], exclude?: Vector2 | Vector2[]): Vector2;
    /**
     * Moves @param distance in @param direction from the @param start Point and returns the new Position
     * @param start point from which the movement starts
     * @param direction angle in which the point will be moved
     * @param distance amount by which the point will be moved
     */
    moveDirection(start: Vector2, direction: number, distance: number): Vector2;
    /**
     * Rotates the @param point around a @param center Point by @param angle degrees
     * @param center point which another point will rotate around
     * @param point point that will be rotated
     * @param angle angle by which the point will be rotated
     */
    rotateAroundCenter(center: Vector2, point: Vector2, angle: number): Vector2;
};
