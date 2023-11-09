import { Rubro } from "../types/Rubro";

const BASE_URL = "http://localhost:8080/api/v1";

export const RubroServices = {
  getRubros: async (): Promise<Rubro[]> => {
    const response = await fetch(`${BASE_URL}/rubros`);
    const data = await response.json();

    return data;
  },
};
