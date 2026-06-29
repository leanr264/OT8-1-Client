const tableBody = document.getElementById("table-body");
const pagination = document.getElementById("pagination");
const btnLogout = document.getElementById("btn-logout");
const modal = document.getElementById("myModal");
const modalData = document.getElementById("modal-data");
const spanClose = document.getElementById("closeModalBtn");
const btnUpdate = document.getElementById("btn-update-modal");
const inputDescription = document.getElementById("inputDescription");

inputDescription.addEventListener("change", () => {
  const updatedEl = document.getElementById("updated");
  if (updatedEl) {
    updatedEl.parentNode.removeChild(updatedEl);
  }
});

btnUpdate.addEventListener("click", async () => {
  console.log("clic");
  const description = inputDescription.value;
  const transactionId = sessionStorage.getItem("transactionId");
  console.log(description, transactionId);
  if (description && transactionId) {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post("/updateTransaction", {
        description: description,
        transactionId: transactionId,
        token: token
      });
      console.log(response);
      if (response.data.description) {
        const updatedEl = document.getElementById("updated");
        if (updatedEl) {
          updatedEl.parentNode.removeChild(updatedEl);
        }
        const node = document.createElement("span");
        node.className = "updated";
        node.id = "updated";
        node.innerText = "Actualizado";
        modalData.appendChild(node);
      }
    } catch (error) {
      console.log(error);
    }
  }
});

btnLogout.addEventListener("click", () => {
  sessionStorage.clear();
  window.open("http://localhost:3000", "_self");
});


const getTransactions = async (page) => {
  tableBody.innerHTML = "";
  pagination.innerHTML = "";
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  if (userId && token) {
    try {
      const response = await axios.post("/userTransactions", {
        userId: userId,
        token: token,
        page: page
      });
      console.log(response.data);
      const transactions = response.data.results;
      transactions.map((transaction) => {
        const node = createNode(transaction);
        tableBody.appendChild(node);
        node.childNodes[15].firstChild.addEventListener(
          "click",
          editTransaction
        );
      });
      createPagination(response.data);
    } catch (error) {
      console.log(error);
    }
  }
};

const createNode = (transaction) => {
  const node = document.createElement("tr");
  node.innerHTML = `
        <td scope="row">${transaction.transactionId}</td>
        <td>${transaction.accountId}</td>
        <td>${transaction.currency}</td>
        <td>${transaction.type}</td>
        <td>$${transaction.amount}</td>
        <td>${transaction.description}</td>
        <td>${getDate(transaction.transactionDate)}</td>
        <td><button class="btn-edit" id="btn-edit">Editar</button></td>
    `;
  return node;
};


const editTransaction = (e) => {
  const transactionId = e.target.parentNode.parentNode.childNodes[1].innerText;
  sessionStorage.setItem("transactionId", transactionId);
  modal.style.display = "block";
};

const createPagination = (response) => {
  const pages = response.pages;
  for (let i = 1; i <= pages; i++) {
    const node = document.createElement("li");
    node.className = "page-item";
    node.innerHTML = `<button class="page-link color-blue" onclick="getTransactions(${i})">${i}</button>`;
    pagination.appendChild(node);
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


spanClose.onclick = function () {
  modal.style.display = "none";
  window.open("http://localhost:3000/transactions", "_self");
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
    window.open("http://localhost:3000/transactions", "_self");
  }
};


getTransactions(1);
