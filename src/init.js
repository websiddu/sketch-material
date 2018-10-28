import {MDPanel} from './panel/index';
import CONSTS from './common/constants';

export default function() {
  const options = {
    identifier: 'unique.id',
    width: 320,
    height: 524,
    url: CONSTS.baseURL + 'm2'
  }

  var panel = new MDPanel(options);

}
