import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

export default function CityDropdown() {
  const locations = [
    { name: "Tallinn", url: "/tallinn" },
    { name: "Saaremaa", url: "/saaremaa" },
    { name: "Tartu", url: "/tartu" },
    { name: "Pärnu", url: "/parnu" },
    { name: "Närva", url: "/narva" },
    { name: "Jõhvi", url: "/johvi" },
    { name: "Viljandi", url: "/viljandi" },
  ];
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-3xl px-4 py-2 select-none">
          ≡
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          {locations.map((location) => (
            <DropdownMenuItem key={location.name} className="w-full">
              <div className="w-full">
                <Link
                  href={location.url}
                  className="text-lg px-4 py-2 w-full block bg-secondary select-none focus:outline-none">
                  {location.name}
                </Link>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
