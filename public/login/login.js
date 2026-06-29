const inputEmail = document.getElementById("InputEmail");
const inputPassword = document.getElementById("InputPassword");
const btnLogin = document.getElementById("btnLogin");

const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

btnLogin.addEventListener("click", async (e) => {
  console.log("clic");
  const userEmail = inputEmail.value;
  const userPassword = inputPassword.value;
  if (emailRegExp.test(userEmail) && userPassword) {
    e.preventDefault();
    console.log(userEmail, userPassword);
    try {
      const response = await axios.post("/loginUser", {
        userEmail: userEmail,
        userPassword: userPassword
      });
      console.log(response.data);
      if (response.data.jwt) {
        sessionStorage.setItem("token", response.data.jwt);
        sessionStorage.setItem("userId", response.data.userId);
        sessionStorage.setItem("firstName", response.data.firstName);
        sessionStorage.setItem("lastName", response.data.lastName);
        sessionStorage.setItem("email", response.data.userEmail);
        window.open("http://localhost:3000/home", "_self");
      }
    } catch (error) {
      console.log(error);
    }
  }
});
