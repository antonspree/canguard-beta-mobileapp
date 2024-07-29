export const getMaxDate = () => {
  const today = new Date();

  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  return maxDate;
};

export const formatedate = (param: string) => {
  const date = new Date(param);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const monthResult = month < 10 ? `0${month}` : month;
  const dayResult = day < 10 ? `0${day}` : day;

  const result = `${dayResult}-${monthResult}-${year}`;

  return result;
};

export const isEmpty = (value: any) => {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === "string" && value.trim() === "") {
    return true;
  }

  if (Array.isArray(value) && value.length === 0) {
    return true;
  }

  if (typeof value === "object" && Object.keys(value).length === 0) {
    return true;
  }

  return false;
};

export const getCleanDate = (param: string, type: number) => {
  const date = new Date(param);

  const monthNames = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const currentYear = new Date().getFullYear();
  const age = currentYear - year;
  const ageString = `(${age} Jahre)`;

  let cleanDate;

  if (type === 1) {
    cleanDate = `${day}. ${month} ${year} ${ageString}`;
  } else {
    cleanDate = `${day}. ${month} ${year}`;
  }

  return cleanDate;
};
