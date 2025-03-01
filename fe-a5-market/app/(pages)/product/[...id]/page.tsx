import ProductContent from "./(components)/ProductContent/ProductContent";
import ProductImages from "./(components)/Images/ProductImages";
import { Wrapper } from "@/components/ui";

export default function ProductPage() {
  return (
    <Wrapper>
      <div className="flex gap-4">
        <ProductImages />
        <ProductContent />
      </div>
    </Wrapper>
  );
}
