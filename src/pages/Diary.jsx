import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import Button from '../components/Button'
import Viewer from '../components/Viewer'
import useDiary from '../hook/useDiary'

const Diary = () => {
    const { id } = useParams()
    const nav = useNavigate()
    const curDiary = useDiary(id)
    return (
        <div>
            <Header leftChild={<Button text={'<'} onClick={() => nav(-1)} />} title={'yyyy-mm-dd'} rightChild={<Button text={'✏️'} onClick={()=>nav(`/edit/${id}`)} />} />
            <Viewer />
        </div>
    )
}

export default Diary