const inputCVU = document.getElementById("InputCVU");
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
  const CVU = inputCVU.value;
  const amount = inputAmount.value;
  const description = textAreaDescription.value;
  if (amount > 0 && CVU) {
    e.preventDefault();
    try {
      const response = await axios.post("/sendArs", {
        destinyAccountId: CVU,
        amount: amount,
        description: description,
        token: sessionStorage.getItem("token")
      });
      console.log(response.data);
      if (response.data.amount) {
        modal.style.display = "block";
        const node = document.createElement("div");
        node.className = "container";
        node.innerHTML = `
            <h4>Transferencia realizada con exito!</h4>
            <p>Fecha: ${getDate(response.data.transactionDate)}</p>
            <p class="mt-3">Envio de dinero a: ${
              response.data.destinyUserEmail
            }</p>
            <p>Monto: AR$ ${response.data.amount}</p>
            <h4>Detalle:</h4>
            <p>Motivo: ${response.data.description}</p>
            <p>CVU destino: ${response.data.destinyAccountId}</p>
            <p>CVU origen : ${response.data.originAccountId}</p>
        `;
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

spanClose.onclick = function () {
  modal.style.display = "none";
  inputCVU.value = null;
  inputAmount.value = null;
  textAreaDescription.value = null;
  modalData.innerHTML = "";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
    inputCVU.value = null;
    inputAmount.value = null;
    textAreaDescription.value = null;
    modalData.innerHTML = "";
  }
};
