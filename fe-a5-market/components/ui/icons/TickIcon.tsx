import Image from "next/image";

export default function TickIcon() {
  return (
    <Image
      src="/tick.svg"
      alt="tick"
      width={16}
      height={16}
      className="invert"
    />
  );
}
