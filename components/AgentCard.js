export default function AgentCard({ nome, icone, aoClicar }) {
  const linhas = [nome];
  return (
    <article
      className="card"
      onClick={function () {
        aoClicar(nome);
      }}
    >
      <img src={icone} alt={nome} />
      {linhas.map(function (texto) {
        return <strong key={texto}>{texto}</strong>;
      })}
    </article>
  );
}
