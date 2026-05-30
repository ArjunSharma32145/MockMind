import {DM_Sans, Lora} from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Header from "@/components/Header";
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",

})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
})


export const metadata = {
  title: "pipo",
  description: "made by arjun sharma",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      theme:dark
    }}>
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${lora.variable} ${dmSans.variable} font-sans`}
    >
       <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Toaster richColors/>
      </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
