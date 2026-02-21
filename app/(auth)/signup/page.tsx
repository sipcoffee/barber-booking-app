import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign Up - TRIM Admin",
  description: "Create an admin account for TRIM",
};

export default function SignupPage() {
  // Signup is disabled - redirect to login
  redirect("/login");
}
