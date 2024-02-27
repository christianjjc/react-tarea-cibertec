import clsx from "clsx";
import { FieldError } from "react-hook-form";

interface Props {
  atributo: string;
  error: FieldError | undefined;
  minimo?: number;
}

export const ErrorMensaje = ({ atributo, error, minimo = 0 }: Props) => {
  return (
    <span
      className={clsx("text-danger", {
        "d-none": !error,
      })}>
      {`${atributo} es un campo requerido.${minimo > 0 ? ` El valor mínimo es: ${minimo}` : ""}`}
    </span>
  );
};
