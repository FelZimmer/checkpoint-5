import "./globals.css";
import SiteHeader from "../components/SiteHeader";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
