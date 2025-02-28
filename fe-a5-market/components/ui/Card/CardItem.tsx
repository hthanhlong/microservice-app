import { Button, Card, Rating, RatingStar } from "flowbite-react";
import { FastCart } from "@/components/ui/icons";

export default function CardItem() {
  return (
    <Card
      className="max-w-lg bg-primary border-none"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc="/140.webp"
    >
      <h2 className="text-sm text-textSecondary">
        Humanities & Social Sciences
      </h2>
      <h1 className="text-xl font-bold text-textPrimary">
        You Ain&apos;t Seen Nothin&apos; Yet
      </h1>
      <h2 className="text-sm text-textSecondary">Casey Cruickshank</h2>
      <div>
        <Rating>
          <RatingStar className="text-green-400" />
          <RatingStar className="text-green-400" />
          <RatingStar className="text-green-400" />
          <RatingStar className="text-green-400" />
          <RatingStar filled={false} />
        </Rating>
      </div>
      <div className="flex justify-between">
        <div className="text-textPrimary text-2xl font-bold flex items-center gap-2">
          $100{" "}
          <span className="text-textSecondary text-sm">
            <del>$120</del>
          </span>
          <FastCart />
        </div>
        <div>
          <Button>View Details</Button>
        </div>
      </div>
    </Card>
  );
}
