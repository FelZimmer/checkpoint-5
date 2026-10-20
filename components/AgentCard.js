"use client"
import Link from "next/link";

export default function AgentCard({ id, nome, icone, aoClicar }) {
  const linhas = [nome];
  return (
    <article
      className="card"
      onClick={function () {
        aoClicar(nome);
      }}
    >
      <Link href={"/details/" + id}>
        <img src={icone} alt={nome} />
        {linhas.map(function (texto) {
          return <strong key={texto}>{texto}</strong>;
        })}
      </Link>
    </article>
  );
}
