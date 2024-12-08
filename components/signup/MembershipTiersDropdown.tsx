import { useContext, useEffect } from "react";
import {
  MembershipTiersDropdownProps,
} from "./signUp.types";
import { MembershipContext } from "./SignUpForm";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
} from "../ui/dropdown-menu";

export default function MembershipTiersDropdown({
  selectedCinemas,
  membershipState,
  setMembershipState,
  setParentMembership,
}: MembershipTiersDropdownProps) {
  const memberships = useContext(MembershipContext);

  useEffect(() => {
    setParentMembership(membershipState);
  }, [membershipState, setParentMembership]);

  function handleRadioChange(membershipId: number, cinemaID: number) {
    const selectedMembership = memberships.find(
      (membership) => membership.id === membershipId,
    );

    if (selectedMembership) {
      setMembershipState((previous) => {
        const updatedState = previous.filter(
          (membership) => membership.cinema_id !== cinemaID,
        );

        const newState = [...updatedState, { ...selectedMembership }];

        return newState;
      });
    }
  }

  return (
    <>
      {selectedCinemas.map((cinema) => (
        <div key={cinema.id}>
          <DropdownMenu>
            {/* The dropdown menu for each cinemas tiers. Shows to the user, the selectedone */}
            {cinema.name !== "Thule" ? (
              <DropdownMenuTrigger>
                {cinema.name}
                {membershipState.find(
                  (membership) => membership.cinema_id === cinema.id,
                )?.title &&
                  " - " +
                    membershipState.find(
                      (membership) => membership.cinema_id === cinema.id,
                    )?.title}
              </DropdownMenuTrigger>
            ) : null}
            <DropdownMenuContent>
              {/* The dropdown menu for the user to check their membership tier */}
              <DropdownMenuRadioGroup>
                {memberships.map((membership) =>
                  membership.cinema_id === cinema.id ? (
                    <DropdownMenuRadioItem
                      key={membership.id}
                      id={membership.id.toString()}
                      value={JSON.stringify(membership.id)}
                      onClick={() =>
                        handleRadioChange(membership.id, membership.cinema_id)
                      }>
                      {membership.title}
                    </DropdownMenuRadioItem>
                  ) : null,
                )}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </>
  );
}
