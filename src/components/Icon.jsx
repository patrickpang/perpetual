import React from 'react'

const Icon = ({ children, className }) => (
  <i className={className ? `material-icons ${className}` : 'material-icons'}>{children}</i>
)

export default Icon
