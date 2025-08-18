import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Diary from './pages/Diary'
import Edit from './pages/Edit'
import Home from './pages/Home'
import New from './pages/New'
import Notfound from './pages/Notfound'
import { getEmotionImage } from './util/getEmotionImage'
import Header from './components/Header'
import Button from './components/Button'

function App() {

  return (
    <div>
      <Header
        leftChild={<Button text='left' type="POSITIVE" />}
        title="header title"
        rightChild={<Button text='right' type="NEGATIVE" />}
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new' element={<New />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/diary/:id' element={<Diary />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
    </div>
  )
}

export default App
