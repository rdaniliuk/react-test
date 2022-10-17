import React from 'react';
import classes from './Header.module.css';
import Page from 'components/Page';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className={classes.header}>
      <img
        className={classes.logo}
        src={'https://rdaniliuk-online-store.netlify.app/img/logoe5d3fb1c32b40b4502f3.png'}
      />
      <span>
        <Link className={classes.link} to="/">
          Products
        </Link>
        <Link className={classes.link} to="/about">
          About
        </Link>
        <Link className={classes.link} to="/create">
          Create Product
        </Link>
      </span>
      <h1 className={classes.title}>SANJEZ STORE</h1>
      <Page />
    </div>
  );
};

export default Header;
