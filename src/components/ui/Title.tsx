interface Props {
  titulo: string;
  subtitulo: string;
}

export const Title = ({ titulo, subtitulo }: Props) => {
  return (
    <div className="text-start">
      <h1 className="fs-1 ">{titulo}</h1>
      <h2 className="fs-5">{subtitulo}</h2>
    </div>
  );
};
