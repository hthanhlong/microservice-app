import { textInputTheme } from "@/common/styles";
import { Avatar, Button, TextInput } from "flowbite-react";

export default function VendorSettings() {
  return (
    <div className="flex-1 p-4 shadow-xl">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-2xl font-bold text-textPrimary">Settings</h1>
        <h1 className="text-sm text-gray-500">
          Manage your account and preferences
        </h1>
      </div>
      <div className="my-8 flex items-center gap-4">
        <Avatar img="/140.webp" rounded size="lg" />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-textPrimary">John Doe</h1>
          <h1 className="text-sm text-gray-500">john.doe@example.com</h1>
        </div>
      </div>
      <form className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm text-gray-500">
            Name
          </label>
          <TextInput
            theme={textInputTheme}
            type="text"
            id="name"
            className="input"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm text-gray-500">
            Email
          </label>
          <TextInput
            theme={textInputTheme}
            type="email"
            id="email"
            className="input"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm text-gray-500">
            Password
          </label>
          <TextInput
            theme={textInputTheme}
            type="password"
            id="password"
            className="input"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm text-gray-500">
            Phone
          </label>
          <TextInput
            theme={textInputTheme}
            type="text"
            id="phone"
            className="input"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="address" className="text-sm text-gray-500">
            Address
          </label>
          <TextInput
            theme={textInputTheme}
            type="text"
            id="address"
            className="input"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="city" className="text-sm text-gray-500">
            City
          </label>
          <TextInput
            theme={textInputTheme}
            type="text"
            id="city"
            className="input"
          />
        </div>
        <div className="col-span-2 flex justify-end">
          <Button color="dark">Save</Button>
        </div>
      </form>
    </div>
  );
}
