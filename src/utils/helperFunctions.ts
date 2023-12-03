import { deleteObject, ref } from "firebase/storage";
import { storage } from "../firebase";
import { DailySchedule } from "./Interfaces";

export function timeStringToMinutes(timeString: string) {
  // Split the time string into hours and minutes
  const [hours, minutes] = timeString.split(':').map(Number);

  // Calculate the total minutes
  const totalMinutes = hours * 60 + minutes;

  return totalMinutes;
}

export function isWholeNumber(price: string) {
  // Use a regular expression to match a string that consists of digits only.
  // The "^" symbol asserts the start of the string and the "$" symbol asserts the end of the string.
  // The regular expression "^\d+$" ensures that the string contains only one or more digits.
  const regex = /^\d+$/;
  return regex.test(price);
}

export function minutesToTimeDuration(minutes: string) {
  if (typeof minutes !== 'number' || minutes < 0) {
    return "Invalid input";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  // Ensure that the hours and minutes are displayed with two digits (e.g., 01 instead of 1)
  const hoursString = hours.toString().padStart(2, '0');
  const minutesString = remainingMinutes.toString().padStart(2, '0');

  return `${hoursString}:${minutesString}`;
}

export function rearrangeByDayOfWeek(array: DailySchedule[]) {
  const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  const rearrangedArray = [];

  // Create an object to store objects by day_of_week
  const dayOfWeekMap = {};
  for (const day of daysOfWeek) {
    dayOfWeekMap[day] = [];
  }

  // Group objects by day_of_week
  for (const item of array) {
    dayOfWeekMap[item.day_of_week.toLowerCase()].push(item);
  }

  // Flatten the grouped objects into the rearrangedArray
  for (const day of daysOfWeek) {
    rearrangedArray.push(...dayOfWeekMap[day]);
  }

  return rearrangedArray;
}


export function copyToClipboard(text: string) {

  const type = "text/plain";
  const blob = new Blob([text], { type });
  const data = [new ClipboardItem({ [type]: blob })];

  navigator.clipboard
    // .writeText(text) //this is for just text, also works.
    .write(data)
    .then(() => {
      console.log('Text copied to clipboard');
    })
    .catch((err) => {
      console.error('Failed to copy text: ', err);
    });
}

export function addMinutesToTime(timeString: string, minutesToAdd: number) {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);

  // Create a Date object with the current date and the provided time
  const originalDate = new Date();
  originalDate.setHours(hours, minutes, seconds);

  // Add the specified minutes
  const newDate = new Date(originalDate.getTime() + minutesToAdd * 60000);

  // Format the result as "HH:mm:ss"
  const formattedTime = `${newDate.getHours().toString().padStart(2, '0')}:${newDate.getMinutes().toString().padStart(2, '0')}:${newDate.getSeconds().toString().padStart(2, '0')}`;

  return formattedTime;
}


// -- firebase --
export function deleteImageFromFirebase(url: string) {
  const imageRef = ref(storage, url);

  // Delete the file
  return deleteObject(imageRef)
    .then(() => {
      return 'Image deleted';
    })
    .catch((error) => {
      return error.code;
    });
}

//-----------------------

export function addDay(dateString: string) {
  const originalDate = new Date(dateString);

  // Adding one day
  const nextDay = new Date(originalDate);
  nextDay.setDate(originalDate.getDate() + 1);

  // Formatting the result as "YYYY-MM-DD"
  const formattedNextDay = `${nextDay.getFullYear()}-${(nextDay.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${nextDay.getDate().toString().padStart(2, '0')}`;

  return formattedNextDay;
}

export function isTimeRangeValid(hour1: string, hour2: string) {

  const date1 = new Date(`2000-01-01 ${hour1}`);
  const date2 = new Date(`2000-01-01 ${hour2}`);

  // Compare the Date objects
  return date1 < date2;
}


export function formatDate(inputDate: string) {
  // Create an array of month names for better readability
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Parse the input date string
  const date = new Date(inputDate);

  // Get the day, month, and year
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Add the ordinal suffix to the day
  const dayWithSuffix = addOrdinalSuffix(day);

  // Get the day of the week
  const dayOfWeek = getDayOfWeek(date.getDay());

  // Construct the formatted date string
  const formattedDate = `${dayOfWeek}, ${month} ${dayWithSuffix}, ${year}.`;

  return formattedDate;
}
//  Function to add ordinal suffix to the day
export function addOrdinalSuffix(day: number) {
  if (day >= 11 && day <= 13) {
    return day + 'th';
  }

  switch (day % 10) {
    case 1:
      return day + 'st';
    case 2:
      return day + 'nd';
    case 3:
      return day + 'rd';
    default:
      return day + 'th';
  }
}

//  Function to get the day of the week
export function getDayOfWeek(dayIndex: number) {
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return dayNames[dayIndex];
}

export function formateDateToDD_MM_YYYY(date: string) { // input: 2020-02-27
  return date.split('-').reverse().join('.');
}

export function formatIsraeliPhoneNumberToE164(phone:string) {
  // Remove non-numeric characters from the input
  const numericOnly = phone.replace(/\D/g, '');

  // Check if the number starts with "0" and remove it
  const withoutLeadingZero = numericOnly.startsWith('0') ? numericOnly.slice(1) : numericOnly;

  // Add the country code for Israel (+972) to the formatted number
  const formattedNumber = `+972${withoutLeadingZero}`;

  return formattedNumber;
}