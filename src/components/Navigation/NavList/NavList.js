import React from 'react'

import classes from './NavList.css'
import NavItems from './NavItems/NavItems'

const navList = props => (
  <ul className={classes.NavigationList}>
    <NavItems link="/" exact>Burger Builder</NavItems>
    {props.isAuthenticated ? <NavItems link="/orders">Orders</NavItems> : null}
    {!props.isAuthenticated
      ? <NavItems link="/auth">Authenticate</NavItems>
      : <NavItems link="/logout">Logout</NavItems>
    }
  </ul>
)

export default navList
