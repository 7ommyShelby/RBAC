import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RBACDashboard from './comp/RBACDashboard';
import RBACDashboard2 from './comp/RBACDashboard2';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RBACDashboard />
      {/* <RBACDashboard2 /> */}

    </>
  )
}

export default App
