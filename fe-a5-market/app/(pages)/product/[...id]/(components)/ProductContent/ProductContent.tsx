// "use client";

import { Button, Rating, RatingStar, TextInput } from "flowbite-react";
import { textInputTheme } from "@/common/styles";
export default function ProductContent() {
  return (
    <div className="shadow-xl">
      <h1 className="text-4xl font-bold text-textPrimary">
        Oh My Bod! Sunscreen Lotion
      </h1>
      <div className="flex items-center gap-2 my-4">
        <Rating>
          <RatingStar className="text-green-400" />
          <RatingStar className="text-green-400" />
          <RatingStar className="text-green-400" />
          <RatingStar className="text-green-400" />
          <RatingStar filled={false} />
        </Rating>
        <p className="text-sm text-gray-500">(100 reviews)</p>
      </div>
      <div className="text-textPrimary text-2xl font-bold flex items-center gap-2 my-4">
        $100{" "}
        <span className="text-textSecondary text-sm">
          <del>$120</del>
        </span>
      </div>
      <p className="text-sm text-gray-500">
        A reliable bodyguard for your skin, with secret uses, This lightweight,
        long lasting SPF50 sunscreen lotion will save you from the harshest
        midday sun, while also protecting dry skin, discoloured tattoos, darker
        scars, gel manicure UV exposures and more.
      </p>
      <div className="flex items-center gap-2">
        <TextInput
          type="number"
          className="w-16 my-4"
          defaultValue={1}
          max={10}
          min={1}
          theme={textInputTheme}
        />
        <Button color="dark">Add to Cart</Button>
      </div>
      <div className="flex gap-2 mt-4">
        <Button color="dark">Buy Now</Button>
      </div>
    </div>
  );
}
