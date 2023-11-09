import { Rubro } from "./Rubro";
import { DetailArtManufacturado } from "./DetailArtManufacturado";

export interface Product {
    id: number;
    fechaAlta: string;
    fechaBaja: string;
    fechaModificacion: string;
    denominacion: string;
    descripcion: string;
    precioVenta: number;
    estadoArticulo: string;
    rubro: Rubro;
    tiempoEstimadoCocina: number;
    precioCosto: number;
    receta: string;
    detallesArtManufacturado: DetailArtManufacturado;
    url_Imagen: string;
  }
  