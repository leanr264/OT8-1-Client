const inputAmount = document.getElementById("InputAmount");
const textAreaDescription = document.getElementById("TextAreaDescription");
const btnSend = document.getElementById("btnSend");
const modal = document.getElementById("myModal");
const modalData = document.getElementById("modal-data");
const spanClose = document.getElementById("closeModalBtn");
const btnLogout = document.getElementById("btn-logout");

btnLogout.addEventListener("click", () => {
  sessionStorage.clear();
  window.open("http://localhost:3000", "_self");
});

btnSend.addEventListener("click", async (e) => {
  console.log("clic");
  const amount = inputAmount.value;
  const description = textAreaDescription.value;
  console.log(amount, description);
  if (amount > 0) {
    e.preventDefault();
    try {
      const response = await axios.post("/buyUsd", {
        amount: amount,
        description: description,
        token: sessionStorage.getItem("token")
      });
      console.log(response.data);
      if (response.data.amountUsd) {
        modal.style.display = "block";
        const node = document.createElement("div");
        node.className = "container";
        node.innerHTML = `
            <h4>Compra realizada con exito!</h4>
            <p>Fecha: ${getDate(response.data.transactionDate)}</p>
            <p>Monto pagado: $ ${response.data.amountArs}</p>
            <p>Monto recibido: US$ ${response.data.amountUsd}</p>
            <h4>Detalle:</h4>
            <p>Motivo: ${response.data.description}</p>
            <p>Cuenta destino: ${response.data.targetAccountId}</p>
            <div class="container-button">
              <button type="button" class="btn-send return" id="return" onclick="home()">
                Volver al inicio
              </button>
              <button type="button" class="btn-send return" id="return" onclick="closeModal()">
                Hacer otra compra
              </button>
            </div>`;
        modalData.appendChild(node);
      }
    } catch (error) {
      console.log(error);
    }
  }
});

const getDate = (transactionDate) => {
  const date = transactionDate.slice(0, 10);
  const dateComponents = date.split("-");
  const d = dateComponents[2];
  const m = dateComponents[1];
  const y = dateComponents[0];
  const time = transactionDate.slice(11, 19);
  return d + "-" + m + "-" + y + " " + time;
};

const home = () => {
  window.open("http://localhost:3000/home", "_self");
}

const closeModal = () => {
  modal.style.display = "none";
  inputCVU.value = sessionStorage.getItem("accountUsd");
  inputAmount.value = null;
  textAreaDescription.value = null;
  modalData.innerHTML = "";
}

spanClose.onclick = closeModal;

window.onclick = function (event) {
  if (event.target === modal) {
    closeModal();
  }
};