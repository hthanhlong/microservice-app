import Image from "next/image";

export default function AppleIcon() {
  return (
    <Image
      src="/icons8-apple.svg"
      alt="apple"
      width={16}
      height={16}
      className="hue-rotate-90 invert"
    />
  );
}
