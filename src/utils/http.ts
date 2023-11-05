import axios from 'axios';
import { timeStringToMinutes } from './helperFunctions';

interface ServiceObject {
    description: string | null;
    duration: string | null;
    name: string | null;
    price: string | null;
    service_id: string | null;
}
interface DaylySchedule {

    isWorkDay: boolean;
    startTime: string;
    endTime: string;


}
interface DailySchedule {
    day_of_week: string;
    start_time: string;
    end_time: string;
    isWorDay: boolean;
    workWeek_id: number;
}
interface Workweek {
    sunday: DaylySchedule;
    monday: DaylySchedule;
    tuesday: DaylySchedule;
    wednesday: DaylySchedule;
    thursday: DaylySchedule;
    friday: DaylySchedule;
    saturday: DaylySchedule;
    workweek_id: number;
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
    { name,
        description,
        duration,
        price,
        uid,
        img_url }:
        {
            name: string,
            description: string,
            duration: string,
            price: string,
            uid: string,
            img_url: string
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
        img_url: img_url
    })
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            console.log(error);
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

// workWeek
export async function createWorkweek(owner_id: string) {
    try {
        const response = await axios.post(baseURL + '/workweek/create-workweek', {
            owner_id,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function createWeeklySchedule(weekScheduleObj: Workweek) { //receive an object for the week and writes a new row for each day.
    try {
        const response = await axios.post(baseURL + '/dailySchedule/create-7-daily-schedules', {
            weekScheduleObj,
        });

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getWorkWeek(owner_id: string) { //receive owner_id and returns array of 7 daily schedules
    try {
        const { data: workWeekId } = await axios.get(baseURL + '/workweek/read-workweek-id/' + owner_id);

        const response = await axios.get(baseURL + '/dailySchedule/read-weekly-schedule/' + workWeekId);

        const weeklyScheduleArray = response.data;

        return weeklyScheduleArray;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function workWeekScheduleUpdater(){

}

export async function updateDailySchedule(dailySchedule: DailySchedule) { //receive owner_id and returns array of 7 daily schedules
    try {
        const { data: workWeekId } = await axios.post(baseURL + '/dailySchedule/update-daily-schedule', {
            dailySchedule
        });

        const response = await axios.get(baseURL + '/dailySchedule/read-weekly-schedule/' + workWeekId);

        const weeklyScheduleArray = response.data;

        return weeklyScheduleArray;

    } catch (error) {
        console.error(error);
        throw error;
    }
}
