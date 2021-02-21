export default class StyleUtils {
  static cls(...classes: (string | undefined)[]): string {
    return classes.filter(c => c !== undefined).join(' ');
  }
}
