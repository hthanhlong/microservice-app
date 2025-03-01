import { Wrapper } from "@/components/ui";
import { Alert } from "flowbite-react";
import Link from "next/link";
export default function Cart() {
  return (
    <Wrapper>
      <Alert color="info">
        <span className="font-medium">
          Your Cart is empty Your shopping cart lives to serve. Give it purpose
          – fill it with groceries, clothing, household supplies, electronics
          and more. <br /> Continue shopping on the{" "}
          <Link className="text-blue-500 hover:underline" href="/">
            A5 Market
          </Link>{" "}
          homepage, learn about today&apos;s deals, or visit your Wish List.
        </span>
      </Alert>
    </Wrapper>
  );
}
