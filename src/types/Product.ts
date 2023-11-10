import { Rubro } from "./Rubro";
import { StateType } from "./StateType";
import { DetailArtManufacturado } from "./DetailArtManufacturado";

export interface Product {
  id: number;
  denominacion: string;
  descripcion: string;
  precioVenta: number;
  estadoArticulo: StateType;
  rubro: Rubro;
  tiempoEstimadoCocina: number;
  precioCosto: number;
  receta: string;
  detallesArtManufacturado: DetailArtManufacturado[];
  url_Imagen: string;
}
