const inputFirstName = document.getElementById("InputFirstName");
const inputLastName = document.getElementById("InputLastName");
const inputEmail = document.getElementById("InputEmail");
const inputPassword = document.getElementById("InputPassword");
const btnRegister = document.getElementById("btnRegister");
var modal = document.getElementById('modalInfo');

const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

btnRegister.addEventListener("click", async (e) => {
  console.log("clic");
  const firstName = inputFirstName.value;
  const lastName = inputLastName.value;
  const email = inputEmail.value;
  const password = inputPassword.value;
  if (firstName && lastName && emailRegExp.test(email) && password) {
    e.preventDefault();
    console.log(firstName, lastName, email, password);
    try {
      const response = await axios.post("/registerUser", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      });
      console.log(response.data);

      if (response.data) {
        modal.style.display = 'block';
        var node=document.getElementById("content");
        node.innerHTML=`
        <h4 class="modal-title color-success">Registro exitoso. 
          Revisa tu correo para verificar tu cuenta antes de iniciar sesión.
        </h4>
        <h4 class="modal-title color-success">
          *Revisa la casilla de Spam antes de pedir el reenvió del mail.
        </h4>
        <div class="container-button">
          <button type="submit" class="btn-register return" id="return" onclick="home()">
            Iniciar Sesión
          </button>
          <button type="submit" class="btn-register return" id="return" onclick="resendVerification('${email}')">
            Reenviar Mail
          </button>
        </div>`;
      }
      
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Hubo un error al registrar el usuario");
    }
  } else {
    alert("Por favor, completa todos los campos correctamente.");
  }
});

const home = () => {
  window.open("http://localhost:3000/", "_self");
}

const resendVerification = async (email) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/auth/resend-verification",
      null,
      {
        params: { email }
      }
    );

    console.log(response.data);

    document.getElementById("content").innerHTML = `
      <h4 class="modal-title color-success">
        El correo fue reenviado correctamente.
        Revisa tu casilla de entrada.
      </h4>
      <div class="container-button">
        <button type="button" class="btn-register return" 
          onclick="home()">
          Iniciar sesión
        </button>
      </div>
    `;

  } catch (error) {
    console.error(error);

    document.getElementById("content").innerHTML = `
      <h4 class="modal-title color-error">
        No se pudo reenviar el correo.
        Puede que el enlace haya expirado.
      </h4>
      <div class="container-button">
        <button type="button" class="btn-register return" 
          onclick="home()">
          Volver
        </button>
      </div>
    `;
  }
};
