import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import Button from '../components/Button'
import Viewer from '../components/Viewer'
import useDiary from '../hook/useDiary'
import useTitle from '../hook/useTitle'

const Diary = () => {
    const params = useParams()
    const nav = useNavigate()
    const curDiaryItem = useDiary(params.id)
    useTitle(`${params.id}번의 다이어리`)

    if (!curDiaryItem) {
        return <div>데이터 로딩중...!</div>
    }
    const { createdDate, emotionId, content } = curDiaryItem
    const title = getStringDate(new Date(createdDate))
    return (
        <div>
            <Header leftChild={<Button text={'<'} title={title} onClick={() => nav(-1)} />} rightChild={<Button text={'✏️'} onClick={() => nav(`/edit/${params.id}`)} />} />
            <Viewer emotionId={emotionId} content={content} />
        </div>
    )
}

export default Diary