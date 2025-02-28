import Image from "next/image";

export default function FilterIcon() {
  return (
    <Image
      src="/filter.svg"
      alt="filter"
      width={16}
      height={16}
      className="hue-rotate-90 invert"
    />
  );
}
