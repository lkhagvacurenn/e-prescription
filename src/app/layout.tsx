import type { Metadata } from "next";
import 'antd/dist/reset.css';
import { ConfigProvider, theme as antdTheme } from "antd";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Цахим эмийн жор систем",
  description: "Монголын цахим жорын бүртгэлийн систем",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConfigProvider
        theme={{
          algorithm: antdTheme.darkAlgorithm,
          token: {
            colorPrimary: '#6c5ce7', // your accent color
            colorPrimaryBg: '#6c5ce7',  
            colorText: '#f5f5f7',     // text color   // background color
            colorBorder: '#ffffff', 
            colorTextPlaceholder: '#adacbd', // placeholder color      
            colorBgContainer: '#2a2a33',
            colorBgBase: '#2a2a33', // background color for base components
          },
          components: {
            Button: {
              colorPrimary: '#6c5ce7',         // normal primary color
              colorPrimaryHover: '#7d6ef0',
              colorPrimaryActive: '#5546d3',
              colorBgContainerDisabled: '#726ca1', // ✅ your desired background color (green)
            },
          },
        }}
        >
            {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
