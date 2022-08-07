import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const page: FC = () => {
  return (
    <div>
      In some other page!
      <Link to='/'>Go back home</Link>
    </div>
  );
};

export default page;
