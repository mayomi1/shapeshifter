import React from 'react';
import styles from './header.module.scss';

const Header: React.FC<{}> = () => {
  return (
    <div className={styles.header}>
      <h1>
        shape shifter
      </h1>
    </div>
  )
};

export default Header;
