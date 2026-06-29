const inputAmount = document.getElementById("InputAmount");
const inputDescription = document.getElementById("InputDescription");
const btnSubmit = document.getElementById("btnSubmit");
var modal = document.getElementById('modalInfo');
var btnClose = document.getElementById('closeModal');
var modalContent = document.getElementById('modalContent');
const btnLogout = document.getElementById("btn-logout");

btnSubmit.addEventListener("click", async (e) => {
  
  console.log("clic");
  const amount = inputAmount.value;
  const description = inputDescription.value;
  console.log(amount, description);
  if (amount>0) {
    e.preventDefault();
    try {
      const response = await axios.post("/deposit", {
        amount:amount,
        currency:"ARS",
        description:description,
        token:sessionStorage.getItem("token")
      });
      console.log(response.data);
      if(response.data.amount){
        modal.style.display = 'block';
        var node=document.getElementById("content");
        node.innerHTML=`
        <h4 class="modal-title color-success">El depósito se realizó correctamente</h4>
        <p class="mt-3 info">CVU: ${response.data.accountId}</p><br>
        <p class="info">Transacción: ${response.data.transactionId}</p><br>
        <p class="info">Monto: AR$ ${response.data.amount}</p><br>
        <p class="info">Fecha: ${getDate(response.data.creationDate)}</p><br>
        <p class="info">Descripción: ${response.data.description}</p>
        <div class="container-button">
          <button type="submit" class="btn-register return" id="return" onclick="home()">
            Volver
          </button>
        </div>`;
        inputAmount.value=0;
        inputDescription.value="";
      }
    } catch (error) {
      console.log(error);
    }
  }
});

btnClose.onclick = function() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target === modal) {
      modal.style.display = 'none';
  }
}

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

btnLogout.addEventListener("click", () => {
  sessionStorage.clear();
  window.open("http://localhost:3000", "_self");
});