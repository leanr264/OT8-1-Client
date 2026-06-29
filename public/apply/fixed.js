const inputAmount = document.getElementById("InputAmount");
const inputDay = document.getElementById("InputDay");
const btnSimulate = document.getElementById("btnSimulate");
const modal = document.getElementById("myModal");
const modalData = document.getElementById("modal-data");
const spanClose = document.getElementById("closeModalBtn");

btnSimulate.addEventListener("click", async (e) => {
  console.log("clic");
  const amount = inputAmount.value;
  const days = inputDay.value;
  if (amount > 0 && days > 0) {
    e.preventDefault();
    console.log(amount, days);
    try {
      const response = await axios.post("/simulateFixed", {
        amount: amount,
        days: days,
        token: sessionStorage.getItem("token")
      });
      console.log(response.data);
      if (response.data.investedAmount) {
        modal.style.display = "block";
        const node = document.createElement("div");
        node.className = "container";
        node.innerHTML = `
            <h4 class="">Tu Plazo Fijo en pesos</h4>
            <p class="mt-3">Monto: AR$${response.data.investedAmount}</p>
            <p>Fecha Inicio: ${getDate(response.data.creationDate)}</p>
            <p>Fecha de cierre: ${getDate(response.data.closingDate)}</p>
            <p>Total de interes ganado: AR$${response.data.totalInterest}</p>
            <p>Total al cierre : AR$${response.data.totalValue}</p>
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
  inputAmount.value = null;
  inputDay.value = null;
  modalData.innerHTML = "";
};

window.onclick = function (event) {
  if (event.target === modal) {
    inputAmount.value = null;
    inputDay.value = null;
    modal.style.display = "none";
    modalData.innerHTML = "";
  }
};

const getDate = (fixedDate) => {
  const date = fixedDate.slice(0, 10);
  const dateComponents = date.split("-");
  const d = dateComponents[2];
  const m = dateComponents[1];
  const y = dateComponents[0];
  const time = fixedDate.slice(11, 19);
  return d + "-" + m + "-" + y + " " + time;
};
