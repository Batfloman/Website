import { Polygon2Helper } from "../physic/algorithms/Polygon2Helper.js";
import { Polygon2 } from "../physic/geometry/Polygon2.js";

export const Util = {
  array: {
    addItem: <T>(arr: T[], item: T) => {
      arr.push(item);
      return arr;
    },
    getItem<T>(arr: T[], index: number): T {
      if (index < 0) index = arr.length - 1;

      return arr[index % arr.length];
    },
    getLastItem: <T>(arr: T[]) => arr.at(-1),
    getRandomItem: <T>(arr: T[]) => arr[Util.math.random.between(0, arr.length)],
    removeItemAtIndex<T>(arr: T[], index: number): T {
      if (index < 0 || index >= arr.length) throw new Error(`${index} is not Valid!`);

      return arr.splice(index, 1)[0];
    },
    removeItem<T>(arr: T[], item: T): T | undefined {
      if (!arr.includes(item)) return undefined;

      return arr.splice(arr.indexOf(item), 1)[0];
    },
    sum(arr: number[]): number {
      return arr.reduce((a, b) => (a += isNaN(b) ? 0 : b));
    },
    isEmpty<T>(arr: T[]): boolean {
      return !arr || arr.length === 0;
    },
    copyOf<T>(arr: T[]): T[] {
      return [...arr];
    },
    connectArrays<T>(arrays: T[]): T[] {
      let connected: T[] = [];
      for (let arr of arrays) {
        connected = connected.concat(arr);
      }
      return connected;
    },
  },
  map: {
    copyOf<K, V>(map: Map<K, V>): Map<K, V> {
      var newMap = new Map<K, V>();
      for (let [key, value] of map.entries()) {
        newMap.set(key, value);
      }
      return newMap;
    },
  },
  math: {
    random: {
      // includes end
      to(end: number, num_decimals: number = 0) {
        const num = Math.random() * ++end;
        return Util.math.floor(num, num_decimals);
      },
      // includes end
      between(start: number, end: number, num_decimals: number = 0): number {
        const num = Math.random() * (++end-start) + start;
        return Util.math.floor(num, num_decimals);
      },
      sign: (): number => Math.random() > 0.5 ? 1 : -1
    },
    convert: {
      DegToRad(degree: number) {
        return (degree * Math.PI) / 180;
      },
      RadToDeg(rad: number) {
        return (180 * rad) / Math.PI;
      },
      percent(percent: number | string, value: number = 1) {
        if (typeof percent === "string") {
          percent = parseFloat(percent);
          if (isNaN(percent)) throw new Error(`${percent} contains no number`);
        }

        return (percent / 100) * value;
      },
      dtToSecValue(dt: number, perSecValue: number): number {
        let value = (perSecValue * dt) / 1000;
        return Number.isNaN(value) ? 0 : value;
      },
    },
    // uses degree instead of the Math.* functions
    trigonomitry: {
      cos: (deg: number): number => Math.cos(Util.math.convert.DegToRad(deg)),
      sin: (deg: number): number => Math.sin(Util.math.convert.DegToRad(deg)),
      tan: (deg: number): number => Math.tan(Util.math.convert.DegToRad(deg)),
      arccos(num: number): number {
        return Util.math.convert.RadToDeg(Math.acos(num));
      },
      arcsin(num: number): number {
        return Util.math.convert.RadToDeg(Math.asin(num));
      },
      arctan(num: number): number {
        return Util.math.convert.RadToDeg(Math.atan(num));
      },
    },
    round(number: number, num_decimals: number = 0): number {
      const factor = Math.pow(10, num_decimals);
      return Math.round(number * factor) / factor;
    },
    floor(number: number, num_decimals: number = 0): number {
      const factor = Math.pow(10, num_decimals);
      return Math.floor(number * factor) / factor;
    },
    ceil(number: number, num_decimals: number = 0): number {
      const factor = Math.pow(10, num_decimals);
      return Math.ceil(number * factor) / factor;
    },
    calcHypothenuse(side1: number, side2: number): number {
      return Math.sqrt(Math.pow(side1, 2) + Math.pow(side2, 2));
    },
  },
  shapes: {
    circle: {
      area(radius: number): number {
        return Math.PI * Math.pow(radius, 2);
      },
      radius(volume: number): number {
        return Math.sqrt(volume / Math.PI);
      },
    },
    polygon: {
      area(polygon: Polygon2): number {
        return Polygon2Helper.findArea(polygon);
      },
    },
  },
  object: {
    findClassName(clas: Object | Function): string {
      return clas instanceof Function ? clas.name : clas.constructor.name;
    },
    findSuperClassName(clas: Object | Function): string {
      return clas instanceof Function
        ? Object.getPrototypeOf(clas).name
        : Object.getPrototypeOf(Object.getPrototypeOf(clas)).constructor.name;
    },
    findClass(clas: Object | Function): Function {
      return clas instanceof Function ? clas : Object.getPrototypeOf(clas).constructor;
    },
    findSuperClass(clas: Object | Function): Function {
      // if can't access .constructor => Max superclass Found!
      return clas instanceof Function
        ? Object.getPrototypeOf(clas)
        : Object.getPrototypeOf(Object.getPrototypeOf(clas)).constructor;
    },
    findAllClassNames(clas: Object | Function): string[] {
      const superClasses: string[] = [];

      let currentClass = this.findClass(clas);
      while (currentClass.name != "") {
        superClasses.push(currentClass.name);
        currentClass = this.findSuperClass(currentClass);
      }
      return superClasses;
    },
    findAllClasses(clas: Object | Function): Function[] {
      const superClasses: Function[] = [];

      let currentClass = this.findClass(clas);
      while (currentClass.name != "") {
        superClasses.push(currentClass);
        currentClass = this.findSuperClass(currentClass);
      }

      return superClasses;
    },
    findAllSuperClassNames(clas: Object | Function): string[] {
      const superClasses: string[] = [];

      let currentClass = this.findSuperClass(clas);
      while (currentClass.name != "") {
        superClasses.push(currentClass.name);
        currentClass = this.findSuperClass(currentClass);
      }
      return superClasses;
    },
    findAllSuperClasses(clas: Object | Function): Function[] {
      const superClasses: Function[] = [];

      let currentClass = this.findSuperClass(clas);
      while (currentClass.name != "") {
        superClasses.push(currentClass);
        currentClass = this.findSuperClass(currentClass);
      }

      return superClasses;
    },
  },
};
