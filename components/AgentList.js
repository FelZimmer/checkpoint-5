import AgentCard from "./AgentCard";

export default function AgentList({ lista, aoClicar }) {
  const cards = [];
  for (let i = 0; i < lista.length; i++) {
    const item = lista[i];
    cards.push(
      <AgentCard
        key={item.uuid}
        id={item.uuid}
        nome={item.displayName}
        icone={item.displayIcon}
        aoClicar={aoClicar}
      />
    );
  }
  return <section className="lista">{cards}</section>;
}
