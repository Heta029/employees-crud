import React, { useState, useEffect } from 'react';
import firebaseDb from "../firebase/firebase";
import { Link } from "react-router-dom";
import { onDelete as OnDelete } from '../api/Employee'
import i18n from '../locales/index';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import {ModalFunction as Modal}  from '../Components/modal/modal'
import {IObjectEmployee} from '../types/stateTypes/index'

const EmployeeGrid = (t:TFunction) => {
    const changeLanguage = (lng:string) => {
        i18n.changeLanguage(lng);
      }

    var [currentId, setCurrentId] = useState('');
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

        <div className="container-fluid">
            <div className="row">
                <h1>{()=>t("WelcomeReact")}</h1>
                
                <div className="col-md-12">
                <div className="float-left mt-5 mb-3">
                <button onClick={() => changeLanguage('es')}>es</button>
                <button onClick={() => changeLanguage('en')}>en</button>      
                </div>
                    <Link
                        className="btn btn-primary float-right mt-5 mb-3"
                        to={{
                            pathname: "/AddPage"
                        }}
                    >
                       <strong>Add</strong>  

                    </Link>
                    <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                            <tr>
                                <th>User Name</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Team</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (Object.keys(employeeObjects)).map((key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{employeeObjects[key].userName}</td>
                                            <td>{employeeObjects[key].firstName}</td>
                                            <td>{employeeObjects[key].lastName}</td>
                                            <td>{employeeObjects[key].email}</td>
                                            <td>{employeeObjects[key].password}</td>
                                            <td>{employeeObjects[key].team}</td>
                                            <td className="bg-light">
                                                <Modal currentId={key} employeeObjects={employeeObjects}/>
                                                <br />
                                                <Link
                                                    className="btn text-primary"
                                                    to={ `/EditPage/${key}`
                                                    }
                                                >
                                                    <i className="fas fa-pencil-alt" ></i>

                                                </Link>
                                                {/* <a className="btn text-primary" onClick={() => { setCurrentId(key) }}>
                                                </a> */}
                                                <a className="btn text-danger" onClick={() => { onDelete(key) }}>
                                                    <i className="far fa-trash-alt"></i>
                                                </a>
                                            </td>
                                        </tr>

                                    );


                                })
                            }
                        </tbody>
                    </table>
               
                </div>
            </div>
        </div>
    );
}

export default EmployeeGrid;