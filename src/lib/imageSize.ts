// Reads the intrinsic size of an image in /public at build time, so the
// gallery can lay each flyer out at its real proportions. The flyers come
// straight from Instagram (4:5 and 1:1 mixed), and forcing them into one
// fixed box cuts off the prices and dates printed at the bottom.
//
// Build-time only: this runs inside statically generated server
// components, so no dependency and no runtime cost. Add a flyer to
// /public and it is measured on the next build — nothing to annotate.
import { readFileSync } from "node:fs";
import { join } from "node:path";

export interface ImageSize {
  width: number;
  height: number;
}

const cache = new Map<string, ImageSize | null>();

/** Returns null for formats we can't measure; callers pick a fallback ratio. */
export function getImageSize(publicPath: string): ImageSize | null {
  const cached = cache.get(publicPath);
  if (cached !== undefined) return cached;

  let size: ImageSize | null = null;
  try {
    const buffer = readFileSync(join(process.cwd(), "public", publicPath));
    if (buffer[0] === 0x89 && buffer[1] === 0x50) size = pngSize(buffer);
    else if (buffer[0] === 0xff && buffer[1] === 0xd8) size = jpegSize(buffer);
    else if (buffer[0] === 0x3c) size = svgSize(buffer);
  } catch {
    size = null;
  }

  cache.set(publicPath, size);
  return size;
}

function pngSize(buffer: Buffer): ImageSize | null {
  if (buffer.length < 24) return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function jpegSize(buffer: Buffer): ImageSize | null {
  let offset = 2; // skip the start-of-image marker

  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    // Markers without a payload: padding, restart markers, start/end of image.
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9)) {
      offset += 2;
      continue;
    }

    // Any start-of-frame marker carries the dimensions; 0xc4, 0xc8 and
    // 0xcc are Huffman/arithmetic tables that share the same range.
    const isStartOfFrame =
      marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isStartOfFrame) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }

    offset += 2 + buffer.readUInt16BE(offset + 2);
  }

  return null;
}

function svgSize(buffer: Buffer): ImageSize | null {
  const head = buffer.subarray(0, 1024).toString("utf8");

  const viewBox = head.match(/viewBox\s*=\s*["']\s*[\d.-]+[\s,]+[\d.-]+[\s,]+([\d.]+)[\s,]+([\d.]+)/);
  if (viewBox) return { width: Number(viewBox[1]), height: Number(viewBox[2]) };

  const width = head.match(/\bwidth\s*=\s*["'](\d+(?:\.\d+)?)/);
  const height = head.match(/\bheight\s*=\s*["'](\d+(?:\.\d+)?)/);
  if (width && height) return { width: Number(width[1]), height: Number(height[1]) };

  return null;
}
