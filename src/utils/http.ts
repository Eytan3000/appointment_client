import axios from 'axios';

// axios.defaults.baseURL = 'http://192.168.1.180:8090';

const baseURL = 'http://localhost:8090';
// const baseURL = 'http://192.168.1.180:8090';

export async function insertNewUserInDb(
    uid: string,
    fullname: string,
    email: string
) {
    axios.post(baseURL + '/users/create-user', {
        id: uid,
        fullname,
        email,
    })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
}