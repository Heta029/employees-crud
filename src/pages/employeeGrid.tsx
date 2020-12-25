import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import { onDelete as OnDelete } from '../api/Employee';
import { useTranslation } from 'react-i18next';
import { ModalFunction as Modal } from '../Components/modal/modal';
import GridItem from '../Components/Grid/GridItem';
import GridContainer from '../Components/Grid/GridContainer';
import Table from '../Components/Table/Table';
import Card from '../Components/Card/Card';
import CardHeader from '../Components/Card/CardHeader';
import CardBody from '../Components/Card/CardBody';
import Dictaphone from '../Components/Dictaphone/Dictaphone';
import {EmployeeStoreContext} from '../Stores/employeeStore';
import {observer} from 'mobx-react';

const EmployeeGrid = observer((props: any) => {
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    }
    const employeeStore = useContext(EmployeeStoreContext);
    const { t, i18n } = useTranslation();
    const onDelete = (id: string) => {
        OnDelete(id);
    }
    
    return (
        <GridContainer>
            <div className="col-md-12">
                <div> <Dictaphone/></div>
                <div className="float-left mt-5 mb-3">
                    <button className='btn' style={{background:"linear-gradient(60deg, #ab47bc, #8e24aa)",color:"white"}} onClick={() => changeLanguage('es')}>Spanish</button>
                    <button className='btn' onClick={() => changeLanguage('en')}>English</button>
                </div>               
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
                                (Object.keys(employeeStore.employee)).map((key:any) => {
                                    return (
                                        [employeeStore.employee[key].userName,
                                        employeeStore.employee[key].firstName,
                                        employeeStore.employee[key].lastName,
                                        employeeStore.employee[key].password,
                                        employeeStore.employee[key].email,
                                        employeeStore.employee[key].team,
                                        <div>
                                            <Modal currentId = {key}/>
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
})

export default EmployeeGrid;