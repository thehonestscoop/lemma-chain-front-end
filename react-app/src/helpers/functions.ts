export const AUTH_SYNC = (
  name: string,
  email: string,
  password: string
): void => {
  const req = {
    "X-AUTH-ACCOUNT": `@${name}`,
    "X-AUTH-EMAIL": email,
    "X-AUTH-PASSWORD": password
  };
  localStorage.setItem("auth", JSON.stringify(req));
};

export const AUTH_VERIFY = (em: string, pa: string): boolean => {
  const first = localStorage.getItem("auth") || "";
  const auth = !!first ? JSON.parse(first) : "";
  const email = auth === "" ? "" : auth["X-AUTH-EMAIL"];
  const user = auth === "" ? "" : auth["X-AUTH-ACCOUNT"].replace("@", "");
  const password = auth === "" ? "" : auth["X-AUTH-PASSWORD"];
  return (user === em || email === em) &&
    user !== "" &&
    password !== "" &&
    password === pa
    ? true
    : false;
};

export const AUTH_USER = (): string => {
  const first = localStorage.getItem("auth") || "";
  const auth = !!first ? JSON.parse(first) : "";
  return auth === "" ? "unknown" : auth["X-AUTH-ACCOUNT"];
};
export const AUTH_EMAIL = (): string => {
  const first = localStorage.getItem("auth") || "";
  const auth = !!first ? JSON.parse(first) : "";
  return auth === "" ? "unknown" : auth["X-AUTH-EMAIL"];
};
export const AUTH_PASSWORD = (): string => {
  const first = localStorage.getItem("auth") || "";
  const auth = !!first ? JSON.parse(first) : "";
  return auth === "" ? "unknown" : auth["X-AUTH-PASSWORD"];
};
