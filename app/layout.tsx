import React from "react";
import { ConfigProvider } from "context/configProvider";

//TOOD(MW): Seems like this should be in page.js, but can't go there until it's converted to a server component.
export const metadata = {
  title: 'Natural Time',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider>{children}</ConfigProvider>
      </body>
    </html>
  )
}
