"use client";
import { useContext, useState } from "react";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
} from "../ui/dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import {
  ICinemaState,
  IMembershipTier,
  IMembershipToParent,
} from "./signUp.types";

import MembershipTiersDropdown from "./MembershipTiersDropdown";
import { CinemaContext } from "./SignUpForm";

export default function MembershipDropdown({
  setParentMembership,
  setParentCinema,
}: IMembershipToParent) {
  const [isVisible, setIsVisible] = useState(false); // Hides the membership tiers
  const [cinemaState, setCinemaState] = useState<ICinemaState[]>([]); // Cinemas that have been selected
  const [membershipState, setMembershipState] = useState<IMembershipTier[]>([]); // For child component.
  const cinemas = useContext(CinemaContext); // All cinemas from database

  // This function saves the selected cinema id's
  const handleCheckedChange = (cinemaId: number, checked: boolean) => {
    if (checked) {
      const selectedCinemas = cinemas.find((cinema) => cinema.id === cinemaId);
      if (selectedCinemas) {
        setCinemaState((prevState) => [
          ...prevState,
          { ...selectedCinemas, isChecked: true },
        ]);
        setParentCinema((prev) => [...prev, selectedCinemas]);
        if (selectedCinemas.name !== "Thule") {
          setIsVisible(true);
        }
      }
    } else {
      setCinemaState((prevState) =>
        prevState.filter((cinema) => cinema.id !== cinemaId),
      );
      setParentCinema((prev) =>
        prev.filter((cinema) => cinema.id !== cinemaId),
      );

      if (cinemaState.length < 2) {
        setIsVisible(false);
      }
    }
  };

  const buttonText =
    cinemaState.length > 0
      ? cinemaState
          .map(
            (cinema) =>
              cinemas.find((cinemaItem) => cinemaItem.id === cinema.id)?.name,
          )
          .join(", ")
      : "Vali oma liikmelisus(ed)";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuLabel>Liikmesused</DropdownMenuLabel>
        <DropdownMenuTrigger>{buttonText}</DropdownMenuTrigger>
        <DropdownMenuContent>
          {cinemas.map((cinema) => (
            <DropdownMenuCheckboxItem
              key={cinema.id}
              id={cinema.id.toString()}
              checked={cinemaState.some(
                (cinemaStateC) => cinemaStateC.id === cinema.id,
              )}
              onCheckedChange={(checked) => {
                handleCheckedChange(cinema.id, checked);
              }}>
              {cinema.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <div style={{ visibility: isVisible ? "visible" : "hidden" }}>
        <MembershipTiersDropdown
          selectedCinemas={cinemaState}
          membershipState={membershipState}
          setMembershipState={setMembershipState}
          setParentMembership={setParentMembership}
        />
      </div>
    </>
  );
}
