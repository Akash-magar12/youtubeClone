export const convertToMillionBillionK = (number) => {
  if (number >= 1000000000) {
    return `${Math.floor(number / 1000000000)}B`;
  } else if (number >= 1000000) {
    return `${Math.floor(number / 1000000)}M`;
  } else if (number >= 1000) {
    return `${Math.floor(number / 1000)}K`;
  } else {
    return number;
  }
};

export const formatDuration = (duration) => {
  if (!duration) return "0:00";
  return duration
    .replace("PT", "")
    .replace("H", ":")
    .replace("M", ":")
    .replace("S", "")
    .replace(/^:/, "0zzz:");
};
