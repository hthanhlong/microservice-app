"use client";
import { Wrapper } from "@/components/ui";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
export default function Header() {
  return (
    <Wrapper className="mb-4">
      <Navbar fluid rounded className="bg-primary shadow-xl">
        <Link
          href="/"
          className="text-2xl font-bold text-textPrimary hover:text-textSecondary"
        >
          A5 Market
        </Link>
        <div className="flex md:order-2 items-center">
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" img="/140.webp" rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link href="/1/orders">Orders</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href="/2/settings">Settings</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
          <div className="h-8 w-[1px] bg-textPrimary mx-8"></div>
          <div className="flex items-center">
            <Link href="/cart">
              <ShoppingCartIcon className="w-8 h-8 text-textPrimary" />
            </Link>
          </div>
        </div>
      </Navbar>
    </Wrapper>
  );
}
