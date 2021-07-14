export class ImageCache {
    __cache: {[src: string]: Promise<string | void> | boolean} = {}
    read(src: string) {
        if (!this.__cache[src]) {
            this.__cache[src] = new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    this.__cache[src] = true;
                    resolve(this.__cache[src]);
                };
                img.src = src;
            }).then((img) => {
                this.__cache[src] = true;
            });
        }

        if (this.__cache[src] instanceof Promise) {
            throw this.__cache[src];
        }

        return this.__cache[src];
    }
}
