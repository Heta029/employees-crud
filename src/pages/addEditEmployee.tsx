import React from 'react';
import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup';
import { Grid, TextField, Button } from '@material-ui/core'
import firebaseDb from "../firebase/firebase";
import { addOrEdit as AddorEdit } from '../api/Employee';
import { IdetailProp } from '../types/propTypes/index';
import { IProp, FormValues } from '../types/stateTypes/index'
import { withTranslation } from 'react-i18next';

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
                    }, () => {
                        if (this.props.match.params.key != null) {
                            this.setState({ values: snapshot.val()[this.state.key] })
                        }
                    });
                }
            })
        }
    }

    handleSubmit = (values: FormValues): void => {
        const { t } = this.props;
        if (this.state.key == undefined || this.state.key == '') {
            AddorEdit(values, '');
            this.setState({ successMessage: t("successAdd") })
        }
        else {
            AddorEdit(values, this.state.key);
            this.setState({ successMessage: t("successEdit") })
        }

    };

    render() {
        const { t } = this.props;
        const userNames =
            Object.keys(this.state.employeeObjects).map((key) => (
                key == this.state.key ? null : this.state.employeeObjects[key].userName
            ));
        const validation = Yup.object().shape({
            userName: Yup.string()
                .min(2, t("tooShort"))
                .notOneOf(userNames, t("usernameTaken"))
                .required(t("required")),
            email: Yup.string()
                .lowercase()
                .email(t("validEmail"))
                .required(t("required")),
            password: Yup.string()
                .min(8, t("passwordLength"))
                .required(t("required")),
            firstName: Yup.string().required(t("required")),
            lastName: Yup.string().required(t("required")),
        });

        return (
            <div className="container mt-5 " style={{ border: "1px solid #8e24aa" }}>
                <Formik
                    enableReinitialize
                    initialValues={this.state.values}
                    onSubmit={this.handleSubmit}
                    validationSchema={validation}
                >
                    {(props: FormikProps<FormValues>) => {
                        const {
                            values,
                            touched,
                            errors,
                            handleChange,
                        } = props
                        return (
                            <Form className="justify-content-center">
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
                                            label={t("userName")}
                                            value={values.userName}
                                            type="text"
                                            className="mt-5"
                                            helperText={
                                                errors.userName && touched.userName
                                                    ? errors.userName
                                                    : t("enterUsername")
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
                                            label={t("firstName")}
                                            value={values.firstName}
                                            type="text"
                                            className="mt-3"
                                            helperText={
                                                errors.firstName && touched.firstName
                                                    ? errors.firstName
                                                    : t("enterFirstname")
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
                                            label={t("lastName")}
                                            value={values.lastName}
                                            type="text"
                                            className="mt-3"
                                            helperText={
                                                errors.lastName && touched.lastName
                                                    ? errors.lastName
                                                    : t("enterLastname")
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
                                            label={t("password")}
                                            value={values.password}
                                            type="text"
                                            className="mt-3"
                                            helperText={
                                                errors.password && touched.password
                                                    ? errors.password
                                                    : t("enterPassword")
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
                                            label={t("email")}
                                            value={values.email}
                                            type="text"
                                            className="mt-3"
                                            helperText={
                                                errors.email && touched.email
                                                    ? errors.email
                                                    : t("enterEmail")
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
                                        <div style={{ color: "#8e24aa" }}><strong>{this.state.successMessage}</strong></div>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            className="mb-5 mt-3"
                                            style={{ background: "linear-gradient(60deg, #ab47bc, #8e24aa)", color: "white" }}
                                        >
                                            {t("submit")}
                                        </Button>
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

export default withTranslation()(AddEditEmployee);