import axios from 'axios';
import { addDay, formatIsraeliPhoneNumberToE164, formateDateToDD_MM_YYYY, timeStringToMinutes } from './helperFunctions';

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
interface DailySchedule {
    id: number;
    dayName: string;
    start_time: string;
    endTime: string;
    timeSlotDuration: string;
    isWorkDay: boolean;
    hasChanged: boolean;
}
interface Appointment {
    ownerId: string;
    clientId: string;
    start: string;
    end: string;
    date: string;
    serviceId: string;
    note: string;
}
interface AppointmentUpdate {
    start: string;
    end: string;
    serviceId: number;
    note: string;
    date: string;
    appointment_id: number;
}
interface Business {
    ownerId: string;
    name: string;
    address: string;
    phone: string;
}


// axios.defaults.baseURL = 'http://192.168.1.180:8090';

const baseURL = 'http://localhost:8090';
// const baseURL = 'http://192.168.1.180:8090';

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

//create-google-user
export async function insertNewGoogleUserInDb(
    uid: string,
    fullname: string,
    email: string,
) {
    const response = await axios.post(baseURL + '/users/create-google-user', {
        id: uid,
        fullname,
        email
    })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
    return response;
}

export async function getUser(ownerId: string) {
    try {
        const response = await axios.get(baseURL + '/users/read-user/' + ownerId);
        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}



//  ---- services  ---- 
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

export function filterChangedObjects(isWorkDaysArr: DailySchedule[]) {
    return isWorkDaysArr.filter(day => day.hasChanged === true);
}

export async function updateDailySchedule(isWorkDaysArr: DailySchedule[]) { //receive owner_id and returns array of 7 daily schedules
    const changedArr = filterChangedObjects(isWorkDaysArr); //return only days that changed

    try {
        const response = await axios.post(baseURL + '/dailySchedule/update-changed-daily-schedules', {
            changedArr
        });

        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Clients queries

export async function createNewClient(obj: { name: string; phone: string; email: string; uid: string; }) {
    const { name, phone, email, uid } = obj;
    try {
        const response = await axios.post(baseURL + '/clients/create-client', {
            name,
            phone,
            email,
            owner_id: uid,
        });

        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

//clients/get-all-clients/:owner_id
export async function getAllOwnersClients(ownerId: string) {
    try {
        const response = await axios.get(baseURL + '/clients/get-all-clients/' + ownerId);

        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

// get single client by client_id
export async function getClient(clientId: string) {
    try {
        const response = await axios.get(baseURL + '/clients/get-client/' + clientId);

        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}
// check if client exist for owner by phone
export async function checkOwnersClientExistsByPhone(phone: string, owner_id: string) {
    try {
        const response = await axios.get(baseURL + '/clients/get-client-exists-by-phone/?phone=' + phone + '&owner_id=' + owner_id);

        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

// get existing client id for owner by phone
export async function getClientIdByPhone(phone: string, owner_id: string) {
    try {
        const response = await axios.get(baseURL + '/clients/get-client-id-by-phone/?phone=' + phone + '&owner_id=' + owner_id);

        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}
// update client by client_id
export async function updateClient({ name, phone, email, clientId }: { name: string, phone: string, email: string, clientId: string }) {
    console.log(name, phone, email, clientId);

    try {
        const response = await axios.post(baseURL + '/clients/update-client', {
            name,
            phone,
            email,
            client_id: clientId
        });

        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Appointments:

// Create Appointment
export async function createAppointment({ ownerId, clientId, start, end, date, serviceId, note }: Appointment) {
    // console.log(ownerId, clientId, start, end, date, serviceId, note);
    try {
        const response = await axios.post(baseURL + '/appointments/create-appointment', {
            owner_id: ownerId, client_id: clientId, start, end, date, service_id: serviceId, note
        });

        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

// get all Appointments
export async function getAllAppointments(ownerId: string) {
    try {
        const response = await axios.get(baseURL + '/appointments/get-all-owner-appointments/' + ownerId);

        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}
// get all FUTURE Appointments
export async function getAllFutureAppointments(ownerId: string) {
    try {
        console.log(ownerId);

        const response = await axios.get(baseURL + '/appointments/get-all-future-appointments/' + ownerId);

        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

// get single appointment
export async function getAppointment(appointmentId: number) {
    console.log(appointmentId);

    try {
        const response = await axios.get(baseURL + '/appointments/get-appointment/' + appointmentId);

        return response.data[0];


    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Update Appointment
export async function updateAppointment({ start, end, serviceId, note, date, appointment_id }: AppointmentUpdate) {
    console.log(start, end, serviceId, note, date, appointment_id);

    try {
        const response = await axios.post(baseURL + '/appointments/update-appointment', {
            start, end, serviceId, note, date, appointment_id
        });

        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Delete Appointment
export async function deleteAppointment(appointmentId: string) {
    try {
        const response = await axios.delete(baseURL + '/appointments/delete-appointment/' + appointmentId);

        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

///
// Check overlapping Appointment
export async function checkOverlappingAppointment(start: string, end: string, date: string, owner_id: string) {
    // console.log(start,
    //     end,
    //     date,
    //     owner_id);

    try {
        const response = await axios.post(baseURL + '/appointments/check-overlap', {
            start,
            end,
            date,
            owner_id
        });

        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

// console.log(await checkOverlappingAppointment(

//     "15:30",
//     "17:31",
//     "2023-11-28",
//     "nbl4kT3L2pNLEcZ1W4zQAzfcUsA3",

// ));

// -----------------------


export async function fetchAppointments(ownerId: string) {
    try {
        const appointmentsResponse = await axios.get(baseURL + '/appointments/get-all-owner-appointments/' + ownerId);

        const clientsArr = await getAllOwnersClients(ownerId);
        const servicesArr = await getAllServices(ownerId);



        const appointments = appointmentsResponse.data.map((appointment: Appointment) => {
            const appointmentDate = addDay(appointment.date.split('T')[0]); // fetches one day earlier for some reason.

            const clientObj = clientsArr.filter(client => client.id === appointment.client_id)[0];
            const serviceObj = servicesArr.filter(service => service.id === appointment.service_id)[0];

            return {
                event_id: appointment.id,
                title: clientObj.Name,
                start: new Date(`${appointmentDate} ${appointment.start}`),
                end: new Date(`${appointmentDate} ${appointment.end}`),
                service: {
                    name: serviceObj.name,
                    time: serviceObj.duration,
                },
                description: '',
            };
        })


        return appointments;
        // console.log(response.data);

    } catch (error) {
        console.error(error);
        throw error;
    }
}


// --- Business ---
// Create Business
export async function createBusiness({ ownerId, name, address, phone }: Business) {
    // console.log(ownerId, clientId, start, end, date, serviceId, note);
    try {
        const response = await axios.post(baseURL + '/business/create-business', {
            owner_id: ownerId, name, address, phone
        });

        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Update Business
export async function updateBusiness({ name, address, phone, ownerId }: Business) {

    try {
        const response = await axios.post(baseURL + '/business/update-business', {
            name, address, phone, owner_id: ownerId
        });

        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

// getBusiness
export async function getBusiness(ownerId: string) {
    try {
        const response = await axios.get(baseURL + '/business/get-business/' + ownerId);
        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}




// Send creation appointment client message summary
export async function sendNewAppointmentMessageClient(
    Clientname: string,
    Ownername: string,
    date: string,
    startTime: string,
    duration: string,
    businessAddress: string,
    phone: string
) {

    // formate date, startTime
    const formattedDate = formateDateToDD_MM_YYYY(date);
    const formattedPhone = formatIsraeliPhoneNumberToE164(phone);

    try {
        const response = await axios.post(baseURL + '/send-message/client-new-appointment', {
            Clientname,
            Ownername,
            date: formattedDate,
            startTime,
            duration,
            businessAddress,
            phone: formattedPhone
        });
        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}
