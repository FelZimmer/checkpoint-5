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
  // ele esta guardando a lista de agentes que vem da api
  const [agentes, setAgentes] = useState([]);
  // Para fazer o controle se a requisição ainda está em andamento
  const [loading, setLoading] = useState(true);
  // guarda a mensagem de erro 
  const [erro, setErro] = useState("");
  // serve para guardar o texto digitado na busca
  const [busca, setBusca] = useState("");
  // guarda o nome do último agente clicado
  const [clicado, setClicado] = useState("");

  // referência direta pro input da busca para focar nele 
  const buscaRef = useRef(null);

  // useEffect com [] roda uma vez, ai ela foca o campo de busca
  useEffect(function () {
    if (buscaRef.current) {
      buscaRef.current.focus();
    }
  }, []);

// useEffect com [] roda uma vez quando nos montamos a busca dos agentes na API com o axios
  useEffect(function () {
    async function carregar() {
      try {
        const res = await axios.get(
          "https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=pt-BR"
        );
        // no Valorant a lista vem em res.data.data
        setAgentes(ordenarPorNome(res.data.data));
      } catch {
        // se a requisição falhar, entao guardamos a mensagem para exibir na tela
        setErro("Não deu para carregar os agentes.");
      } finally {
        // finally roda com sucesso ou erro em qualquer dos casos o loading acaba
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

    // useCallback eh ele que guarda a função entre renderizações assim mantendo a mesma referência
  // atualiza o estado busca e é passada por prop ao SearchBar
  const aoMudarBusca = useCallback(function (texto) {
    setBusca(texto);
  }, []);



  // com o useMemo ele só recalcula a lista filtrada quando agentes ou busca mudam assim evitando refazer o filtro em renderizações que não têm a ver com isso
  // 
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

      {/* a busca mora aqui na home e desce por props */}
      <SearchBar valor={busca} aoMudar={aoMudarBusca} inputRef={buscaRef} />

      <p>{filtrados.length} na lista</p>

      {/* só aparece se condição for verdadeira */}
      {loading ? <LoadingState mensagem="carregando..." /> : null}
      {erro ? <ErrorState mensagem={erro} /> : null}

      {/* Eh mensagem para quando a busca não encontra nada */}
      {!loading && !erro && filtrados.length === 0 ? (
        <p>Nenhum agente encontrado.</p>
      ) : null}

      {clicado ? <p>selecionado: {clicado}</p> : null}
      <AgentList lista={filtrados} aoClicar={aoClicar} />
    </main>
  );
}
