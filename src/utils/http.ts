import axios from 'axios';
import { timeStringToMinutes } from './helperFunctions';

// axios.defaults.baseURL = 'http://192.168.1.180:8090';

// const baseURL = 'http://localhost:8090';
const baseURL = 'http://192.168.1.180:8090';

export async function insertNewUserInDb(
    uid: string,
    fullname: string,
    email: string
) {
    const response = await axios.post(baseURL + '/users/create-user', {
        id: uid,
        fullname,
        email,
    })
        .then((response) => {
            // console.log(response);
            return response;
        })
        .catch((error) => {
            // console.log(error);
            return error;
        });
    return response;
}

export async function updateNewUser_temp_to_uid(
    uid: string
) {
    const response = await axios.get(baseURL + '/users/change-user-temp-id/' + uid)
        .then((response) => {
            // console.log(response);
            return response;
        })
        .catch((error) => {
            // console.log(error);
            return error;
        });
    return response;
}

export async function createService(
    name: string,
    description: string,
    durationStr: string,
    price: string,
    owner_id: string,
) {

    const durationInMinutes = timeStringToMinutes(durationStr);
    //incorrect decimal value

    const response = await axios.post(baseURL + '/services/create-service', {
        name,
        description,
        duration: durationInMinutes,
        price,
        owner_id,
    })
        .then((response) => {
            // console.log(response);
            return response;
        })
        .catch((error) => {
            // console.log(error);
            return error;
        });
    return response;
}

export async function getAllServices(
    owner_id: string,
) {
    const response = await axios.get(baseURL + '/services/read-all-services/' + owner_id)
        .then((servicesArr) => {
            // console.log(response);
            return servicesArr.data;
        })
        .catch((error) => {
            // console.log(error);
            return error;
        });
    return response;
}