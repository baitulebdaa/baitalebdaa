import Image from "next/image";

// Shown instead of the panel until its settings are in Vercel. Names the missing ones.
export function Setup({ missing }) {
  return (
    <div className="a-auth">
      <div className="a-auth__photo" aria-hidden="true" />
      <div className="a-auth__panel">
        <div className="a-auth__box a-setup">
          <Image src="/assets/footer logo.png" alt="Bait Al Ebdaa" width={2170} height={725} sizes="200px" priority />
          <h1>Admin panel setup</h1>
          <p>
            The panel reads leads from Firebase (project <code>baitalebdaa</code>). Add these in Vercel → Project →
            Settings → Environment Variables, then redeploy:
          </p>
          <ol>
            {missing.includes("FIREBASE_SERVICE_ACCOUNT") && (
              <li>
                <code>FIREBASE_SERVICE_ACCOUNT</code>: Firebase console → Project settings → Service accounts → Generate
                new private key. Paste the whole JSON file.
              </li>
            )}
            {missing.includes("FIREBASE_WEB_API_KEY") && (
              <li>
                <code>FIREBASE_WEB_API_KEY</code>: Firebase console → Project settings → General → Web API Key.
              </li>
            )}
            {missing.includes("ADMIN_EMAILS") && (
              <li>
                <code>ADMIN_EMAILS</code>: the emails allowed in, separated by commas. Each needs an Email/Password
                account in Firebase → Authentication → Users.
              </li>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}
