import Image from "next/image";
import { redirect } from "next/navigation";
import { isAdminConfigured, missingAdminSettings } from "../../../lib/admin/firebase";
import { currentAdmin } from "../../../lib/admin/session";
import { Setup } from "../_components/Setup";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Sign in" };
export const dynamic = "force-dynamic";

export default async function AdminLogin() {
  if (!isAdminConfigured()) return <Setup missing={missingAdminSettings()} />;
  if (await currentAdmin()) redirect("/admin");
  return (
    <div className="a-auth">
      <div className="a-auth__photo" aria-hidden="true" />
      <div className="a-auth__panel">
        <div className="a-auth__box">
          <Image src="/assets/footer logo.png" alt="Bait Al Ebdaa" width={2170} height={725} sizes="200px" priority />
          <h1>Admin sign in</h1>
          <p>For the Bait Al Ebdaa team. Use the email and password of your Firebase admin account.</p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
