import { Ingredients } from "../types/Ingredients";

const BASE_URL = "http://localhost:8080/api/v1/articulos";

export const IngredientsServices = {
  getIngredients: async (): Promise<Ingredients[]> => {
    const response = await fetch(`${BASE_URL}/insumos`);
    const data = response.json();

    return data;
  },
};
