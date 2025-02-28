import Image from "next/image";

export default function FastCart() {
  return (
    <Image
      src="/fast-cart.svg"
      alt="fast-cart"
      width={24}
      height={24}
      className="invert sepia saturate-[500%] hue-rotate-[200deg]"
    />
  );
}
