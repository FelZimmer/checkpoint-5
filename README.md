# Checkpoint #5 – Agentes Valorant

Aplicação feita em **Next.js** (App Router) para o Checkpoint #5 de Web Development. Ela lista os agentes jogáveis da [API do Valorant](https://valorant-api.com/) e permite abrir a página de detalhes de cada um.

🌐 **Deploy:** https://SEU-PROJETO.vercel.app

👥 **Integrantes:** veja o arquivo [`participantes.md`](./participantes.md)

---

## Funcionalidades

- **Home (`/`)**: lista os agentes buscados na API com `axios`, em ordem alfabética.
- **Busca por texto**: filtra a lista pelo nome do agente enquanto você digita.
- **Detalhes (`/details/[id]`)**: ao clicar em um card, navega para a página do agente, que busca os dados dele na API com `axios` (retrato, função e descrição).
- **Estados de loading e erro**: mensagem de carregamento enquanto a API responde e mensagem de erro se a requisição falhar.

## Tecnologias

- [Next.js](https://nextjs.org/) 16 (App Router)
- [React](https://react.dev/) 19
- [axios](https://axios-http.com/) para as requisições HTTP
- API pública: [valorant-api.com](https://valorant-api.com/) (não exige autenticação)

## Hooks utilizados

| Hook | Onde | Para quê |
| --- | --- | --- |
| `useState` | Home | Guardar a lista de agentes, o loading, o erro e o texto da busca |
| `useEffect` | Home | Buscar os agentes na API ao carregar a página e focar o campo de busca |
| `useMemo` | Home | Recalcular a lista filtrada só quando os agentes ou a busca mudam |
| `useCallback` | Home | Manter estável a referência das funções passadas por props |
| `useRef` | Home | Acessar o campo de busca para focá-lo |

## Estrutura do projeto

```
app/
  layout.js               → layout raiz (cabeçalho + conteúdo das páginas)
  page.js                 → home: lista e busca de agentes
  details/[id]/page.js    → página de detalhes do agente
components/
  SiteHeader.js           → cabeçalho do site
  SearchBar.js            → campo de busca (recebe valor e função por props)
  AgentList.js            → percorre a lista e renderiza os cards
  AgentCard.js            → card de um agente, com link para os detalhes
  LoadingState.js         → mensagem de carregamento
  ErrorState.js           → mensagem de erro
participantes.md          → integrantes do grupo
```

## Como rodar localmente

Pré-requisito: [Node.js](https://nodejs.org/) instalado.

```bash
# 1. clonar o repositório
git clone https://github.com/FelZimmer/checkpoint-5-webdev-1ESR.git
cd checkpoint-5-webdev-1ESR

# 2. instalar as dependências
npm install

# 3. iniciar o servidor de desenvolvimento
npm run dev
```

Depois abra [http://localhost:3000](http://localhost:3000) no navegador.

Para gerar a versão de produção:

```bash
npm run build
npm start
```

## Endpoints utilizados

- **Lista:** `GET https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=pt-BR`
- **Detalhe:** `GET https://valorant-api.com/v1/agents/{uuid}?language=pt-BR`
