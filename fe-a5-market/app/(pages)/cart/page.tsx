import { Alert } from "flowbite-react";

export default function Cart() {
  return (
    <div>
      <Alert color="info">
        <span className="font-medium">Your shopping cart is empty.</span>
      </Alert>
    </div>
  );
}
