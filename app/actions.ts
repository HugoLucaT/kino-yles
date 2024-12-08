"use server";
import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  IFormValidationData,
  IMembershipTier,
  ValidationResult,
} from "@/components/signup/signUp.types";

function validateFormData(data: IFormValidationData): ValidationResult {
  let errorMessages: string[] = [];

  if (data.password !== data.confirmPassword) {
    errorMessages.push("Paroolid ei kattu");
  }

  if (!data.email || !data.password) {
    errorMessages.push("Palun sisestage e-posti aadress ja parool");
  }

  if (!data.username) {
    errorMessages.push("Palun sisestage kastutajanimi");
  }

  if (!data.birthDateStr) {
    errorMessages.push("Palun sisestage sünniaeg");
  }

  if (!data.firstName || !data.lastName) {
    errorMessages.push("Palun sisestage ees- ja perekonnanimi");
  }

  // If there are any errors, the validations success is false
  // For parity, I've left the error type into formMessage type.
  if (errorMessages.length > 0) {
    if (errorMessages.length === 1) {
      return { success: false, error: errorMessages[0] };
    } else {
      return { success: false, multiError: errorMessages };
    }
  }

  // No errors, returns validation was successful.
  return { success: true };
}

export const signUpAction = async (formData: FormData) => {
  const membershipFormData = formData.get("selectedMemberships");

  const memberships = JSON.parse(
    membershipFormData as string,
  ) as IMembershipTier[];

  let membershipIDs: number[] = [];

  if (memberships) {
    memberships.forEach((membership) => {
      membershipIDs.push(membership.id);
    });

    if (membershipIDs.length === 0) {
      membershipIDs.push(999);
    }
  }

  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirm-password")?.toString();
  const birthDateStr = formData.get("date-input")?.toString();
  const username = formData.get("username")?.toString();
  const firstName = formData.get("first-name")?.toString();
  const lastName = formData.get("last-name")?.toString();

  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const validationData = {
    email,
    password,
    confirmPassword,
    birthDateStr,
    username,
    firstName,
    lastName,
  };

  const validationResult = validateFormData(validationData);

  if (!validationResult.success) {
    if ("error" in validationResult) {
      return encodedRedirect("error", "/sign-up", validationResult.error);
    } else if ("multiError" in validationResult) {
      const errorMsg = validationResult.multiError.join("|");
      return encodedRedirect("multiError", "/sign-up", errorMsg);
    }
  }

  try {
    const birthDate = birthDateStr ? new Date(birthDateStr) : null;

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email!,
      password: password!,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (signUpError) {
      console.error(signUpError);
      return {
        error: "Something went wrong while signing up, please try again.",
      };
    }

    // Additional user info
    if (data.user) {
      // Should be able to insert without memberships
      const { error: userAddError } = await supabase.rpc(
        "insert_user_data_with_membership",
        {
          auth_uuid: data.user.id,
          username,
          first_name: firstName,
          last_name: lastName,
          birth_date: birthDate,
          user_id: data.user.id,
          membership_ids: membershipIDs,
          bought_tickets: 0,
        },
      );
      if (userAddError) {
        console.error("Error inserting user data:", userAddError);
      }

      return encodedRedirect("success", "/sign-up", "Olete registreeritud!");
    } else {
      encodedRedirect(
        "error",
        "/sign-up",
        "Midagi läks katki, proovige uuesti.",
      );
      throw new Error("Something went wrong. Please try again.");
    }
  } catch (error: any) {
    console.error(error.code + " " + error.message);
    if (error.message == "NEXT_REDIRECT") {
      return encodedRedirect("success", "/sign-up", "Olete registreeritud!");
    }
    return encodedRedirect("error", "/sign-up", error.message);
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Epostiaadress on vajalik.",
    );
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
