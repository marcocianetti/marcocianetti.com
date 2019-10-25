import Config from '../config/Config';

export default class PageUtils {

  static generateTitle(title: string): string {
    return `${title} ${Config.TitleDivider} ${Config.SiteTitle}`;
  }

}
