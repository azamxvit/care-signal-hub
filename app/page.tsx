import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const { data: userData, error: dbError } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = userData?.role;

  if (role === "doctor" || role === "nurse") {
    redirect("/dashboard");
  } else if (role === "patient") {
    redirect("/home");
  } else {
    redirect("/login");
  }
}