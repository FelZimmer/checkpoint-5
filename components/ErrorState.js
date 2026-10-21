// a frase de erro que a home ou o detalhe me mandou
export default function ErrorState({ mensagem }) {
  return <p className="erro">{mensagem}</p>;
}