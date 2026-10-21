import { Suspense } from "react"; // segura a tela no "carregando..." até o agente chegar
import DetalheAgente from "../../../components/DetalheAgente";

// busca o id da url e passa pro componente que lê o salvo
async function Conteudo({ params }) {
  // o pedaço depois de /details/
  const { id } = await params;
  return <DetalheAgente id={id} />;
}

// página do agente. enquanto eu busco, fica "carregando..."
export default function PaginaDetalhe({ params }) {
  return (
    <Suspense fallback={<p>carregando...</p>}>
      <Conteudo params={params} />
    </Suspense>
  );
}
