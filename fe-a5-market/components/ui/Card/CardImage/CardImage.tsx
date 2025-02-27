import Image from "next/image";

export default function CardImage() {
  return (
    <div className="flex justify-center items-center">
      <Image src="/140.webp" alt="Card Image" width={384} height={140} />
    </div>
  );
}
