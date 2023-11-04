import { deleteObject, ref } from "firebase/storage";
import { storage } from "../firebase";

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