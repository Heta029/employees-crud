import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup';
import { Grid, TextField, Button, makeStyles, createStyles, Theme } from '@material-ui/core'
import firebaseDb from "../firebase/firebase";
import { addOrEdit as AddorEdit } from '../api/Employee';
import { Link } from "react-router-dom";
import {IdetailProp} from '../types/propTypes/index';
import {IProp,FormValues} from '../types/stateTypes/index'


class AddEditEmployee extends React.Component<IdetailProp, IProp> {

    constructor(props: IdetailProp) {
        super(props);
        this.state = {
            key: this.props.match.params.key,
            employeeObjects: {},
            values: {
                userName: '',
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                team: 'none',
            },
            successMessage: '',

        }
        this.componentDidMount = () => {

            firebaseDb.child('employee-crud').on('value', snapshot => {
                if (snapshot.val() != null) {
                    this.setState({
                        employeeObjects: snapshot.val(),
                    });
                    if (this.props.match.params.key != null) {
                        this.setState({ values: this.state.employeeObjects[this.state.key] })
                    }
                }
            })

        }


    }

    handleSubmit = (values: FormValues): void => {

        if (this.state.key == undefined || this.state.key == '') {
            AddorEdit(values, '');
            this.setState({ successMessage: 'Added successfully' })
        }
        else {
            AddorEdit(values, this.state.key);
            this.setState({ successMessage: 'Edited successfully' })
        }

    };
    render() {

        const userNames =
            Object.keys(this.state.employeeObjects).map((key) => (
                key == this.state.key ? null : this.state.employeeObjects[key].userName
            ));

        const SignupSchema = Yup.object().shape({
            userName: Yup.string()
                .min(2, "Too Short!")
                .notOneOf(userNames, 'Username already taken!')
                .required("Required"),
            email: Yup.string()
                .lowercase()
                .email('Must be a valid email!')
                .required('Required!'),
            password: Yup.string()
                .min(8, 'Minimum 8 characters required!')
                .required('Required!'),
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
        });

        return (
            <div className="container mt-5  border border-danger">
                <Formik
                    enableReinitialize
                    initialValues={this.state.values}
                    onSubmit={this.handleSubmit}
                    validationSchema={SignupSchema}


                >
                    {(props: FormikProps<FormValues>) => {
                        const {
                            values,
                            touched,
                            errors,
                            handleBlur,
                            handleChange,
                            isSubmitting,
                        } = props
                        return (

                            <Form className="justify-content-center">
                                {/* {this.state.mode=="Add"?values=this.state.values:values} */}
                                <Grid
                                    container
                                    justify="space-around"
                                    direction="row"
                                >
                                    <Grid
                                        item
                                        lg={10}
                                        md={10}
                                        sm={10}
                                        xs={10}
                                        className="input-group-prepend"
                                    >
                                        <TextField
                                            name="userName"
                                            id="userName"
                                            label="User Name"
                                            value={values.userName}
                                            type="text"
                                            helperText={
                                                errors.userName && touched.userName
                                                    ? errors.userName
                                                    : 'Enter your user name.'
                                            }
                                            error={
                                                errors.userName && touched.userName
                                                    ? true
                                                    : false
                                            }
                                            onChange={handleChange}

                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        lg={10}
                                        md={10}
                                        sm={10}
                                        xs={10}
                                        className="input-group-prepend"
                                    >
                                        <TextField
                                            name="firstName"
                                            id="firstName"
                                            label="First Name"
                                            value={values.firstName}
                                            type="text"
                                            helperText={
                                                errors.firstName && touched.firstName
                                                    ? errors.firstName
                                                    : 'Enter your first name.'
                                            }
                                            error={
                                                errors.firstName && touched.firstName
                                                    ? true
                                                    : false
                                            }
                                            onChange={handleChange}

                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        lg={10}
                                        md={10}
                                        sm={10}
                                        xs={10}
                                        className="input-group-prepend"
                                    >
                                        <TextField
                                            name="lastName"
                                            id="lastName"
                                            label="Last Name"
                                            value={values.lastName}
                                            type="text"
                                            helperText={
                                                errors.lastName && touched.lastName
                                                    ? errors.lastName
                                                    : 'Enter your last name.'
                                            }
                                            error={
                                                errors.lastName && touched.lastName
                                                    ? true
                                                    : false
                                            }
                                            onChange={handleChange}

                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        lg={10}
                                        md={10}
                                        sm={10}
                                        xs={10}
                                        className="input-group-prepend"
                                    >
                                        <TextField
                                            name="password"
                                            id="password"
                                            label="Password"
                                            value={values.password}
                                            type="text"
                                            helperText={
                                                errors.password && touched.password
                                                    ? errors.password
                                                    : 'Enter your password .'
                                            }
                                            error={
                                                errors.password && touched.password
                                                    ? true
                                                    : false
                                            }
                                            onChange={handleChange}

                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        lg={10}
                                        md={10}
                                        sm={10}
                                        xs={10}
                                        className="input-group-prepend"
                                    >
                                        <TextField
                                            name="email"
                                            id="email"
                                            label="Email"
                                            value={values.email}
                                            type="text"
                                            helperText={
                                                errors.email && touched.email
                                                    ? errors.email
                                                    : 'Enter your email.'
                                            }
                                            error={
                                                errors.email && touched.email
                                                    ? true
                                                    : false
                                            }
                                            onChange={handleChange}

                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        lg={10}
                                        md={10}
                                        sm={10}
                                        xs={10}
                                    >

                                    </Grid>
                                    <Grid
                                        item
                                        lg={10}
                                        md={10}
                                        sm={10}
                                        xs={10}

                                    >
                                        <div className="txt-danger"><strong>{this.state.successMessage}</strong></div>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            className="mb-1"
                                            disabled={isSubmitting}
                                        >
                                            Submit
                                    </Button>
                                    <br/>
                                        <Link
                                            className="mb-5 ml-1"
                                            to={{
                                                pathname: "/"
                                            }}
                                        >
                                            <strong>Back</strong>

                                        </Link>
                                    </Grid>

                                </Grid>




                            </Form>
                        );
                    }}
                </Formik>

            </div>
        );
    }

}

export default AddEditEmployee;