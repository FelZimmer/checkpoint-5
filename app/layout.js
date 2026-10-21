import "./globals.css";
import SiteHeader from "../components/SiteHeader";

// metadata é um nome reservado do next ele lê essa exportação sozinho.
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
