import React from 'react'

import classes from './NavList.css'
import NavItems from './NavItems/NavItems'

const navList = () => (
  <ul className={classes.NavigationList}>
    <NavItems link="/" exact>Burger Builder</NavItems>
    <NavItems link="/orders">Orders</NavItems>
  </ul>
)

export default navList
