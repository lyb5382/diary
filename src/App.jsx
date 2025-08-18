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
import { useReducer, useRef } from 'react'

const mockData = [{
  id: 1,
  createdDate: new Date().getTime(),
  emotionId: 1,
  content: "1번 내용"
}, {
  id: 2,
  createdDate: new Date().getTime(),
  emotionId: 2,
  content: "2번 내용"
}]

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state]
    case 'UPDATE':
      return state.map((item) => String(item.id) === String(action.data.id) ? action.data : item)
    case 'DELETE':
      return state.filter((item) => String(item.id) !== String(action.id))
    default:
      return state
  }
}

function App() {
  const [data, dispatch] = useReducer(reducer, mockData)
  const idRef = useRef(3)
  
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: 'CREATE',
      data: { id: idRef.current++, createdDate, emotionId, content }
    })
  }
  const onUdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: 'UPDATE',
      data: { id, createdDate, emotionId, content }
    })
  }
  const onDelete = (id) => {
    dispatch({
      type: 'DELETE',
      id
    })
  }

  return (
    <div>
      <Header
        leftChild={<Button text='left' type="POSITIVE" />}
        title="header title"
        rightChild={<Button text='right' type="NEGATIVE" />}
      />
      <button onClick={() => onCreate(new Date().getTime(), 1, 'hello')}>일기 추가</button>
      <button onClick={() => onUdate(1, new Date().getTime(), 3, '수정')}>일기 수정</button>
      <button onClick={() => onDelete(1, new Date().getTime(), 3, '수정')}>일기 삭제</button>
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
