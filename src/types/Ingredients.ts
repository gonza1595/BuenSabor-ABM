import { Rubro } from "./Rubro";
import { UnidadMedida } from "./UnidadMedida";

export interface Ingredients {
    id: number;
    fechaAlta: string;
    fechaBaja: string;
    fechaModificacion: string;
    denominacion: string;
    descripcion: string;
    precioVenta: number;
    estadoArticulo: string;
    rubro: Rubro;
    precioCompra: number;
    stockActual: number;
    stockMinimo: number;
    unidadMedida: UnidadMedida;
    url_Imagen: string;
}