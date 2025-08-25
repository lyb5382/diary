import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Editor from '../components/Editor'
import Header from '../components/Header'
import Button from '../components/Button'
import { DiaryDispatchContext } from '../App'
import useDiary from '../hook/useDiary'
import useTitle from '../hook/useTitle'

const Edit = () => {
    const nav = useNavigate()
    const params = useParams()
    const { onDelete, onUpdate } = useContext(DiaryDispatchContext)
    const curDiary = useDiary(params.id,{redirectOnMissing:false})
    const onSubmit = (i) => {
        if (window.confirm('수정 완료?')) {
            onUpdate(params.id, i.createdDate.getTime(), i.emotionId, i.content)
            nav('/', { replace: true })
        }
    }
    const onClickDelete = () => {
        if (window.confirm('삭제?')) {
            onDelete(params.id)
            nav('/', { replace: true })
        }
    }
    return (
        <div>
            <Header leftChild={<Button text={'<'} onClick={() => nav(-1)} />} title={'일기 수정'} rightChild={<Button text={'×'} type='NEGATIVE' onClick={onClickDelete} />} />
            <Editor initData={curDiary} onSubmit={onSubmit} />
        </div>
    )
}

export default Edit