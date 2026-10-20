import Link from "next/link";

export default function AgentCard({ id, nome, icone, aoClicar }) {
  // array com o nome 
  const linhas = [nome];

  return (
    <article
      className="card"
      // quando clicar no card nos chamamos a função do pai passando o nome do agente
      onClick={function () {
        aoClicar(nome);
      }}
    >
      {/* Link navega para /details/<uuid>, abrindo a página de detalhes */}
      <Link href={"/details/" + id}>
        <img src={icone} alt={nome} />
        {/* map percorre o array e cria um strong para cada texto */}
        {linhas.map(function (texto) {
          return <strong key={texto}>{texto}</strong>;
        })}
      </Link>
    </article>
  );
}