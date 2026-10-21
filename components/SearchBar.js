"use client"; 

// campo da busca. o texto mora na home e volta pra cá
export default function SearchBar({ valor, aoMudar, inputRef }) {
  return (
    <input
      ref={inputRef}
      type="text"
      className="busca"
      placeholder="Buscar agente..."
      value={valor}
      // cada tecla manda o texto novo pra home
      onChange={function (e) {
        aoMudar(e.target.value);
      }}
    />
  );
}