import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "https://dev.api.bekindnetwork.com/api/v1";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const pageNumber = searchParams.get("pageNumber") || "1";
    const pageSize = searchParams.get("pageSize") || "10";
    
    // Obtener el token del header Authorization
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "No se proporcionó un token de autenticación" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");

    const url = `${API_BASE_URL}/actions/admin-list?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    console.log("Proxying request to:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", response.status, errorText);
      return NextResponse.json(
        { error: errorText || `Error ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Obtener el token del header Authorization
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "No se proporcionó un token de autenticación" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");

    const url = `${API_BASE_URL}/actions/admin-add`;

    console.log("Proxying POST request to:", url);

    // Verificar si el request tiene Content-Type multipart/form-data
    const contentType = request.headers.get("content-type") || "";
    const isFormData = contentType.includes("multipart/form-data");

    let body: BodyInit;
    let headers: HeadersInit = {
      Authorization: `Bearer ${token}`,
    };

    if (isFormData) {
      // Si es FormData, pasar directamente el body
      body = await request.formData();
      // No establecer Content-Type para FormData, el navegador lo hace automáticamente
    } else {
      // Si es JSON, parsear y reenviar
      const jsonData = await request.json();
      body = JSON.stringify(jsonData);
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", response.status, errorText);
      
      // Intentar parsear como JSON si es posible
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: errorText || `Error ${response.status}` };
      }
      
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy POST error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 }
    );
  }
}

