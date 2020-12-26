import { RouteComponentProps } from "react-router-dom";
import { TFunction } from "i18next";
import { WithTranslation } from 'react-i18next'

export interface IdetailProp extends RouteComponentProps<{ key: string }>, WithTranslation {
    t: TFunction;
}

export interface IProps {
    children: any;
    trigger: any;
}

export interface Props extends WithTranslation {
    classes: any;
    location: any;
    login: any;
}

export interface IModal {
    currentId: string;
}