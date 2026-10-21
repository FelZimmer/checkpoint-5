// quem decide quando ele aparece é a home com renderização condicional 
export default function LoadingState({ mensagem }) {
  return <p className="loading">{mensagem}</p>;
}