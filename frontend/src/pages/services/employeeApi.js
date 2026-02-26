const BASE_URL = "http://localhost:8000/api/employees";

export const fetchEmployees = async (token) => {
  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};