import moment from "moment";

class FormatDate {
  static execute(date: string, format: string = "DD/MM/YYYY"): string {
    const dateFormatted = moment(date).format(format.toUpperCase());
    return dateFormatted;
  }
}

export { FormatDate };
