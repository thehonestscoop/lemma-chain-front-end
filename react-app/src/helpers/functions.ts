export const AUTH_SYNC = (email:string, password:string):void => {
    const req = {
        "X-AUTH-ACCOUNT": email,
        "X-AUTH-PASSWORD": password
      }
      localStorage.setItem('auth', JSON.stringify(req));
}

export const AUTH_VERIFY = () => {
    const auth: any = localStorage.getItem('auth');
    return auth === null ? null: auth["X-AUTH-ACCOUNT"]
}

