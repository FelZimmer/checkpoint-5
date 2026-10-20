// criamos este componente para cuidar da mensagem de erro e receber props e devolver JSX, sem hook nem evento.
// Prop "mensagem": texto do erro que o componente pai quer mostrar.
export default function ErrorState({ mensagem }) {
  return <p className="erro">{mensagem}</p>;
}