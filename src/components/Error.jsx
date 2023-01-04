import React from 'react'

export default function Error({children: message}) {
  return (
    <div style={{backgroundColor: 'red', padding: 5, margin: 20}}>{message}</div>
  )
}
