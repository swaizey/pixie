import React from 'react';

import Style from '@/app/component/loader.module.css'

export function Loader() {
  return (
    <div className={Style.App}>
      <div className={Style.loader}></div>
    </div>
  );
}
