/**
 * v0 by Vercel.
 * @see https://v0.dev/t/jt7wtBAmIfw
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { ImageResult } from "@/lib/types";
import { nanoid } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import ZoomableImage from "@/components/common/zoomable-image";

export const ImageGallery = ({
  images,
  title,
  subtitle,
}: {
  images: ImageResult[];
  title: string;
  subtitle: string;
}) => {
  const [mainImage, setMainImage] = useState<ImageResult>();

  useEffect(() => {
    if (images.length > 0) {
      setMainImage(images[0]);
    }
  }, [images]);
  return (
    <div className="mx-auto grid max-w-2xl gap-6">
      <div className="relative">
        <ZoomableImage
          src={mainImage?.image || "/placeholder.jpeg"}
          className="aspect-[16/9] w-full cursor-pointer rounded-lg object-cover"
        />
        {/* <Image
          src={mainImage?.image || "/placeholder.jpeg"}
          alt="景点图片"
          width={800}
          height={450}
          className="aspect-[16/9] w-full rounded-lg object-cover"
          //   onError={(e) => {
          //     if (e.target.src === mainImage?.thumbnail) {
          //       // 如果当前 src 已经是 thumbnail，说明 thumbnail 也加载失败了
          //       e.target.src = "/placeholder.jpeg";
          //     } else {
          //       e.target.src = mainImage?.thumbnail || "/placeholder.jpeg";
          //     }
          //   }}
        /> */}
        {/* <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0">
          <ZoomInIcon className="h-10 w-10 text-white" />
        </div> */}
      </div>
      <div className="flex gap-4 overflow-x-auto [&>div]:shrink-0">
        {images.map((image, index) => (
          <div
            key={nanoid()}
            className="relative cursor-pointer rounded-lg transition-all hover:scale-105"
            onClick={() => setMainImage(image)}
          >
            <Image
              src={image.thumbnail}
              alt="Thumbnail"
              width={120}
              height={80}
              className="w-30 h-20 rounded-lg object-cover"
              style={{ aspectRatio: "120/80", objectFit: "cover" }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-primary/50 opacity-0 transition-opacity hover:opacity-100">
              <CheckIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
};

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
