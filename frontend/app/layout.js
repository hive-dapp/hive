import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./connectKitProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hive",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
