import axios from "axios";

export async function updateAccount(details) {
  const account = await axios.post("/api/account", details);
  return account;
}

export async function getAccount() {
  const account = await axios.get("/api/account");
  return account;
}
