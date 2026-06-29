document.addEventListener("DOMContentLoaded", async () => {
  const messageElement = document.querySelector(".info-container p");
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

    messageElement.innerHTML = `
        Su cuenta se verificó correctamente. Si desea iniciar sesión, diríjase a este link:
        <a href="http://localhost:3000/">Iniciar sesión</a>
    `;

  } catch (error) {
    console.error("Error verificando cuenta:", error);

    messageElement.innerHTML = `
        El enlace de verificación es inválido o ha expirado. 
    `;

    messageElement.style.color = "red"; 
    messageElement.classList.add("text-danger");
  }
});




