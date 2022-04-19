var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class ImageLoader {
    static loadImage(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ImageLoader.loadedImages.has(name)) {
                console.log(ImageLoader.loadedImages.get(name));
                return ImageLoader.loadedImages.get(name);
            }
            var img = new Image();
            img.src = yield fetch(`./resources/images/${name}.png`)
                .then(response => response.blob())
                .then(imageBlob => {
                const url = URL.createObjectURL(imageBlob);
                return url;
            });
            ImageLoader.loadedImages.set(name, img);
            return img;
        });
    }
}
ImageLoader.loadedImages = new Map();
