import { ImageResponse } from "next/og";
import { ogImageAlt, ogImageJsx, ogImageSize } from "@/lib/og-image";

export const alt = ogImageAlt;
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(ogImageJsx(), size);
}
