import { FormMessage, Message } from "@/components/form-message";
import SignUpForm from "@/components/signup/SignUpForm";
import { createClient } from "@/utils/supabase/server";

export default async function Signup(props: {
  searchParams: Message;   // ❗️ FIX: remove Promise<>
}) {
  const searchParams = props.searchParams;

  // If form returned a message
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  // Data fetching
  let res;
  try {
    const supabase = await createClient();

    const { data: memberships, error: membershipFetchError } = await supabase
      .from("membership")
      .select("id, cinema_id, title");

    if (membershipFetchError) {
      console.error("Error fetching memberships:", membershipFetchError);
      return (
        <div className="p-4">
          <FormMessage message={{ message: "Error fetching memberships." }} />
        </div>
      );
    }

    const { data: cinemasFromDb, error: cinemaFetchError } = await supabase
      .from("cinema")
      .select("*");

    if (cinemaFetchError) {
      console.error("Error fetching cinemas:", cinemaFetchError);
      return (
        <div className="p-4">
          <FormMessage message={{ message: "Error fetching cinemas." }} />
        </div>
      );
    }

    // Create processed data
    const cinemas = cinemasFromDb.map((cinema) => ({
      ...cinema,
      isChecked: false,
    }));

    res = { cinemas, memberships };
  } catch (error) {
    console.error("Unexpected error:", error);
    return (
      <div className="p-4">
        <FormMessage message={{ message: "Unexpected server error." }} />
      </div>
    );
  }

  return (
    <>
      <SignUpForm cinemas={res.cinemas} memberships={res.memberships} />
      <FormMessage message={searchParams} />
    </>
  );
}
