const inputAmount = document.getElementById("InputAmount");
const selectMonth = document.getElementById("SelectMonth");
const btnSimulate = document.getElementById("btnSimulate");
const modal = document.getElementById("myModal");
const modalData = document.getElementById("modal-data");
const spanClose = document.getElementById("closeModalBtn");
let simulatedLoan = null;

btnSimulate.addEventListener("click", async (e) => {
  console.log("clic");
  const amount = inputAmount.value;
  const months = selectMonth.value;
  if (amount > 0 && months > 0) {
    e.preventDefault();
    console.log(amount, months);
    try {
      const response = await axios.post("/simulateLoan", {
        amount: amount,
        months: months,
        token: sessionStorage.getItem("token")
      });
      console.log(response.data);
      if (response.data.amount) {
        
        simulatedLoan = {
          amount: amount,
          months: months
        };
        console.log("Este es simulatedLoan" + simulatedLoan);

        modal.style.display = "block";
        const node = document.createElement("div");
        node.className = "container";
        node.innerHTML = `
            <h4>Tu Préstamo en Pesos</h4>
            <p class="mt-3">Monto: AR$${response.data.amount}</p>
            <p>Meses: ${response.data.months}</p>
            <p>Tasa de Interes: AR$${response.data.interestRate}</p>
            <p>Total a pagar por mes: AR$${response.data.paymentPerMonth}</p>
            <p>Total de interes: AR$${response.data.totalInterest}</p>
            <p>Total a pagar : AR$${response.data.totalPayment}</p>
            <div class="container-button">
              <button type="button" class="btn-simulate return" id="return" onclick="apply()">
                Aplicar Prestamo
              </button>
              <button type="button" class="btn-simulate return" id="return" onclick="home()">
                Volver al inicio
              </button>
            </div>
        `;
        modalData.appendChild(node);
      }
    } catch (error) {
      console.log(error);
    }
  }
});

const apply = async () => {
  try {
    const response = await axios.post("/applyLoan", {
      amount: simulatedLoan.amount,
      months: simulatedLoan.months,
      token: sessionStorage.getItem("token")
    });

    modalData.innerHTML = `
      <div class="success-container">
          <div class="success-icon">
              ✓
          </div>
        <h3>Prestamo aprobado</h3>
          <p>
              El dinero ya fue acreditado en tu cuenta.
          </p>
          <div class="container-button">
              <button
                  type="button"
                  class="btn-simulate return"
                  onclick="closeModal()">
                    Continuar
              </button>
          </div>

      </div>
    `;

  } catch (error) {
    console.log(error);
    alert("Error al aplicar el prestamo");
  }
}

const home = () => {
  window.open("http://localhost:3000/home", "_self");
}

const closeModal = () => {
  modal.style.display = "none";
  inputAmount.value = null;
  selectMonth.value = null;
  simulatedLoan = null;
  modalData.innerHTML = "";
} 

spanClose.onclick = closeModal;

window.onclick = function (event) {
  if (event.target === modal) {
    closeModal();
  }
};
