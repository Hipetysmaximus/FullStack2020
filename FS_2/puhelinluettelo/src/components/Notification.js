  import React from 'react'

const Notification = ({message, notifClass}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={notifClass}>
      {message}
    </div>
  )
}

export default Notification