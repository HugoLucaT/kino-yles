import { FormMessage, Message } from "@/components/form-message";
import SignUpForm from "@/components/signup/SignUpForm";
import { createClient } from "@/utils/supabase/server";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  let res;
  // Get the cinemas and memberships at the top of the component tree.
  try {
    const supabase = await createClient();
    const { data: memberships, error: membershipFetchError } = await supabase
      .from("membership")
      .select("id, cinema_id, title");

    if (membershipFetchError) {
      console.error("Error fetching memberships:", membershipFetchError);
      return [{ id: 10000000000, name: "Unexpected Errorino" }];
    }

    const { data: cinemasFromDb, error: cinemaFetchError } = await supabase
      .from("cinema")
      .select("*");

    if (cinemaFetchError) {
      console.error("Error fetching memberships:", cinemaFetchError);
      return [{ id: 10000000000, name: "Unexpected Errorino" }];
    }

    // Add the isChecked property to each cinema, for easier handling
    const cinemas = cinemasFromDb.map((cinema) => ({
      ...cinema,
      isChecked: false,
    }));

    res = { cinemas, memberships };
  } catch (error) {
    console.error("Unexpected error:", error);
    return [];
  }

  return (
    <>
      <SignUpForm cinemas={res.cinemas} memberships={res.memberships} />
      <FormMessage message={searchParams} />
    </>
  );
}
