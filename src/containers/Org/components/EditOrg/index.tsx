import { useState, useEffect } from 'react';

import style from './index.module.less';

interface IProp {
  id: string;
  onClose: () => void;
}
/**
* EditOrg 表单
*/
const EditOrg = ({ id, onClose, }: IProp) => {
  const [state, setState] = useState();
  useEffect(() => {
    console.log(state, setState);
  }, []);
  return (<div className={style.container}></div>);
};

export default EditOrg;
