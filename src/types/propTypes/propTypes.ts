import { RouteComponentProps } from "react-router-dom";

export interface IdetailProp extends RouteComponentProps<{ key: string }> {

}

export interface IProps {
    children: any;
    trigger: any;

}

export interface IModal {
    currentId: string;
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
}