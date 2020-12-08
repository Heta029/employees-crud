import React, { useState, useEffect } from 'react';
import firebaseDb from "../firebase/firebase";
import { Link } from "react-router-dom";
import { onDelete as OnDelete } from '../api/Employee'
import { useTranslation } from 'react-i18next';
import { ModalFunction as Modal } from '../Components/modal/modal'
import { IObjectEmployee } from '../types/stateTypes/index'
import GridItem from '../Components/Grid/GridItem';
import GridContainer from '../Components/Grid/GridContainer';
import Table from '../Components/Table/Table';
import Card from '../Components/Card/Card';
import CardHeader from '../Components/Card/CardHeader';
import CardBody from '../Components/Card/CardBody';
import Dictaphone from '../Components/Dictaphone/Dictaphone'

const EmployeeGrid = (props: any) => {
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    }
    const { t, i18n } = useTranslation();
    var [employeeObjects, setEmployeeObjects] = useState<IObjectEmployee>({});

    useEffect(() => {

        firebaseDb.child('employee-crud').on('value', snapshot => {
            if (snapshot.val() != null) {
                setEmployeeObjects({
                    ...snapshot.val()
                })
                    ;
            }
        })

    }, [])


    const onDelete = (id: string) => {
        OnDelete(id);
    }

    return (


        <GridContainer>

            <div className="col-md-12">
                <div className="float-left mt-5 mb-3">
                    <button className='btn' style={{background:"linear-gradient(60deg, #ab47bc, #8e24aa)",color:"white"}} onClick={() => changeLanguage('es')}>Spanish</button>
                    <button className='btn' onClick={() => changeLanguage('en')}>English</button>
                </div>
                <Dictaphone/>
                <Link
                    className="btn float-right mt-5 mb-3"
                    to={{
                        pathname: "employees"
                    }}
                    style={{background:"linear-gradient(60deg, #ab47bc, #8e24aa)",color:"white"}}
                >
                    <strong>{t("Add")}</strong>

                </Link>

            </div>
            <br />
            <GridItem xs={12} sm={12} md={12}>

                <Card>
                    <CardHeader color="primary">
                <h4 >{t("employeeTable")}</h4>
                        <p>
                            {t("WelcomeMessage")}
                        </p>
                    </CardHeader>
                    <CardBody>
                        <Table
                            tableHeaderColor="primary"
                            tableHead={[t("userName"), t("firstName"), t('lastName'), t('password'), t('email'), t('team'), t('actions')]}
                            tableData={
                                (Object.keys(employeeObjects)).map((key) => {
                                    return (
                                        [employeeObjects[key].userName,
                                        employeeObjects[key].firstName,
                                        employeeObjects[key].lastName,
                                        employeeObjects[key].password,
                                        employeeObjects[key].email,
                                        employeeObjects[key].team,
                                        <div>
                                            <Modal currentId={key} employeeObjects={employeeObjects} />
                                            <br />
                                            <Link
                                                className="btn text-primary"
                                                to={`editemployees/${key}`
                                                }
                                            >
                                                <i className="fas fa-pencil-alt" ></i>
                                            </Link>
                                            <a className="btn text-danger" onClick={() => { onDelete(key) }}>
                                                <i className="far fa-trash-alt"></i>
                                            </a>
                                        </div>
                                        ]
                                    );
                                })
                            }
                        />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>

    );
}

export default EmployeeGrid;