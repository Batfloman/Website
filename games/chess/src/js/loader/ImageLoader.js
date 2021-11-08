export default class ImageLoader {
    static loadedImages = new Map();
    
    static async loadImage(name) {
        if(ImageLoader.loadedImages.has(name)) {
            console.log(ImageLoader.loadedImages.get(name));
            return ImageLoader.loadedImages.get(name);
        }

        var img = new Image();
        img.src = await fetch(`./resources/images/${name}.png`)
        .then(response => response.blob())
        .then(imageBlob => {
            const url = URL.createObjectURL(imageBlob)
            return url;
        });
        ImageLoader.loadedImages.set(name, img);
        
        return img;
    }
}