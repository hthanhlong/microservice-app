"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { textInputTheme } from "@/common/styles";
import { FacebookIcon } from "@/components/ui/icons";
import { GoogleIcon } from "@/components/ui/icons";
import { AppleIcon } from "@/components/ui/icons";

export default function SignIn() {
  return (
    <form className="flex w-80 flex-col gap-4 bg-primary rounded-lg p-4 shadow-2xl box-shadow-2xl shadow-gray-700">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-2xl font-bold text-white">Welcome to A5 Market</h1>
        <h2 className="text-xs text-white">
          Don&apos;t have an account?{" "}
          <Link className="text-blue-500 hover:underline" href="/sign-up">
            Sign up
          </Link>
        </h2>
      </div>
      <div>
        <TextInput
          id="email1"
          type="email"
          placeholder="you@example.com"
          required
          theme={textInputTheme}
        />
      </div>
      <div>
        <TextInput
          id="password1"
          type="password"
          placeholder="At least 8 characters"
          required
          theme={textInputTheme}
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember" className="text-white">
          Remember me
        </Label>
      </div>
      <Button type="submit" color="blue" size="sm">
        Submit
      </Button>
      <div className="flex items-center gap-2">
        <div className="h-px w-full bg-gray-700"></div>
        <div className="text-xs text-gray-700">Or</div>
        <div className="h-px w-full bg-gray-700"></div>
      </div>
      {/* Social Login */}
      <div className="flex justify-center gap-2 w-full">
        <Button color="dark" className="w-full">
          <GoogleIcon />
        </Button>
        <Button color="dark" className="w-full">
          <FacebookIcon />
        </Button>
        <Button color="dark" className="w-full">
          <AppleIcon />
        </Button>
      </div>
    </form>
  );
}
