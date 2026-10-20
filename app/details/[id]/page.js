import axios from "axios";
import Link from "next/link";
import { Suspense } from "react";

async function Conteudo({ params }) {
  const { id } = await params;
  let agente = null;
  let erro = "";

  try {
    const res = await axios.get(
      "https://valorant-api.com/v1/agents/" + id + "?language=pt-BR"
    );
    agente = res.data.data;
  } catch {
    erro = "nao deu pra carregar";
  }

  if (erro || !agente) {
    return (
      <main>
        <p>
          <Link href="/">voltar</Link>
        </p>
        <p>{erro || "nao achei"}</p>
      </main>
    );
  }

  return (
    <main>
      <p>
        <Link href="/">voltar</Link>
      </p>
      <h1>{agente.displayName}</h1>
      <img
        className="retrato"
        src={agente.fullPortrait || agente.displayIcon}
        alt={agente.displayName}
      />
      <p>{agente.role ? agente.role.displayName : ""}</p>
      <p>{agente.description}</p>
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
