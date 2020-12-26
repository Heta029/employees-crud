import { observable, makeAutoObservable } from "mobx";
import { createContext } from "react";
import firebaseDb from "../firebase/firebase";
import { IObjectEmployee } from '../types/stateTypes/index';

export class EmployeeStore {
    @observable employee: IObjectEmployee = {};
    constructor() {
        makeAutoObservable(this)
        firebaseDb.child('employee-crud').on('value', snapshot => {
            if (snapshot.val() != null) {
                this.employee = snapshot.val()
            }
            else return null
        })
    }
}

export const EmployeeStoreContext = createContext(new EmployeeStore());