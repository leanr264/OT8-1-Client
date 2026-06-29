const profile = document.getElementById("profile");
const modal = document.getElementById("myModal");
const modalData = document.getElementById("modal-data");
const spanClose = document.getElementById("closeModalBtn");
const btnCerrar = document.getElementById("btnCerrar");
const btnLogout = document.getElementById("btn-logout");

btnLogout.addEventListener("click", () => {
  sessionStorage.clear();
  window.open("http://localhost:3000", "_self");
});

btnCerrar.addEventListener("click", () => {
  modal.style.display = "block";
  const node = document.createElement("div");
  node.className = "container";
  node.innerHTML = `
            <h4>¿Estas Seguro que queres cerrar tu cuenta?</h4>
            <button class="btnClose" onclick="deleteUser()">Cerrar Cuenta</button>
        `;
  modalData.appendChild(node);
});

const setData = async () => {
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  if (userId && token) {
    try {
      const response = await axios.post("/getUser", {
        userId: userId,
        token: token
      });
      console.log(response);
      if (response.data.firstName) {
        let firstName = response.data.firstName;
        firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
        let lastName = response.data.lastName;
        lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
        const fullName = firstName + " " + lastName;
        const email = response.data.userEmail;
        const creationDate = getDate(response.data.creationDate);
        profile.innerHTML = `
          <div class="row user">${fullName}</div>
          <div class="row">${email}</div>
          <div class="row color-99">Te uniste el ${creationDate}</div>
          `;
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const deleteUser = async () => {
  const userId = sessionStorage.getItem("userId");
  if (userId) {
    try {
      const response = await axios.post("/deleteUser", {
        userId: userId,
        token: sessionStorage.getItem("token")
      });
      console.log(response.data);
      if (response.data.userEmail) {
        sessionStorage.clear();
        window.open("http://localhost:3000", "_self");
      }
    } catch (error) {
      console.log(error);
    }
  }
};

spanClose.onclick = function () {
  modal.style.display = "none";
  modalData.innerHTML = "";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
    modalData.innerHTML = "";
  }
};

const getDate = (transactionDate) => {
  const date = transactionDate.slice(0, 10);
  const dateComponents = date.split("-");
  const d = dateComponents[2];
  const m = dateComponents[1];
  const y = dateComponents[0];
  const time = transactionDate.slice(11, 19);
  return d + "-" + m + "-" + y + " " + time;
};

setData();
