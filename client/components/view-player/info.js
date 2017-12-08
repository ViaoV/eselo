import React from 'react'

export default (props) => {
  const { player } = props
  return (
    <div>
      Name: { player.name }
    </div>
  )
}
