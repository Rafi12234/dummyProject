import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StudentDashboard from './Components/StudentDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <StudentDashboard/>
  )
}

export default App
