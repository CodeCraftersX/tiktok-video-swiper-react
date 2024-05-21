/* eslint-disable no-unused-vars */
import { useState } from 'react'

import './App.css'
import PrivateSection from './component/PrivateSection/PrivateSection'
import backGroundImage from '../src/assets/-5793909568500250248_121~2.jpg'
import SubscriptionSettingsPage from './component/SubscriptionSettingsPage/SubscriptionSettingsPage'
import NotificationSettings from './component/NotificationSettings/NotificationSettings'

function App() {
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <PrivateSection backGroundImage={backGroundImage}/> */}
      {/* <SubscriptionSettingsPage/> */}
      <NotificationSettings/>
    </>
  )
}

export default App
