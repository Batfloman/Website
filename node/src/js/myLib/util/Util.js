// import { Polygon2 } from "../objects/geometry/Polygon2.js";
export const Util = {
    array: {
        addItem: (arr, item) => {
            arr.push(item);
            return arr;
        },
        getItem(arr, index) {
            if (index < 0)
                index = arr.length - 1;
            return arr[index % arr.length];
        },
        getLastItem: (arr) => arr.at(-1),
        getRandomItem: (arr) => arr[Util.math.random.between(0, arr.length)],
        removeItemAtIndex(arr, index) {
            if (index < 0 || index >= arr.length)
                throw new Error(`${index} is not Valid!`);
            return arr.splice(index, 1)[0];
        },
        removeItem(arr, item) {
            if (!arr.includes(item))
                return undefined;
            return arr.splice(arr.indexOf(item), 1)[0];
        },
        sum(arr) {
            return arr.reduce((a, b) => (a += isNaN(b) ? 0 : b));
        },
        isEmpty(arr) {
            return !arr || arr.length === 0;
        },
        copyOf(arr) {
            return [...arr];
        },
        connectArrays(arrays) {
            let connected = [];
            for (let arr of arrays) {
                connected = connected.concat(arr);
            }
            return connected;
        },
    },
    map: {
        copyOf(map) {
            var newMap = new Map();
            for (let [key, value] of map.entries()) {
                newMap.set(key, value);
            }
            return newMap;
        },
    },
    math: {
        random: {
            // includes end
            to(end, num_decimals = 0) {
                const num = Math.random() * ++end;
                return Util.math.floor(num, num_decimals);
            },
            // includes end
            between(start, end, num_decimals = 0) {
                const num = Math.random() * (++end - start) + start;
                return Util.math.floor(num, num_decimals);
            },
            sign: () => Math.random() > 0.5 ? 1 : -1
        },
        convert: {
            DegToRad(degree) {
                return (degree * Math.PI) / 180;
            },
            RadToDeg(rad) {
                return (180 * rad) / Math.PI;
            },
            percent(percent, value = 1) {
                if (typeof percent === "string") {
                    percent = parseFloat(percent);
                    if (isNaN(percent))
                        throw new Error(`${percent} contains no number`);
                }
                return (percent / 100) * value;
            },
            dtToSecValue(dt, perSecValue) {
                let value = (perSecValue * dt) / 1000;
                return Number.isNaN(value) ? 0 : value;
            },
        },
        // uses degree instead of the Math.* functions
        trigonomitry: {
            cos: (deg) => Math.cos(Util.math.convert.DegToRad(deg)),
            sin: (deg) => Math.sin(Util.math.convert.DegToRad(deg)),
            tan: (deg) => Math.tan(Util.math.convert.DegToRad(deg)),
            arccos(num) {
                return Util.math.convert.RadToDeg(Math.acos(num));
            },
            arcsin(num) {
                return Util.math.convert.RadToDeg(Math.asin(num));
            },
            arctan(num) {
                return Util.math.convert.RadToDeg(Math.atan(num));
            },
        },
        round(number, num_decimals = 0) {
            const factor = Math.pow(10, num_decimals);
            return Math.round(number * factor) / factor;
        },
        floor(number, num_decimals = 0) {
            const factor = Math.pow(10, num_decimals);
            return Math.floor(number * factor) / factor;
        },
        ceil(number, num_decimals = 0) {
            const factor = Math.pow(10, num_decimals);
            return Math.ceil(number * factor) / factor;
        },
        calcHypothenuse(side1, side2) {
            return Math.sqrt(Math.pow(side1, 2) + Math.pow(side2, 2));
        },
    },
    shapes: {
        circle: {
            area(radius) {
                return Math.PI * Math.pow(radius, 2);
            },
            radius(volume) {
                return Math.sqrt(volume / Math.PI);
            },
        },
        polygon: {
        // area(polygon: Polygon2): number {
        //   return Polygon2Helper.findArea(polygon);
        // },
        },
    },
    object: {
        findClassName(clas) {
            return clas instanceof Function ? clas.name : clas.constructor.name;
        },
        findSuperClassName(clas) {
            return clas instanceof Function
                ? Object.getPrototypeOf(clas).name
                : Object.getPrototypeOf(Object.getPrototypeOf(clas)).constructor.name;
        },
        findClass(clas) {
            return clas instanceof Function ? clas : Object.getPrototypeOf(clas).constructor;
        },
        findSuperClass(clas) {
            // if can't access .constructor => Max superclass Found!
            return clas instanceof Function
                ? Object.getPrototypeOf(clas)
                : Object.getPrototypeOf(Object.getPrototypeOf(clas)).constructor;
        },
        findAllClassNames(clas) {
            const superClasses = [];
            let currentClass = this.findClass(clas);
            while (currentClass.name != "") {
                superClasses.push(currentClass.name);
                currentClass = this.findSuperClass(currentClass);
            }
            return superClasses;
        },
        findAllClasses(clas) {
            const superClasses = [];
            let currentClass = this.findClass(clas);
            while (currentClass.name != "") {
                superClasses.push(currentClass);
                currentClass = this.findSuperClass(currentClass);
            }
            return superClasses;
        },
        findAllSuperClassNames(clas) {
            const superClasses = [];
            let currentClass = this.findSuperClass(clas);
            while (currentClass.name != "") {
                superClasses.push(currentClass.name);
                currentClass = this.findSuperClass(currentClass);
            }
            return superClasses;
        },
        findAllSuperClasses(clas) {
            const superClasses = [];
            let currentClass = this.findSuperClass(clas);
            while (currentClass.name != "") {
                superClasses.push(currentClass);
                currentClass = this.findSuperClass(currentClass);
            }
            return superClasses;
        },
    },
};
