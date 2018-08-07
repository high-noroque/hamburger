import React from 'react'

import classes from './DrawerToggle.css'

const drawerToggle = props => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div key={1} />
    <div key={2} />
    <div key={3} />
  </div>
)

export default drawerToggle
