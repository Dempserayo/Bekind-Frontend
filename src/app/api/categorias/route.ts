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

