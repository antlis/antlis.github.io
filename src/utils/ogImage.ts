// Resolve a post's `imgSrc` to a social-share (Open Graph) image URL.
//
// Social crawlers (Telegram, Facebook, X, LinkedIn) only render raster images
// — never SVG. So:
//   - local raster (e.g. "/blog/foo.png") → use as-is (SEO makes it absolute)
//   - "cloudinary:blog/foo"               → full res.cloudinary.com raster URL
//   - ".svg" hero or no image             → the branded default (/og-default.png)
const DEFAULT_OG = '/og-default.png'
const CLD_PREFIX = 'cloudinary:'
const CLOUD_NAME = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME

export function ogImageFor(imgSrc?: string): string {
  if (!imgSrc) return DEFAULT_OG

  if (imgSrc.startsWith(CLD_PREFIX)) {
    const publicId = imgSrc.slice(CLD_PREFIX.length)
    // f_jpg forces a crawler-friendly raster; w_1200 keeps it a sensible size.
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_jpg,w_1200/${publicId}`
  }

  if (imgSrc.endsWith('.svg')) return DEFAULT_OG

  return imgSrc
}
