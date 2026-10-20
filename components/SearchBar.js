"use client"; 

// Criamos um Input controlado para a barra de busca dos itens. 
// Props:
// valor: texto atual da busca que vem do useState da home
// aoMudar: função da home que atualiza o estado a cada digitação
// inputRef: ref criado na home com useRef, para ela conseguir focar o campo
export default function SearchBar({ valor, aoMudar, inputRef }) {
  return (
    <input
      ref={inputRef}
      type="text"
      className="busca"
      placeholder="Buscar agente..."
      value={valor}
      // a cada tecla, o filho avisa o pai chamando a função recebida por prop
      onChange={function (e) {
        aoMudar(e.target.value);
      }}
    />
  );
}