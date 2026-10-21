
import axios from "axios";
import Link from "next/link";
import { Suspense } from "react"; // segura a tela no "carregando..." até o agente chegar
import ErrorState from "../../../components/ErrorState";

// busca o agente do id que está na url
async function Conteudo({ params }) {
  // o pedaço depois de /details/
  const { id } = await params;

  // o agente, ou a frase se a busca falhar
  let agente = null;
  let erro = "";

  try {
    
    const res = await axios.get(
      "https://valorant-api.com/v1/agents/" + id + "?language=pt-BR"
    );
    // o agente vem dentro de res.data.data
    agente = res.data.data;
  } catch {
    // api falhou, essa frase fica embaixo do voltar
    erro = "Não deu para carregar o agente.";
  }

  // não achei o agente, só o voltar e o erro
  if (erro || !agente) {
    return (
      <main>
        <p>
          <Link href="/">voltar</Link>
        </p>
        <ErrorState mensagem={erro || "Agente não encontrado."} />
      </main>
    );
  }


  return (
    <main>
      <p>
        
        <Link href="/">voltar</Link>
      </p>
      <h1>{agente.displayName}</h1>
      {/* foto grande; se não tiver, uso o ícone */}
      <img
        className="retrato"
        src={agente.fullPortrait || agente.displayIcon}
        alt={agente.displayName}
      />
      {/* a função, quando a api manda */}
      <p>{agente.role ? agente.role.displayName : ""}</p>
      <p>{agente.description}</p>
    </main>
  );
}

// página do agente. enquanto eu busco, fica "carregando..."
export default function PaginaDetalhe({ params }) {
  return (
    <Suspense fallback={<p>carregando...</p>}>
      <Conteudo params={params} />
    </Suspense>
  );
}