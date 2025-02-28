import Image from "next/image";

export default function FacebookIcon() {
  return (
    <Image
      src="/icons8-facebook.svg"
      alt="facebook"
      width={16}
      height={16}
      className="hue-rotate-90 invert"
    />
  );
}
