import React from 'react';

import Style from '@/app/component/loader.module.css'

const Loader =()=> {
  return (
    <div className={Style.App}>
      <div className={Style.loader}></div>
    </div>
  );
}
export default Loader;
