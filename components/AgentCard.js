import Link from "next/link";

export default function AgentCard({ id, nome, icone, aoClicar }) {
  // nome que aparece no card
  const linhas = [nome];

  return (
    <article
      className="card"
      // cliquei no card, guardo o nome lá na home
      onClick={function () {
        aoClicar(nome);
      }}
    >
      {/* abre a página desse agente */}
      <Link href={"/details/" + id}>
        <img src={icone} alt={nome} />
        {/* nome em negrito */}
        {linhas.map(function (texto) {
          return <strong key={texto}>{texto}</strong>;
        })}
      </Link>
    </article>
  );
}