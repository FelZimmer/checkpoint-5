"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AgentList from "../components/AgentList";
import LoadingState from "../components/LoadingState";

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
  const [agentes, setAgentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [clicado, setClicado] = useState("");
  const tituloRef = useRef(null);

  useEffect(function () {
    if (tituloRef.current) {
      tituloRef.current.focus();
    }
  }, []);

  useEffect(function () {
    async function carregar() {
      try {
        const res = await axios.get(
          "https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=pt-BR"
        );
        const data = res.data.data;
        const lista = [];
        for (let i = 0; i < data.length; i++) {
          lista.push(data[i]);
        }
        setAgentes(lista);
        setLoading(false);
      } catch {
        setErro("nao deu pra carregar");
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

  return (
    <main>
      <h1 tabIndex={-1} ref={tituloRef}>
        lista
      </h1>
      <p>{total} na lista</p>
      {clicado ? <p>selecionado: {clicado}</p> : null}
      {loading ? <LoadingState mensagem="carregando..." /> : null}
      {erro ? <p>{erro}</p> : null}
      <AgentList lista={agentes} aoClicar={aoClicar} />
    </main>
  );
}
