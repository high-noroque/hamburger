import React from 'react'

import classes from './NavList.css'
import NavItems from './NavItems/NavItems'

const navList = () => (
  <ul className={classes.NavigationList}>
    <NavItems link="/" active>Burger Builder</NavItems>
    <NavItems link="/">Checkout</NavItems>
  </ul>
)

export default navList
