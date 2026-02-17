document.addEventListener("DOMContentLoaded", async () => {
  console.log("verify.js cargado");

  try {
    // Caso 1: link del mail del tipo:
    // http://localhost:3000/verify?token=UUID
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      throw new Error("Token no encontrado");
    }

    console.log("Verificando token:", token);

    const response = await axios.get(
      "http://localhost:8080/api/v1/auth/verify",
      {
        params: { token }
      }
    );

    console.log("Respuesta backend:", response.data);

  } catch (error) {
    console.error("Error verificando cuenta:", error);
  }
});




