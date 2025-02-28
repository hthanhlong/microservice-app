import Image from "next/image";

export default function GoogleIcon() {
  return (
    <Image
      src="/icons8-google.svg"
      alt="google"
      width={16}
      height={16}
      className="hue-rotate-90 invert"
    />
  );
}
