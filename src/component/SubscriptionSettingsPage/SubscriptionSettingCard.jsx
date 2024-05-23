/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import './SubscriptionSettingCard.css'




function SubscriptionSettingCard({className, labelName, children, style}) {
  return (
    <label className={className?className:'SubscriptionSettingCard'} style={style}>
        <h3>{labelName}</h3>
        {children}
    </label>
  )
}

export default SubscriptionSettingCard