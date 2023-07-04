import React, { PropsWithChildren } from 'react';

function layout(props: PropsWithChildren<{ modal?: React.ReactNode }>) {
  return (
    <>
      {props.modal}
      {props.children}
    </>
  );
}

export default layout;
