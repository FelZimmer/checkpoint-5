import Link from "next/link";
import { Suspense } from "react";

async function Conteudo({ params }) {
  const { id } = await params;
  return (
    <main>
      <p>
        <Link href="/">voltar</Link>
      </p>
      <h1>detalhe</h1>
      <p>{id}</p>
    </main>
  );
}

export default function PaginaDetalhe({ params }) {
  return (
    <Suspense fallback={<p>carregando...</p>}>
      <Conteudo params={params} />
    </Suspense>
  );
}
