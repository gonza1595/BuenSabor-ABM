import { StateType } from "./StateType";
import { RubroType } from "./RubroType";

export interface Rubro {
  id: number;
  fechaAlta: string;
  fechaBaja: string;
  fechaModificacion: string;
  denominacion: string;
  estadoRubro: StateType;
  tipoRubro: RubroType;
}
