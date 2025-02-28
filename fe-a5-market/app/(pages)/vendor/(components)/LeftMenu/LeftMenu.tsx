"use client";

import MenuItem from "../MenuItem/MenuItem";
import { useState } from "react";
import { Modal, Button } from "flowbite-react";
import Link from "next/link";
export default function LeftMenu() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="w-64 min-h-screen bg-primary-500 shadow-xl mr-4">
      <div className="flex items-center gap-2 p-4 flex-col">
        <Link href="/vendor/dashboard">
          <h1 className="text-2xl font-bold text-textPrimary">A5 Market</h1>
        </Link>
        <h1 className="text-sm text-gray-500">Welcome back, John Doe</h1>
      </div>
      <div className="text-xs text-gray-500 p-4">Main menu</div>
      <div className="flex flex-col gap-4">
        <MenuItem href="/vendor/dashboard" text="Dashboard" />
        <MenuItem href="/vendor/products" text="Products" />
        <MenuItem href="/vendor/orders" text="Orders" />
        <MenuItem href="/vendor/customers" text="Customers" />
        <div className="text-xs text-gray-500 p-4">Other</div>
        <MenuItem href="/vendor/settings" text="Settings" />
      </div>
      <Button
        as="span"
        color="dark"
        onClick={() => setOpenModal(true)}
        className="mt-4 cursor-pointer hover:bg-gray-700 text-xs !bg-start-500 text-white rounded-md px-4 transition-all duration-300"
      >
        Logout
      </Button>
      <Modal size="sm" show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Do you want to logout?</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              This action will log you out of your account and you will need to
              login again to continue using the app.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="dark" onClick={() => setOpenModal(false)}>
            I accept
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
