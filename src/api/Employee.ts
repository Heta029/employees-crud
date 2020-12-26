import firebaseDb from "../firebase/firebase";

export const addOrEdit = (obj: Object, currentId: string) => {
    if (currentId == '')
        firebaseDb.child('employee-crud').push(
            obj,
            err => {
                if (err)
                    console.log(err)
            })
    else
        firebaseDb.child(`employee-crud/${currentId}`).set(
            obj,
            err => {
                if (err)
                    console.log(err)
            })
}

export const onDelete = (id: string) => {
    console.log(id);
    if (window.confirm('Are you sure to delete this record?')) {
        firebaseDb.child(`employee-crud/${id}`).remove(
            err => {
                if (err)
                    console.log(err)
            })
    }
}

