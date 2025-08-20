import React, { useContext } from 'react'
import Editor from '../components/Editor'
import EmotionItem from '../components/EmotionItem'
import Header from '../components/Header'
import Button from '../components/Button'
import { DiaryDispatchContext } from '../App'
import { useNavigate } from 'react-router-dom'

const New = () => {
  const nav = useNavigate()
  const { onCreate } = useContext(DiaryDispatchContext)
  const onSubmit = (input) => {
    onCreate(
      input.createdDate.getTime(),
      input.emotionId,
      input.emotionName
    )
    nav('/', { replace: true })
  }
  return (
    <div>
      <Header title={'새 일기 작성'} leftChild={<Button text={'←'} />} />
      <Editor onSubmit={onSubmit} />
    </div>
  )
}

export default New