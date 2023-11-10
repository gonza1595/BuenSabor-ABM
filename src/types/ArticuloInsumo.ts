import { Rubro } from "./Rubro";
import { StateType } from "./StateType";
import { UnidadMedida } from "./UnidadMedida";

export interface ArticuloInsumo {
  id: number;
  fechaAlta: string;
  fechaBaja: string;
  fechaModificacion: string;
  denominacion: string;
  descripcion: string;
  precioVenta: number;
  estadoArticulo: StateType;
  rubro: Rubro;
  precioCompra: number;
  stockActual: number;
  stockMinimo: number;
  unidadMedida: UnidadMedida;
  url_Imagen: string;
}
