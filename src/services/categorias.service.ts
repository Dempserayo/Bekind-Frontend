// Helper para obtener el token del localStorage
const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    // Limpiar el token de espacios y caracteres especiales si es necesario
    return token ? token.trim() : null;
  }
  return null;
};

// Interfaz para la respuesta de la API
export interface ApiCategoriaResponse {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  iconUrl?: string;
  color?: string;
  isActive: boolean;
  createdAt?: string;
  createdDate?: string;
  // Agregar otros campos que pueda devolver la API
  [key: string]: any;
}

export interface ApiCategoriasListResponse {
  data?: ApiCategoriaResponse[];
  items?: ApiCategoriaResponse[];
  results?: ApiCategoriaResponse[];
  // La API puede devolver los datos en diferentes propiedades
  [key: string]: any;
}

export interface CreateCategoriaPayload {
  name: string;
  description?: string;
  color?: string;
  isActive?: boolean;
  status?: number; // Campo requerido por el backend (1 = activo, 0 = inactivo)
  icon?: File | null;
}

const API_BASE_URL = "https://dev.api.bekindnetwork.com/api/v1";
// Usar API route de Next.js como proxy para evitar problemas de CORS
const USE_PROXY = true;
const PROXY_URL = "/api/categorias";

export const categoriasService = {
  getCategorias: async (
    pageNumber: number = 1,
    pageSize: number = 10
  ): Promise<ApiCategoriaResponse[]> => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error("No hay token de autenticación disponible. Por favor, inicia sesión.");
      }

      // Usar proxy si está habilitado, sino usar la URL directa
      const url = USE_PROXY 
        ? `${PROXY_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`
        : `${API_BASE_URL}/actions/admin-list?pageNumber=${pageNumber}&pageSize=${pageSize}`;
      
      console.log("Fetching categorias from:", url);
      console.log("Token available:", token ? "Yes" : "No");
      console.log("Token length:", token?.length || 0);
      console.log("Token preview:", token ? `${token.substring(0, 20)}...` : "No token");

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // Agregar credentials para manejar CORS si es necesario
        mode: USE_PROXY ? "same-origin" : "cors",
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("No autorizado. Por favor, inicia sesión nuevamente.");
        }
        if (response.status === 0) {
          throw new Error("Error de conexión. Verifica tu conexión a internet o si la API está disponible.");
        }
        let errorData;
        try {
          errorData = await response.text();
        } catch {
          errorData = `Error ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorData || `Error al obtener las categorías (${response.status})`);
      }

      const data: ApiCategoriasListResponse = await response.json();
      console.log("API Response:", data);
      
      // La API puede devolver los datos en diferentes propiedades
      // Intentamos encontrar los datos en las propiedades más comunes
      const categorias = data.data || data.items || data.results || data || [];
      
      if (!Array.isArray(categorias)) {
        // Si la respuesta es un objeto pero no un array, intentar extraer el array
        if (typeof categorias === 'object' && categorias !== null) {
          const possibleArray = Object.values(categorias).find(val => Array.isArray(val));
          if (possibleArray) {
            return possibleArray as ApiCategoriaResponse[];
          }
        }
        throw new Error("Formato de respuesta inválido. La API no devolvió un array de categorías.");
      }

      return categorias;
    } catch (error) {
      console.error("Error en getCategorias:", error);
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("Error de conexión. No se pudo conectar con el servidor. Verifica tu conexión a internet.");
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Error desconocido al obtener las categorías");
    }
  },

  createCategoria: async (
    payload: CreateCategoriaPayload
  ): Promise<ApiCategoriaResponse> => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error("No hay token de autenticación disponible. Por favor, inicia sesión.");
      }

      // Usar proxy si está habilitado, sino usar la URL directa
      const url = USE_PROXY 
        ? `${PROXY_URL}`
        : `${API_BASE_URL}/actions/admin-add`;

      console.log("Creating categoria at:", url);

      // Si hay un archivo, usar FormData, sino usar JSON
      let body: FormData | string;
      let headers: HeadersInit;

      // Mapear isActive a status (1 = activo, 0 = inactivo)
      const status = payload.status !== undefined 
        ? payload.status 
        : (payload.isActive !== undefined ? (payload.isActive ? 1 : 0) : 1);

      if (payload.icon) {
        // Crear FormData para enviar archivo
        const formData = new FormData();
        formData.append("name", payload.name);
        if (payload.description) {
          formData.append("description", payload.description);
        }
        if (payload.color) {
          formData.append("color", payload.color);
        }
        // El backend requiere status como Integer, no isActive
        formData.append("status", status.toString());
        formData.append("icon", payload.icon);
        
        body = formData;
        // No establecer Content-Type cuando se usa FormData, el navegador lo hace automáticamente
        headers = {
          Authorization: `Bearer ${token}`,
        };
      } else {
        // Usar JSON si no hay archivo
        body = JSON.stringify({
          name: payload.name,
          description: payload.description || "",
          color: payload.color || "#000000",
          status: status, // Campo requerido por el backend
        });
        headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
      }

      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
        mode: USE_PROXY ? "same-origin" : "cors",
      });

      console.log("Create response status:", response.status);
      console.log("Create response ok:", response.ok);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("No autorizado. Por favor, inicia sesión nuevamente.");
        }
        if (response.status === 400) {
          const errorData = await response.json().catch(() => ({ message: "Datos inválidos" }));
          throw new Error(errorData.message || errorData.error || "Datos inválidos. Verifica los campos requeridos.");
        }
        if (response.status === 0) {
          throw new Error("Error de conexión. Verifica tu conexión a internet o si la API está disponible.");
        }
        let errorData;
        try {
          const errorText = await response.text();
          try {
            errorData = JSON.parse(errorText);
          } catch {
            errorData = errorText;
          }
        } catch {
          errorData = `Error ${response.status}: ${response.statusText}`;
        }
        throw new Error(
          typeof errorData === 'string' 
            ? errorData 
            : errorData.message || errorData.error || `Error al crear la categoría (${response.status})`
        );
      }

      const data: ApiCategoriaResponse = await response.json();
      console.log("Create API Response:", data);
      
      return data;
    } catch (error) {
      console.error("Error en createCategoria:", error);
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("Error de conexión. No se pudo conectar con el servidor. Verifica tu conexión a internet.");
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Error desconocido al crear la categoría");
    }
  },
};

