"use client";
import { TextInput, Dropdown, Button } from "flowbite-react";
import { SearchIcon, FilterIcon, TickIcon } from "@/components/ui/icons";

export default function SearchOrder() {
  return (
    <div className="flex justify-between items-center py-4">
      <div>
        <form>
          <TextInput
            placeholder="Search"
            icon={SearchIcon}
            sizing="sm"
            theme={{
              field: {
                input: {
                  base: "w-80 text-textPrimary border-none focus:!border-none focus:!ring-0 focus:!outline-none",
                  colors: {
                    gray: "bg-gray-800",
                  },
                },
              },
            }}
          />
        </form>
      </div>
      <Dropdown
        label="Filter"
        className="border-none"
        dismissOnClick={false}
        theme={{
          content: "bg-primary shadow-xl",
        }}
        renderTrigger={() => (
          <Button
            as="span"
            size="sm"
            color="dark"
            className="cursor-pointer hover:bg-slate-700"
          >
            <FilterIcon />{" "}
            <span className="text-textSecondary text-sm ml-2">Filter</span>
          </Button>
        )}
      >
        <Dropdown.Item className="hover:!bg-slate-700 hover:text-white">
          {true ? <TickIcon /> : <div className="w-4 h-4" />}
          <span className="text-textPrimary text-sm ml-2">All</span>
        </Dropdown.Item>
        <Dropdown.Item className="hover:!bg-slate-700 hover:text-white">
          {false ? <TickIcon /> : <div className="w-4 h-4" />}
          <span className="text-textPrimary text-sm ml-2">Pending</span>
        </Dropdown.Item>
        <Dropdown.Item className="hover:!bg-slate-700 hover:text-white">
          {false ? <TickIcon /> : <div className="w-4 h-4" />}
          <span className="text-textPrimary text-sm ml-2">Processing</span>
        </Dropdown.Item>
        <Dropdown.Item className="hover:!bg-slate-700 hover:text-white">
          {false ? <TickIcon /> : <div className="w-4 h-4" />}
          <span className="text-textPrimary text-sm ml-2">Completed</span>
        </Dropdown.Item>
        <Dropdown.Item className="hover:!bg-slate-700 hover:text-white">
          {false ? <TickIcon /> : <div className="w-4 h-4" />}
          <span className="text-textPrimary text-sm ml-2">Cancelled</span>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
}
