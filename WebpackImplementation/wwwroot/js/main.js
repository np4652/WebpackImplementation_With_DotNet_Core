

import { coreLib } from './coreLib.js';
const { notify } = coreLib();

export function Index(sts,msg) {
    notify(sts, msg);
}
Index(-1, 'Fail');
Index(1, 'Success');
Index(2, 'Warning');
Index(3, 'Info');