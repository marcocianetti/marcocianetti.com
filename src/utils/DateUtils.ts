import moment, { Moment } from 'moment';
import Config from '../config/Config';

// Locale for Moment
require(`moment/locale/${Config.SiteLanguage}`);

export default class DateUtils {

  static format(date: string): string {
    return moment.utc(date).locale(Config.SiteLanguage).format(Config.DateFormat);
  }

  static parse(date: string): Moment {
    return moment(date, Config.DateFromFormat);
  }

}
