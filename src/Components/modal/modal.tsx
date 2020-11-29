import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalBody } from "reactstrap";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import { addOrEdit as AddOrEdit } from '../../api/Employee';
import firebaseDb from "../../firebase/firebase";
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import {IProps,IModal} from '../../types/propTypes/index'
import {IObjectEmployee} from '../../types/stateTypes/index'



function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const MyModal = ({ children, trigger }: IProps) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <div>
            {React.cloneElement(trigger, { onClick: toggle })}
            <Modal isOpen={modal} toggle={toggle}>
                <ModalBody>{children}
                    <button onClick={() => { setModal(false) }} className="btn btn-primary"><strong>Close</strong></button>
                </ModalBody>
            </Modal>
        </div>
    );
};

export const ModalFunction = (props: IModal) => {

    const [personName, setPersonName] = React.useState<string[]>([]);
    const names = Object.keys(props.employeeObjects).map((key) => (
        props.employeeObjects[key].team == 'none' && key != props.currentId? props.employeeObjects[key].userName : null
    ));


    var [employee, setEmployee] = useState<IObjectEmployee>({});
    let teamValue = props.employeeObjects[props.currentId].firstName;
    var [value, setValue] = useStateWithCallbackLazy({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        team: 'none',
    });

    useEffect(() => {

        firebaseDb.child('employee-crud').on('value', snapshot => {
            if (snapshot.val() != null) {
                setEmployee({
                    ...snapshot.val()
                })
                    ;
            }
        })

    }, [])


    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPersonName(event.target.value as string[]);

        personName.map((key) => (
            Object.keys(props.employeeObjects).map((Emp) => {
                return (

                    setValue({
                        userName: employee[Emp].userName,
                        firstName: employee[Emp].firstName,
                        password: employee[Emp].password,
                        email: employee[Emp].email,
                        lastName: employee[Emp].lastName,
                        team: employee[props.currentId].userName
                    }, (currentValue: IObjectEmployee) => {
                        props.employeeObjects[Emp].userName == key ? AddOrEdit(currentValue,Emp):console.log(currentValue);
                    })

               
            )
            }

            )
        ))
    };



    // const handleAdd = () => {
    //     console.log('hi');
    //     let teamValue = props.employeeObjects[props.currentId].firstName;
    //     personName.map((key) => (
    //         Object.keys(props.employeeObjects).map((Emp) =>
    //             (
    //                 props.employeeObjects[Emp].userName == key ? setEmployee({ ...employee, [key]: { team: teamValue } }) : null
    //             )
    //         )
    //     ))
    // }

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            formControl: {
                margin: theme.spacing(1),
                minWidth: 120,
                maxWidth: 300,
            },
            chips: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            chip: {
                margin: 2,
            },
            noLabel: {
                marginTop: theme.spacing(3),
            },
        }),
    );

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const classes = useStyles();
    const theme = useTheme();
  
    return (

        <MyModal trigger={<Button className="btn btn-primary"><strong>Show</strong></Button>}>
            <div>
                <label>Select team member to add:</label>
                <br />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-chip-label">team</InputLabel>
                    <Select
                        labelId="demo-mutiple-chip-label"
                        id="demo-mutiple-chip"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={(selected) => (
                            <div className={classes.chips}>
                                {(selected as string[]).map((value) => (
                                    <Chip key={value} label={value} className={classes.chip} />
                                ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                    >
                        {names.map((name) => (
                            <MenuItem key={name} value={name == null ? '' : name} style={getStyles(name == null ? '' : name, personName, theme)}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br />
                <button className="btn btn-primary mb-5" >Add</button>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(props.employeeObjects).map((key) => {
                                if (props.currentId == '' || props.currentId == undefined || props.employeeObjects == {} || props.employeeObjects == undefined) {
                                    return null;
                                }
                                if (props.employeeObjects[key].team == props.employeeObjects[props.currentId].firstName) {
                                    return (
                                        <tr key={key}>
                                            <td>{props.employeeObjects[key].firstName}</td>
                                            <td>{props.employeeObjects[key].lastName}</td>
                                        </tr>

                                    );
                                }
                            }
                            )
                        }

                    </tbody>
                </table>
            </div>
        </MyModal>
    )
}
