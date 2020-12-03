import { RouteComponentProps } from "react-router-dom";
import { TFunction } from "i18next";
import {WithTranslation, withTranslation} from 'react-i18next'
import * as i18n from 'i18next';

export interface IdetailProp extends RouteComponentProps<{ key: string }>,WithTranslation {
    t:TFunction;    
    
}

export interface IProps {
    children: any;
    trigger: any;

}


export interface Props extends WithTranslation{
    classes: any;
    location: any;
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