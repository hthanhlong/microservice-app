"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { textInputTheme } from "@/common/styles";
// fields: name, email, password, phone, address

export default function SignUp() {
  return (
    <form className="flex w-80 flex-col gap-4 bg-primary rounded-lg p-4 shadow-2xl box-shadow-2xl shadow-gray-700">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-2xl font-bold text-white">Create an account</h1>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Your name" className="text-white" />
        </div>
        <TextInput
          id="name"
          type="text"
          placeholder="name"
          required
          theme={textInputTheme}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" className="text-white" />
        </div>
        <TextInput
          id="email"
          type="email"
          placeholder="email"
          required
          theme={textInputTheme}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password"
            value="Your password"
            className="text-white"
          />
        </div>
        <TextInput
          id="password"
          type="password"
          placeholder="password"
          required
          theme={textInputTheme}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="phone" value="Your phone" className="text-white" />
        </div>
        <TextInput
          id="phone"
          type="text"
          placeholder="phone"
          required
          theme={textInputTheme}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="address"
            value="Your address"
            className="text-white"
          />
        </div>
        <TextInput
          id="address"
          type="text"
          placeholder="address"
          required
          theme={textInputTheme}
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember" className="text-white">
          I agree to the terms and conditions
        </Label>
      </div>
      <Button type="submit" color="blue" size="sm">
        Submit
      </Button>
    </form>
  );
}
