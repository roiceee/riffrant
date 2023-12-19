// i want a function that formats a timestamp to "weeks, days, hours or minutes ago like in facebook"
// the timestamp is in iso 8601 format

function timeFormatter(timestamp: string): string {
  const converted = Date.parse(timestamp);

  const now = Date.now();
  const seconds = Math.floor((now - converted) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(seconds / 86400);
  const weeks = Math.floor(seconds / 604800);
  const months = Math.floor(seconds / 2592000);
  const years = Math.floor(seconds / 31536000);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    if (minutes == 1) {
      return `${minutes} minute ago`;
    }
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    if (hours == 1) {
      return `${hours} hour ago`;
    }
    return `${hours} hours ago`;
  } else if (days < 7) {
    if (days == 1) {
      return `${days} day ago`;
    }
    return `${days} days ago`;
  } else if (weeks < 4) {
    if (weeks == 1) {
      return `${weeks} week ago`;
    }
    return `${weeks} weeks ago`;
  } else if (months < 12) {
    if (months == 1) {
      return `${months} month ago`;
    }
    return `${months} months ago`;
  } else {
    if (years == 1) {
      return `${years} year ago`;
    }
    return `${years} years ago`;
  }
}

export { timeFormatter };
