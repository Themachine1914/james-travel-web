import Image from "next/image";

export function PackageGallery({ images, alt }: { images: string[]; alt: string }) {
  if (images.length === 1) {
    return (
      <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl bg-brand-primary/5">
        <Image
          src={images[0]}
          alt={alt}
          fill
          priority
          sizes="(min-width: 768px) 28rem, 100vw"
          className="object-contain"
        />
      </div>
    );
  }

  const [first, ...rest] = images;

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="relative col-span-3 aspect-[16/9] overflow-hidden rounded-2xl sm:col-span-2">
        <Image
          src={first}
          alt={alt}
          fill
          priority
          sizes="(min-width: 640px) 66vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="col-span-3 grid grid-cols-3 gap-3 sm:col-span-1 sm:grid-cols-1">
        {rest.map((src, i) => (
          <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl sm:aspect-auto sm:h-full">
            <Image
              src={src}
              alt={`${alt} ${i + 2}`}
              fill
              loading="lazy"
              sizes="(min-width: 640px) 33vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
