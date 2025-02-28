import Image from "next/image";

export default function SearchIcon() {
  return (
    <Image
      src="/search.svg"
      alt="search"
      width={16}
      height={16}
      className="invert"
    />
  );
}
