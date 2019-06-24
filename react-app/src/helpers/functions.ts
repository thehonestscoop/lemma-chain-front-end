export const AUTH_SYNC = (email: string, password: string): void => {
  const req = {
    "X-AUTH-ACCOUNT": email,
    "X-AUTH-PASSWORD": password
  };
  localStorage.setItem("auth", JSON.stringify(req));
};

export const AUTH_VERIFY = (em: string, pa: string): boolean => {
  const auth: any = JSON.parse(localStorage.getItem("auth") || "");
  const user = auth === "" ? "" : auth["X-AUTH-ACCOUNT"];
  const password = auth === "" ? "" : auth["X-AUTH-PASSWORD"];
  return user === em && user !== "" && password !== "" && password === pa
    ? true
    : false;
};

export const AUTH_USER = (): string => {
  const auth: any = JSON.parse(localStorage.getItem("auth") || "");
  return auth === "" ? "unknown" : auth["X-AUTH-ACCOUNT"];
};
export const AUTH_PASSWORD = (): string => {
  const auth: any = JSON.parse(localStorage.getItem("auth") || "");
  return auth === "" ? "unknown" : auth["X-AUTH-PASSWORD"];
};
