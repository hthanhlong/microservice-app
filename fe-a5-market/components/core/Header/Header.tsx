import Wrapper from "@/components/ui/Wrapper/Wrapper";
import Link from "next/link";
export default function Header() {
  return (
    <Wrapper>
      <header className="flex items-center justify-between bg-red-300">
        <div className="flex items-center gap-4 justify-between w-full p-2">
          <Link href="/">A5 Market</Link>
          <Link href="/">carts</Link>
        </div>
      </header>
    </Wrapper>
  );
}
