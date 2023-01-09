import { Polygon2 } from "../objects/geometry/Polygon2.js";
export declare const Util: {
    array: {
        addItem: <T>(arr: T[], item: T) => T[];
        getItem<T_1>(arr: T_1[], index: number): T_1;
        getLastItem: <T_2>(arr: T_2[]) => T_2 | undefined;
        getRandomItem: <T_3>(arr: T_3[]) => T_3;
        removeItemAtIndex<T_4>(arr: T_4[], index: number): T_4;
        removeItem<T_5>(arr: T_5[], item: T_5): T_5 | undefined;
        sum(arr: number[]): number;
        isEmpty<T_6>(arr: T_6[]): boolean;
        copyOf<T_7>(arr: T_7[]): T_7[];
        connectArrays<T_8>(arrays: T_8[]): T_8[];
    };
    map: {
        copyOf<K, V>(map: Map<K, V>): Map<K, V>;
    };
    math: {
        random: {
            to(end: number, num_decimals?: number): number;
            between(start: number, end: number, num_decimals?: number): number;
            sign: () => number;
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
        calcHypothenuse(side1: number, side2: number): number;
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
};
