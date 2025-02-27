import CardImage from "../CardImage/CardImage";

export default function CardMain() {
  return (
    <div className="flex flex-col gap-4 w-full bg-red-200 p-2">
      <CardImage />
      <div>cardtitle </div>
      <div>cardprice </div>
      <div>carddescription </div>
      <div>cardbutton </div>
    </div>
  );
}
