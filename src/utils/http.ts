import axios from 'axios';
import { timeStringToMinutes } from './helperFunctions';

interface ServiceObject {
    description: string | null;
    duration: string | null;
    name: string | null;
    price: string | null;
    service_id: string | null;
}

// axios.defaults.baseURL = 'http://192.168.1.180:8090';

// const baseURL = 'http://localhost:8090';
const baseURL = 'http://192.168.1.180:8090';

export async function insertNewUserInDb(
    uid: string,
    fullname: string,
    email: string,
    password: string
) {
    console.log(password);
    
    const response = await axios.post(baseURL + '/users/create-user', {
        id: uid,
        fullname,
        email,
        password
    })
        .then((response) => {
            return response;
        })
        .catch((error) => {
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
    // name: string,
    // description: string,
    // durationStr: string,
    // price: string,
    // owner_id: string,
    { name,
        description,
        duration,
        price,
        uid, }:
        {
            name: string,
            description: string,
            duration: string,
            price: string,
            uid: string
        }
) {

    const durationInMinutes = timeStringToMinutes(duration);
    //incorrect decimal value

    const response = await axios.post(baseURL + '/services/create-service', {
        name,
        description,
        duration: durationInMinutes,
        price,
        owner_id: uid,
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

export async function getAllServices(owner_id: string) {
    try {
        const response = await axios.get(baseURL + '/services/read-all-services/' + owner_id);
        return response.data;

    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error for the caller to handle
    }
}

export async function getService(service_id: string) {
    try {
        const response = await axios.get(baseURL + '/services/read-single-service/' + service_id);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function udpateService(serviceObject: ServiceObject) {
    try {
        const response = await axios.post(baseURL + '/services/update-service',
            serviceObject
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteService(service_id: string) {
    try {
        const response = await axios.delete(baseURL + '/services/' + service_id);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}