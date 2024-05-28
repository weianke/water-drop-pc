import { useState, useEffect } from 'react';

/**
 * 上传组件
 */
const OSSImageUpload = () => {
  const [state, setState] = useState();
  useEffect(() => {
    console.log(state, setState);
  }, []);
  return <div>上传组件</div>;
};

export default OSSImageUpload;
