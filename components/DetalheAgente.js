"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import ErrorState from "./ErrorState";
import LoadingState from "./LoadingState";
import { acharAgenteSalvo, lerAgentesSalvos, salvarAgentes } from "../lib/agentesSalvos";

function guardarNaLista(agente) {
  const lista = lerAgentesSalvos();
  let achei = false;
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].uuid === agente.uuid) {
      lista[i] = agente;
      achei = true;
    }
  }
  if (!achei) {
    lista.push(agente);
  }
  salvarAgentes(lista);
}

export default function DetalheAgente({ id }) {
  // agente da url, da api ou do que eu tinha salvo
  const [agente, setAgente] = useState(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);

  // abri o detalhe: mostro o salvo e busco de novo
  useEffect(function () {
    if (!id) {
      return;
    }

    const salvo = acharAgenteSalvo(id);
    if (salvo) {
      setAgente(salvo);
      setLoading(false);
    }

    async function carregar() {
      try {
        const res = await axios.get(
          "https://valorant-api.com/v1/agents/" + id + "?language=pt-BR"
        );
        // o agente vem dentro de res.data.data
        const dados = res.data.data;
        setAgente(dados);
        setErro("");
        guardarNaLista(dados);
      } catch {
        // api falhou. se eu não tinha esse agente salvo, mostro o erro
        if (!salvo) {
          setErro("Não deu para carregar o agente.");
        }
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, [id]);

  if (loading && !agente) {
    return (
      <main>
        <p>
          <Link href="/">voltar</Link>
        </p>
        <LoadingState mensagem="carregando..." />
      </main>
    );
  }

  // não achei o agente, só o voltar e o erro
  if (erro || !agente) {
    return (
      <main>
        <p>
          <Link href="/">voltar</Link>
        </p>
        <ErrorState mensagem={erro || "Agente não encontrado."} />
      </main>
    );
  }

  return (
    <main>
      <p>
        <Link href="/">voltar</Link>
      </p>
      <h1>{agente.displayName}</h1>
      {/* foto grande; se não tiver, uso o ícone */}
      <img
        className="retrato"
        src={agente.fullPortrait || agente.displayIcon}
        alt={agente.displayName}
      />
      {/* a função, quando a api manda */}
      <p>{agente.role ? agente.role.displayName : ""}</p>
      <p>{agente.description}</p>
    </main>
  );
}
