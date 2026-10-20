import AgentCard from "./AgentCard";

export default function AgentList({ lista, aoClicar }) {
  // Array que vai acumular um AgentCard para cada agente
  const cards = [];

  // Percorre a lista e cria um card por agente
  for (let i = 0; i < lista.length; i++) {
    const item = lista[i];
    cards.push(
      <AgentCard
        // key utilizamos para ser o identificador unico que que o react exige em listas 
        key={item.uuid}
        id={item.uuid}
        nome={item.displayName}
        icone={item.displayIcon}
        // repassa a função recebida do pai para o filho
        aoClicar={aoClicar}
      />
    );
  }

  // Devolve a seção contendo todos os cards
  return <section className="lista">{cards}</section>;
}