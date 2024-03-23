import {ClerkProvider} from "@clerk/nextjs"
import { Inter } from "next/font/google"
import "../globals.css";
import { EdgeStoreProvider } from "@/lib/edgestore";
export const metadata ={
    title:"threds",
    description:"this nextjs 14 threds app"
}
const inter = Inter({subsets:["latin"]})

export default function RootLayout({
    children
}:{children:React.ReactNode})
{
    return (
        <ClerkProvider>
        <html lang="en">
          <body className={inter.className}>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
          </body>
        </html>
      </ClerkProvider>
    )
}