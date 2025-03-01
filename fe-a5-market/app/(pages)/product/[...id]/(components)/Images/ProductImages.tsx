import Image from "next/image";

export default function ProductImages() {
  return (
    <div>
      <div className="w-full h-[500px] mb-4">
        <Image
          src="/140.webp"
          alt="Product Image"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>

      <ul className="flex gap-2">
        <li>
          <Image src="/140.webp" alt="Product Image" width={140} height={140} />
        </li>
        <li>
          <Image src="/140.webp" alt="Product Image" width={140} height={140} />
        </li>
        <li>
          <Image src="/140.webp" alt="Product Image" width={140} height={140} />
        </li>
        <li>
          <Image src="/140.webp" alt="Product Image" width={140} height={140} />
        </li>
      </ul>
    </div>
  );
}
