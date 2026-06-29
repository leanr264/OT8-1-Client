const btnLogout = document.getElementById("btn-logout");
const loanList = document.getElementById("loan-list");

btnLogout.addEventListener("click", () => {
  sessionStorage.clear();
  window.open("http://localhost:3000", "_self");
});

const getLoans = async () => {
    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");
    if (userId && token) {
        try {
            console.log(userId, token);
            const response = await axios.post("/userLoans", {
                userId: userId,
                token: token
            });
            console.log(response.data);
            const loans = response.data;
            loans.map((loan) => {
                const node = createNode(loan);
                loanList.appendChild(node)
            });
        } catch (error) {
            console.log(error);
        }
    }
}

const createNode = (loan) => {
    const node = document.createElement("div");
    node.className = "col-lg-4 col-md-6 col-sm-12";
    node.innerHTML = `
        <div class="loan-card">
            <div class="loan-header">
                <h4>
                    Prestamo #${loan.loanId}
                </h4>
                <span class="loan-status ${loan.status.toLowerCase()}">
                    ${
                        loan.status === "APPROVED"
                        ?
                        `<p>APROBADO</p>`
                        :
                        loan.status === "PENDING"
                        ?
                        `<p>PENDIENTE</p>`
                        :
                        loan.status === "REJECTED"
                        ?
                        `<p>RECHAZADO</p>`
                        :
                        loan.status === "PAID"
                        ?
                        `<p>PAGADO</p>`
                        :
                        `<p>DESCONOCIDO</p>`
                    }
                </span>
            </div>
            <div class="loan-body">
                <p>
                    <strong>Monto:</strong>
                    AR$ ${loan.amount}
                </p>
                <p>
                    <strong>Cuotas:</strong>
                    <a href="http://localhost:3000/loan/myloans/installments/${loan.loanId}">${loan.months}</a>
                </p>
            </div>
        </div>
    `;
    return node;
}

getLoans();