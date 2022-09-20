import moment from "moment";

export const calculateAgeYears = (birthday: string): number | string => {
  const age = Math.floor(
    moment(new Date(), "DD-MM-YYYY").diff(
      moment(birthday, "DD-MM-YYYY"),
      "years",
      false
    )
  );
  return age;
};
