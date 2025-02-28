import Link from "next/link";
import { usePathname } from "next/navigation";
export default function MenuItem({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <Link
      href={href}
      className={
        isActive(href)
          ? "!bg-gray-700 text-white p-2 rounded-md text-xs px-4 transition-all duration-300"
          : "text-xs !bg-start-500 text-white p-2 rounded-md px-4 transition-all duration-300"
      }
    >
      {text}
    </Link>
  );
}
