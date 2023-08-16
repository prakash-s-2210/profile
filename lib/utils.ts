import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const timeAgo = ( date:Date ):string => {
    const currentDate:Date = new Date();
    const providedDate: Date = new Date(date);
    const timeDifference = currentDate.getTime() - providedDate.getTime();

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 12 * month;

    if (timeDifference < minute) {
      return 'Just now';
    } else if (timeDifference < hour) {
      const minutes = Math.floor(timeDifference / minute);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (timeDifference < day) {
      const hours = Math.floor(timeDifference / hour);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (timeDifference < month) {
      const days = Math.floor(timeDifference / day);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (timeDifference < year) {
      const months = Math.floor(timeDifference / (30 * day));
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(timeDifference / year);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
}
