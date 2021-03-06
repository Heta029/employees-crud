import { observable, makeAutoObservable } from "mobx";
import { createContext } from "react";

class LoginsStore {
  @observable login = localStorage.getItem('isLogin') == 'true' ? true : false;
  constructor() {
    makeAutoObservable(this)
  }
  provideLogin() {
    this.login ? this.login = false : this.login = true
  }
}

export const LoginStoreContext = createContext(new LoginsStore());