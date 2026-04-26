export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users") || "[]");
};

export const saveUsers = (users: any[]) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const setCurrentUser = (user: any) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser") || "null");
};

export const logout = () => {
  localStorage.removeItem("currentUser");
};