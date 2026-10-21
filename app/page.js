"use client"; 

import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AgentList from "../components/AgentList";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import SearchBar from "../components/SearchBar";

function ordenarPorNome(lista) {
  const copia = lista.slice();
  copia.sort(function (a, b) {
    if (a.displayName > b.displayName) {
      return 1;
    }
    if (a.displayName < b.displayName) {
      return -1;
    }
    return 0;
  });
  return copia;
}

export default function Home() {
  // lista que a api me devolveu
  const [agentes, setAgentes] = useState([]);
  // ainda to esperando a resposta
  const [loading, setLoading] = useState(true);
  // se a api falhar, a frase fica aqui
  const [erro, setErro] = useState("");
  // o que eu digitei na busca
  const [busca, setBusca] = useState("");
  // ultimo agente que eu cliquei
  const [clicado, setClicado] = useState("");

  // o input da busca, pra eu focar quando a home abre
  const buscaRef = useRef(null);

  // abri a home, foco a busca
  useEffect(function () {
    if (buscaRef.current) {
      buscaRef.current.focus();
    }
  }, []);

  // abri a home, puxo os agentes
  useEffect(function () {
    async function carregar() {
      try {
        const res = await axios.get(
          "https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=pt-BR"
        );
        // a lista vem dentro de res.data.data
        setAgentes(ordenarPorNome(res.data.data));
      } catch {
        // api falhou, mostro essa frase
        setErro("Não deu para carregar os agentes.");
      } finally {
        // acabou a espera, deu certo ou não
        setLoading(false);
      }
    }
    carregar();
  }, []);

  const total = useMemo(function () {
    return agentes.length;
  }, [agentes]);

  const aoClicar = useCallback(function (nome) {
    setClicado(nome);
  }, []);

  // cada letra que eu digito atualiza a busca
  const aoMudarBusca = useCallback(function (texto) {
    setBusca(texto);
  }, []);

  // filtro de novo só se a lista ou o texto da busca mudar
  const filtrados = useMemo(
    function () {
      const termo = busca.toLowerCase();
      return agentes.filter(function (agente) {
        return agente.displayName.toLowerCase().includes(termo);
      });
    },
    [agentes, busca]
  );

  return (
    <main>
      <h1>Agentes</h1>

      {/* campo de busca; o texto sobe pra cá */}
      <SearchBar valor={busca} aoMudar={aoMudarBusca} inputRef={buscaRef} />

      <p>{filtrados.length} na lista</p>

      {/* some quando a api responde */}
      {loading ? <LoadingState mensagem="carregando..." /> : null}
      {erro ? <ErrorState mensagem={erro} /> : null}

      {/* busquei e não achei nenhum nome */}
      {!loading && !erro && filtrados.length === 0 ? (
        <p>Nenhum agente encontrado.</p>
      ) : null}

      {clicado ? <p>selecionado: {clicado}</p> : null}
      <AgentList lista={filtrados} aoClicar={aoClicar} />
    </main>
  );
}
