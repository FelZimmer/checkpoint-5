import AgentCard from "./AgentCard";

export default function AgentList({ lista, aoClicar }) {
  // cards que vão pra tela
  const cards = [];

  // um card pra cada agente
  for (let i = 0; i < lista.length; i++) {
    const item = lista[i];
    cards.push(
      <AgentCard
        // uuid, porque o nome pode repetir
        key={item.uuid}
        id={item.uuid}
        nome={item.displayName}
        icone={item.displayIcon}
        // o clique do card volta pra home
        aoClicar={aoClicar}
      />
    );
  }

  // a fileira de cards
  return <section className="lista">{cards}</section>;
}