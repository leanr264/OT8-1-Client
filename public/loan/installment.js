var modal = document.getElementById('modalInfo');
var btnClose = document.getElementById('closeModal');
var modalContent = document.getElementById('modalContent');
const btnLogout = document.getElementById("btn-logout");
const installmentList = document.getElementById("installment-list");

btnLogout.addEventListener("click", () => {
  sessionStorage.clear();
  window.open("http://localhost:3000", "_self");
});

const getInstallments = async () => {
    const loanId = window.location.pathname.split("/").pop();
    const token = sessionStorage.getItem("token");
    console.log(loanId, token);
    if (loanId && token) {
        try {
            const response = await axios.post("/loanInstallments", {
                loanId: loanId,
                token: token
            });
            console.log(response.data);
            const installments = response.data;
            installments.map((installment) => {
                const node = createNode(installment);
                installmentList.appendChild(node)
            });
        } catch (error) {
            console.log(error);
        }
    }
}

const createNode = (installment) => {
    const node = document.createElement("div");
    node.className = "col-lg-4 col-md-6 col-sm-12";
    node.innerHTML = `
        <div class="installment-card">
            <h4>Cuota #${installment.installmentNumber}</h4>

            <p>Monto: AR$ ${installment.amountPay}</p>

            <p>Vencimiento:${getExpirationDays(installment.expirationDate)}</p>

            ${
                installment.status === "PENDING"
                ?
                `
                <p>Estado: PENDIENTE</p>

                <button type="submit" class="btn-pay return" id="return" onclick="payInstallment(${installment.id})">
                    Pagar cuota
                </button>
                `
                :
                `
                <p class="color-success">Estado: PAGADA</p>
                `
            }
        </div>
    `;
    return node;
}

const payInstallment = async (installmentId) => {
    const token = sessionStorage.getItem("token");
    if (installmentId && token) {
        console.log(installmentId, token);
        try {
            const response = await axios.post("/payInstallment", {
                installmentId: installmentId,
                token: token
            });
            console.log(response.data);

            if(response.data.amountPay) {
                modal.style.display = 'block';
                var node=document.getElementById("content");
                node.innerHTML=`
                <h4 class="modal-title color-success">El pago se realizó correctamente</h4>
                <p class="mt-3 info">Cuota N°: ${response.data.installmentNumber}</p><br>
                <p class="info">Monto pagado: AR$ ${response.data.amountPay}</p><br>
                <p class="info">Estado: ${response.data.status}</p><br>
                `
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const getExpirationDays = (expirationDate) => {

    const today = new Date();
    const expDate = new Date(expirationDate);

    // Eliminamos la hora para comparar solo fechas
    //today.setHours(0, 0, 0, 0);
    //dueDate.setHours(0, 0, 0, 0);

    const differenceInMilliseconds =
        expDate.getTime() - today.getTime();

    const days =
        Math.ceil(
            differenceInMilliseconds / (1000 * 60 * 60 * 24)
        );

    if (days > 0) {
        return `Vence en ${days} día${days !== 1 ? "s" : ""}`;
    }

    if (days === 0) {
        return "Vence hoy";
    }

    return `Vencida hace ${Math.abs(days)} día${Math.abs(days) !== 1 ? "s" : ""}`;
};

btnClose.onclick = function() {
  modal.style.display = 'none';
  window.location.reload();
}

getInstallments();