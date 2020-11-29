

export interface IObjectEmployee {
    [key: string]: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        userName: string;
        team: string;
    }
}


export interface IProp {

    key: string;
    successMessage: string;
    employeeObjects: {
        [key: string]: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
            userName: string;
            team: string;

        }
    };
    values: FormValues;

    // addOrEdit: Function;

}

export interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userName: string;
    team: string;

}

