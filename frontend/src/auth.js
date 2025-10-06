export const loginUser = async (username, password) => {
  const res = await fetch("https://invoice-system-cik9.onrender.com/api/token/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (data.access) {
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
  }
  return data;
};
