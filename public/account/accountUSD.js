const inputLimit = document.getElementById("InputLimit");
const btnSubmit = document.getElementById("btnSubmit");
var modal = document.getElementById("modalInfo");
var btnClose = document.getElementById("closeModal");
var modalContent = document.getElementById("modalContent");
const accountUsdCVU = document.getElementById("accountUsd-CVU");
const accountUsdBalance = document.getElementById("accountUsd-Balance");
const accountUsdLimit = document.getElementById("accountUsd-Limit");
const accountUsdDate = document.getElementById("accountUsd-Date");
const btnLogout = document.getElementById("btn-logout");

btnSubmit.addEventListener("click", async (e) => {
  console.log("clic");
  const limit = inputLimit.value;
  console.log(limit);
  if (limit > 0) {
    e.preventDefault();
    try {
      const response = await axios.post("/updateAccount", {
        transactionLimit: limit,
        accountId: sessionStorage.getItem("accountUsd"),
        token: sessionStorage.getItem("token")
      });
      console.log(response.data);
      if (response.data.transactionLimit) {
        modal.style.display = "block";
        var node = document.getElementById("content");
        node.innerHTML = `
          <h4 class="modal-title color-success">Se actualizó la cuenta correctamente</h4>
          <p class="mt-3 info">CVU: ${response.data.accountId}</p><br>
          <p class="info">Fecha de creación: ${getDate(
            response.data.creationDate
          )}</p><br>
          <p class="info">Balance: U$D ${response.data.balance}</p><br>
          <p class="info">Límite de transacción: U$D ${
            response.data.transactionLimit
          }</p><br>
          <div class="container-button">
            <button type="submit" class="btn-register return" id="return" onclick="home()">
              Volver
            </button>
          </div>`;
        inputLimit.value = 0;
      }
    } catch (error) {
      console.log(error);
    }
  }
});

btnClose.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
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

const getAccounts = async () => {
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  if (userId && token) {
    try {
      console.log(userId, token);
      const response = await axios.post("/userAccounts", {
        userId: userId,
        token: token
      });
      console.log(response.data);
      response.data.map((account) => {
        if (account.currency === "USD") {
          accountUsdCVU.innerText = account.accountId;
          accountUsdBalance.innerText = account.balance;
          accountUsdDate.innerText = getDate(account.creationDate);
          accountUsdLimit.innerText = account.transactionLimit;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
};

const home = () => {
  window.open("http://localhost:3000/home", "_self");
};

btnLogout.addEventListener("click", () => {
  sessionStorage.clear();
  window.open("http://localhost:3000", "_self");
});

getAccounts();
