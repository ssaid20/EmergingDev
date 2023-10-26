import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from 'qs';


export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (created_at) => {
  const now = new Date();
  const createdAt = new Date(created_at);
  console.log("createdat", created_at);
  const timeDifference = now.getTime() - createdAt.getTime();
  console.log("timeDif: ", timeDifference, createdAt);

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (timeDifference < minute) {
    const seconds = Math.floor(timeDifference / 1000);
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  } else if (timeDifference < hour) {
    const minutes = Math.floor(timeDifference / minute);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (timeDifference < day) {
    const hours = Math.floor(timeDifference / hour);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (timeDifference < week) {
    const days = Math.floor(timeDifference / day);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (timeDifference < month) {
    const weeks = Math.floor(timeDifference / week);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (timeDifference < year) {
    const months = Math.floor(timeDifference / month);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(timeDifference / year);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
};

export const formatAndDivideNumber = (num) => {
  if (num >= 1000000) {
    const formattedNum = (num / 1000000).toFixed(1);
    console.log("fn", typeof formattedNum);
    console.log("fnS", typeof formattedNum);
    return `${formattedNum}M`;
  } else if (num >= 1000) {
    const formattedNum = (num / 1000).toFixed(1);
    return `${formattedNum}K`;
  } else {
    return `${num}`;
  }
};



export const assignBadges = (params) => {
  const badgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };
  const criteria = params.criteria;
  criteria.forEach((item) => {
    const type = item.type;
    const count = item.count;
    const badgeLevels = BADGE_CRITERIA[type];
    Object.keys(badgeLevels).forEach((level) => {
      if (count >= badgeLevels[level]) {
        badgeCounts[level] += 1;
      }
    });
  });
  return badgeCounts;
}


