import React, { Fragment } from 'react'

import classes from './Layout.css'

const layout = props => {
  return (
    <Fragment>
      <div>Toolbar, Navigation, Backdrop</div>
        <main className={classes.Content}>
        {props.children}
        </main>
    </Fragment>
  )
}

export default layout
