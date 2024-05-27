import { useState, useEffect } from 'react';

/**
 * 个人信息
 */
const My = () => {
  const [state, setState] = useState();
  useEffect(() => {
    console.log(state, setState);
  }, []);
  return <div>sss</div>;
};

export default My;
