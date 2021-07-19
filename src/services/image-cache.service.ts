
// We use this to leverage the ability of Suspense components. we want to make sure the browser has cached the image before we use it
// and we want to show a loading indicator while it is loading the image.
export class ImageCache {
    private cache: { [src: string]: Promise<string | void> | boolean } = {}

    read(src: string): boolean | Promise<string | void> {
        if (!this.cache[src]) {
            this.cache[src] = new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    // Set as true in the cache so we keep a record that the image has loaded.
                    this.cache[src] = true;
                    resolve(this.cache[src]);
                };
                img.src = src;
            }).then(() => {
                this.cache[src] = true;
            });
        }

        if (this.cache[src] instanceof Promise) {
            throw this.cache[src];
        }

        return this.cache[src];
    }
}
