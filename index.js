const express = require("express");
const path = require("path");
const axios = require("axios");
const {
  fetchData,
  postData,
  deleteData,
  patchData
} = require("./service/apiService");

const { get } = require("http");

const app = express();
const port = 3000;

const API_URL = "http://localhost:8080/api/v1";

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login/login.html");
});

app.get("/verify", (req, res) => {
  res.sendFile(__dirname + "/public/verify/verify.html");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/public/register/register.html");
});

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/public/home/home.html");
});

app.get("/transactions", (req, res) => {
  res.sendFile(__dirname + "/public/transaction/transaction.html");
});

app.get("/depositArs", (req, res) => {
  res.sendFile(__dirname + "/public/deposit/depositARS.html");
});

app.get("/depositUsd", (req, res) => {
  res.sendFile(__dirname + "/public/deposit/depositUSD.html");
});

app.get("/paymentArs", (req, res) => {
  res.sendFile(__dirname + "/public/payment/paymentARS.html");
});

app.get("/paymentUsd", (req, res) => {
  res.sendFile(__dirname + "/public/payment/paymentUSD.html");
});

app.get("/loan", (req, res) => {
  res.sendFile(__dirname + "/public/simulate/loan.html");
});

app.get("/fixed", (req, res) => {
  res.sendFile(__dirname + "/public/simulate/fixed.html");
});

app.get("/profile", (req, res) => {
  res.sendFile(__dirname + "/public/profile/profile.html");
});

app.get("/editProfile", (req, res) => {
  res.sendFile(__dirname + "/public/profile/editProfile.html");
});

app.get("/accountArs", (req, res) => {
  res.sendFile(__dirname + "/public/account/accountARS.html");
});

app.get("/accountUsd", (req, res) => {
  res.sendFile(__dirname + "/public/account/accountUSD.html");
});

app.get("/sendArs", (req, res) => {
  res.sendFile(__dirname + "/public/send/sendArs.html");
});

app.get("/sendUsd", (req, res) => {
  res.sendFile(__dirname + "/public/send/sendUsd.html");
});

app.post("/loginUser", async (req, res) => {
  try {
    const data = req.body;
    const url = API_URL + "/auth/login";
    const response = await postData(url, {
      email: data.userEmail,
      password: data.userPassword
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/registerUser", async (req, res) => {
  try {
    const data = req.body;
    const url = API_URL + "/auth/register";
    const registerResponse = await postData(url, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password
    });
    console.log(registerResponse);
    res.json(registerResponse);
    /*const loginURL = API_URL + "/auth/login";
    try {
      const loginResponse = await postData(
        loginURL,
        {
          email: data.email,
          password: data.password
        },
        null
      );
      console.log(loginResponse);
      if (loginResponse.jwt) {
        const token = loginResponse.jwt;
        const arsURL = API_URL + "/accounts?currency=ARS";
        const usdURL = API_URL + "/accounts?currency=USD";
        try {
          const accountArs = await postData(arsURL, null, token);
          console.log(accountArs);
          const accountUsd = await postData(usdURL, null, token);
          console.log(accountUsd);
        } catch (error) {
          console.log(error);
        }
      }
      res.json(registerResponse);
    } catch (error) {
      console.log(error);
    }*/
  } catch (error) {
    console.log(error);
  }
});

app.post("/userAccounts", async (req, res) => {
  const data = req.body;
  console.log(data);
  const userId = data.userId;
  const token = data.token;
  const accountURL = API_URL + `/accounts/${userId}`;
  try {
    console.log("Haciendo un fetch a: " + accountURL);
    const response = await fetchData(accountURL, token);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/userTransactions", async (req, res) => {
  const data = req.body;
  console.log(data);
  const userId = data.userId;
  const token = data.token;
  const page = data.page;
  const transactionsURL = API_URL + `/transactions?user=${userId}&page=${page}`;
  try {
    console.log("Haciendo un fetch a: " + transactionsURL);
    const response = await fetchData(transactionsURL, token);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/deposit", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const url = API_URL + "/transactions/deposit";
    console.log(url);
    const depositResponse = await postData(
      url,
      {
        amount: data.amount,
        currency: data.currency,
        description: data.description
      },
      data.token
    );
    console.log(depositResponse);
    res.json(depositResponse);
  } catch (error) {
    console.log(error);
  }
});

app.post("/payment", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const url = API_URL + "/transactions/payment";
    console.log(url);
    const paymentResponse = await postData(
      url,
      {
        amount: data.amount,
        currency: data.currency,
        description: data.description
      },
      data.token
    );
    console.log(paymentResponse);
    res.json(paymentResponse);
  } catch (error) {
    console.log(error);
  }
});

app.post("/simulateLoan", async (req, res) => {
  const data = req.body;
  console.log(data);
  const amount = data.amount;
  const month = data.month;
  const token = data.token;
  const simulateURL = API_URL + "/loan/simulate";
  try {
    const response = await postData(
      simulateURL,
      {
        amount: amount,
        months: month
      },
      token
    );
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/simulateFixed", async (req, res) => {
  const data = req.body;
  console.log(data);
  const amount = data.amount;
  const days = data.days;
  const token = data.token;
  const simulateURL = API_URL + "/fixedTerm/simulate";
  try {
    const response = await postData(
      simulateURL,
      {
        amount: amount,
        days: days
      },
      token
    );
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/editUser", async (req, res) => {
  const data = req.body;
  console.log(data);
  const token = data.token;
  const simulateURL = API_URL + `/users/${data.userId}`;
  try {
    const response = await patchData(
      simulateURL,
      {
        firstName: data.firstName,
        lastName: data.lastName
      },
      token
    );
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/deleteUser", async (req, res) => {
  const data = req.body;
  console.log(data);
  const token = data.token;
  const deleteURL = API_URL + `/users/${data.userId}`;
  try {
    const response = await deleteData(deleteURL, token);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/getUser", async (req, res) => {
  const data = req.body;
  console.log(data);
  const token = data.token;
  const getUrl = API_URL + `/users/${data.userId}`;
  try {
    const response = await fetchData(getUrl, token);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/updateTransaction", async (req, res) => {
  const data = req.body;
  const transactionId = data.transactionId;
  const token = data.token;
  const updateUrl = API_URL + `/transactions/${transactionId}`;
  try {
    const response = await patchData(
      updateUrl,
      {
        description: data.description
      },
      token
    );
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/updateAccount", async (req, res) => {
  try {
    const data = req.body;
    const accountId = data.accountId;
    console.log(accountId);
    const url = API_URL + `/accounts/${accountId}`;
    const updateResponse = await patchData(
      url,
      {
        newTransactionLimit: data.transactionLimit
      },
      data.token
    );
    console.log(updateResponse);
    res.json(updateResponse);
  } catch (error) {
    console.log(error);
  }
});

app.post("/sendArs", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const url = API_URL + "/transactions/sendArs";
    console.log(url);
    const response = await postData(
      url,
      {
        destinyAccountId: data.destinyAccountId,
        amount: data.amount,
        description: data.description
      },
      data.token
    );
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/sendUsd", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const url = API_URL + "/transactions/sendUsd";
    console.log(url);
    const response = await postData(
      url,
      {
        destinyAccountId: data.destinyAccountId,
        amount: data.amount,
        description: data.description
      },
      data.token
    );
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
