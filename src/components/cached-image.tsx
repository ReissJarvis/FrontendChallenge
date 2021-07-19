import { FC, ImgHTMLAttributes } from 'react';
import { ImageCache } from '../services/image-cache.service';

interface CachedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string
    imgCache?: ImageCache
}

export const CachedImg: FC<CachedImageProps> = ({ src, imgCache, ...rest }) => {
    if (imgCache) {
        imgCache.read(src)
    }

    return <img alt="" src={src} {...rest} />;
};
