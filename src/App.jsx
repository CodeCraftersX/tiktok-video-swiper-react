import { useState } from 'react'

import './App.css'
import PrivateSection from './component/PrivateSection/PrivateSection'
import backGroundImage from '../src/assets/-5793909568500250248_121~2.jpg'

function App() {
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0)

  return (
    <>
      <PrivateSection backGroundImage={backGroundImage}/>
    </>
  )
}

export default App
