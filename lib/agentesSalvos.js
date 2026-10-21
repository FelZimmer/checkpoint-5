// lista que eu deixei salva neste navegador
const CHAVE = "agentes";

export function lerAgentesSalvos() {
  try {
    const texto = localStorage.getItem(CHAVE);
    if (!texto) {
      return [];
    }
    const lista = JSON.parse(texto);
    if (!Array.isArray(lista)) {
      return [];
    }
    return lista;
  } catch {
    return [];
  }
}

export function salvarAgentes(lista) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(lista));
  } catch {
    // o navegador bloqueou, a lista fica só na memória
  }
}

export function acharAgenteSalvo(id) {
  const lista = lerAgentesSalvos();
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].uuid === id) {
      return lista[i];
    }
  }
  return null;
}
