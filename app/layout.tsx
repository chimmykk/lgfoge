import './globals.css'
import 'react-tooltip/dist/react-tooltip.css';
import NeilBold from 'next/font/local'
import CollectorComic from 'next/font/local'
import { Inter } from "next/font/google"
import Providers from "./providers";
import { NavbarContainer } from './navbar/navbarContainer';

// Font files can be colocated inside of `pages`
const neil = NeilBold({ src: '../public/assets/NeilBold.otf', variable: "--font-neil" })
const collector = CollectorComic({ src: '../public/assets/CollectorComic.woff2', variable: "--font-collector" })

const inter = Inter({
  weight: '400',
  subsets: ['latin'],
  variable: "--font-inter" 
})
export const metadata = {
  title: 'DogeConnect',
  description: 'DogeConnect',
}

export default function RootLayout({children, }: {children: React.ReactNode}) {
  
  return (
    <html lang="en">
      <body className={`${neil.variable} ${collector.variable} ${inter.variable}`}>
            <Providers>
            <NavbarContainer />
                {children}
            </Providers>
      </body>
    </html>
  )
}