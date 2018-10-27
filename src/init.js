import {MDPanel} from './panel/index';
import CONSTS from './common/constants';

export default function() {
  const options = {
    identifier: 'unique.id',
    width: 320,
    height: 512,
    url: CONSTS.baseURL + 'gm_styles'
  }

  var panel = new MDPanel(options);


  // panel.listen('drag-end', Icons.convertSvgToSymbol);

}
