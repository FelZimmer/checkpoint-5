// criamos este componente para cuidar da mensagem de erro e receber props e devolver JSX, sem hook nem evento
export default function ErrorState({ mensagem }) {
  return <p className="erro">{mensagem}</p>;
}