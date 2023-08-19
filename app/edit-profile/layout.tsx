import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile - Codedamn",
  description: "Edit your CodeDamnn profile information and settings.",
  icons: "/assets/icons/logo.svg",
};

export default function EditProfileLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
