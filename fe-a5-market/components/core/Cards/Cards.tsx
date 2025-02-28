import { CardItem, Wrapper } from "@/components/ui";

export default function Cards() {
  return (
    <Wrapper>
      <div className="grid grid-cols-3 gap-12 gap-y-10">
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
      </div>
    </Wrapper>
  );
}
