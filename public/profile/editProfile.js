const inputFirstName = document.getElementById("InputFirstName");
const inputLastName = document.getElementById("InputLastName");
const btnEdit = document.getElementById("btnEdit");
const modal = document.getElementById("myModal");
const modalData = document.getElementById("modal-data");
const spanClose = document.getElementById("closeModalBtn");

btnEdit.addEventListener("click", async (e) => {
  const firstName = inputFirstName.value;
  const lastName = inputLastName.value;
  if (firstName && lastName) {
    e.preventDefault();
    console.log(firstName, lastName);
    try {
      const response = await axios.post("/editUser", {
        firstName: firstName,
        lastName: lastName,
        userId: sessionStorage.getItem("userId"),
        token: sessionStorage.getItem("token")
      });
      console.log(response.data);
      if (response.data.firstName) {
        modal.style.display = "block";
        const node = document.createElement("div");
        node.className = "container";
        node.innerHTML = `
            <h4>Editaste tu Cuenta</h4>
            <p class="mt-3">Nombre: ${response.data.firstName}</p>
            <p>Apellido: ${response.data.lastName}</p>
        `;
        modalData.appendChild(node);
      }
    } catch (error) {
      console.log(error);
    }
  }
});

spanClose.onclick = function () {
  modal.style.display = "none";
  inputFirstName.value = null;
  inputLastName.value = null;
  modalData.innerHTML = "";
  window.open("http://localhost:3000/profile", "_self");

};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
    inputFirstName.value = null;
    inputLastName.value = null;
    modalData.innerHTML = "";
    window.open("http://localhost:3000/profile", "_self");
  }
};
