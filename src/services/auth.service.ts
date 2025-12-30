const API_BASE_URL = "https://dev.apinetbo.bekindnetwork.com/api";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<string> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Authentication/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Error al iniciar sesión");
      }

      const token = await response.text();
      
      // El token viene como string directamente en el body
      if (!token || token.trim() === "") {
        throw new Error("No se recibió un token válido");
      }

      return token.trim();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Error desconocido al iniciar sesión");
    }
  },
};

