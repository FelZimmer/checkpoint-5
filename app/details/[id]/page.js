
import axios from "axios";
import Link from "next/link";
import { Suspense } from "react"; // Suspense mostra um fallback enquanto o conteudo do async carrega
import ErrorState from "../../../components/ErrorState";

// o componente async que faz a busca ele recebe o params do Next que contem o id na url
async function Conteudo({ params }) {
  // No Next o params é uma Promise então precisa de await
  // Se a URL é /details/abc, então id = "abc"
  const { id } = await params;

  // variáveis que guardam o resultado da busca 
  let agente = null;
  let erro = "";

  try {
    
    const res = await axios.get(
      "https://valorant-api.com/v1/agents/" + id + "?language=pt-BR"
    );
    // No Valorant, os dados do item vem em res.data.data
    agente = res.data.data;
  } catch {
    // Se a requisição falhar guardamos a mensagem ai ela será exibida mais abaixo pelo ErrorState
    erro = "Não deu para carregar o agente.";
  }

  // Se deu erro ou o agente não veio vai mostrar só o botão de voltar e a mensagem de erro junto 
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
      {/* fullPortrait é a imagem grande e se não existir ele vai usar o icone pequeno */}
      <img
        className="retrato"
        src={agente.fullPortrait || agente.displayIcon}
        alt={agente.displayName}
      />
      {/* Ja que o role pode ser nulo em algumas vezes, então checamos antes de acessar displayName */}
      <p>{agente.role ? agente.role.displayName : ""}</p>
      <p>{agente.description}</p>
    </main>
  );
}

// é o que o Next usa como página da rota /details/[id]
// enquanto ele busca na api aparece "carregando..."
export default function PaginaDetalhe({ params }) {
  return (
    <Suspense fallback={<p>carregando...</p>}>
      <Conteudo params={params} />
    </Suspense>
  );
}