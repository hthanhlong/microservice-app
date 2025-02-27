import { CardMain, Wrapper } from "@/components/ui";

export default function Cards() {
  return (
    <Wrapper>
      <div className="grid grid-cols-3 gap-4 gap-y-10">
        <CardMain />
        <CardMain />
        <CardMain />
        <CardMain />
        <CardMain />
        <CardMain />
      </div>
    </Wrapper>
  );
}
