import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faBookReader, faCalendarAlt, faShareAlt } from '@fortawesome/free-solid-svg-icons'

export default class IconUtils {

  static initLibrary() {
    library.add(fab, faBookReader, faCalendarAlt, faShareAlt);
  }

}
