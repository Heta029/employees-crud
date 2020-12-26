import React, { useState, useContext } from 'react'
import { Button, Modal, ModalBody } from "reactstrap";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { IProps, IModal } from '../../types/propTypes/index'
import { useTranslation } from 'react-i18next';
import { addOrEdit as AddOrEdit } from '../../api/Employee'
import { EmployeeStoreContext } from '../../Stores/employeeStore';
import { observer } from 'mobx-react';

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
const MyModal = ({ children, trigger }: IProps) => {
    const { t, i18n } = useTranslation();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <div>
            {React.cloneElement(trigger, { onClick: toggle })}
            <Modal isOpen={modal} toggle={toggle}>
                <ModalBody>{children}
                    <button onClick={() => { setModal(false) }} className="btn" style={{ background: "linear-gradient(60deg, #ab47bc, #8e24aa)", color: "white" }}><strong>{t("close")}</strong></button>
                </ModalBody>
            </Modal>
        </div>
    );
};

export const ModalFunction = observer((props: IModal) => {
    const employeeStore = useContext(EmployeeStoreContext);
    const [personName, setPersonName] = React.useState<string[]>([]);
    const names = Object.keys(employeeStore.employee).map((key: any) => (
        employeeStore.employee[key].team == 'none' && key != props.currentId ? employeeStore.employee[key].userName : null
    ));

    var [value, setValue] = useStateWithCallbackLazy({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        team: 'none',
    });

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPersonName(event.target.value as string[]);
    };

    const { t, i18n } = useTranslation();
    const handleAdd = () => {
        personName.map((key: any) => (
            Object.keys(employeeStore.employee).map((Emp: any) =>
            (
                employeeStore.employee[Emp].userName === key ?
                    setValue({
                        userName: employeeStore.employee[Emp].userName,
                        firstName: employeeStore.employee[Emp].firstName,
                        password: employeeStore.employee[Emp].password,
                        email: employeeStore.employee[Emp].email,
                        lastName: employeeStore.employee[Emp].lastName,
                        team: employeeStore.employee[props.currentId].userName
                    }, () => {
                        AddOrEdit(value, Emp);
                    }) : null
            ),
                console.log(key)
            )
        ))
    }

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
        <MyModal trigger={<Button className="btn" style={{ background: "linear-gradient(60deg, #ab47bc, #8e24aa)", color: "white" }}><strong>Show</strong></Button>}>
            <div>
                <label style={{ color: "#8e24aa" }}><strong>{t("multiSelect")}</strong></label>
                <br />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-chip-label">{t("team")}</InputLabel>
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
                        {names.map((name: any) => (
                            <MenuItem key={name} value={name == null ? '' : name} style={getStyles(name == null ? '' : name, personName, theme)}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br />
                <button className="btn mb-5" style={{ background: "linear-gradient(60deg, #ab47bc, #8e24aa)", color: "white" }} onClick={handleAdd} >{t("Add")}</button>
                <table className="table table-borderless table-stripped">
                    <thead className="thead-light">
                        <tr className="border border-danger">
                            <th style={{ background: "linear-gradient(60deg, #ab47bc, #8e24aa)", color: "white" }}>{t("firstName")}</th>
                            <th style={{ background: "linear-gradient(60deg, #ab47bc, #8e24aa)", color: "white" }}>{t("lastName")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(employeeStore.employee).map((key: any) => {
                                if (props.currentId == '' || props.currentId == undefined || employeeStore.employee == {} || employeeStore.employee == undefined) {
                                    console.log(employeeStore.employee)
                                    return null;
                                }
                                if (employeeStore.employee[key].team == employeeStore.employee[props.currentId].userName) {
                                    return (
                                        <tr key={key}>
                                            <td style={{ border: "1px solid #8e24aa" }}>{employeeStore.employee[key].firstName}</td>
                                            <td style={{ border: "1px solid #8e24aa" }}>{employeeStore.employee[key].lastName}</td>
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
})
