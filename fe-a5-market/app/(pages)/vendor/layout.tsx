import { Wrapper } from "@/components/ui";
import LeftMenu from "./(components)/LeftMenu/LeftMenu";

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Wrapper>
      <div className="flex">
        <LeftMenu />
        {children}
      </div>
    </Wrapper>
  );
}
