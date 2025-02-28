"use client";
import { Wrapper } from "@/components/ui";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Link from "next/link";
export default function Header() {
  return (
    <Wrapper>
      <Navbar fluid rounded className="bg-primary shadow-xl">
        <Link
          href="/"
          className="text-2xl font-bold text-textPrimary hover:text-textSecondary"
        >
          A5 Market
        </Link>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" img="/140.webp" rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      </Navbar>
    </Wrapper>
  );
}
