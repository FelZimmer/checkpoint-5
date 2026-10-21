import "./globals.css";
import SiteHeader from "../components/SiteHeader";

// título da aba do navegador
export const metadata = { title: "Agentes Valorant" };

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
