import { ArticuloInsumo } from "../types/ArticuloInsumo";

const BASE_URL = "http://localhost:8080/api/v1/articulos";

export const ArticuloInsumosServices = {
  getArticuloInsumo: async (): Promise<ArticuloInsumo[]> => {
    const response = await fetch(`${BASE_URL}/insumos`);
    const data = response.json();

    return data;
  },
};
