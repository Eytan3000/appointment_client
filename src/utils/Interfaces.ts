export interface Service {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: string;
  img_url: string;
}
export interface AppointmentSignal {
  value: {
    service?: Service;
    uid: string;
    appointment: Appointment;
    client:{
      name:string;
      uid:string;
      phone:string;
    }
  }
}

export interface DailySchedule {

  id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
  is_workDay: number;
  workweek_id: number;
  time_slot_duration: string;
}

export interface Appointment {
  ownerId?: string;
  clientId?: string;
  start: string;
  end: string;
  date: string;
  serviceId?: string;
  note?: string;
}