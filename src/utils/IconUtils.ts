import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

export default class IconUtils {

  static initLibrary() {
    library.add(fab);
  }

}
