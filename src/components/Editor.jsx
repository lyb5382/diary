import React, { useState } from 'react'
import './Editor.css'
import Button from './Button'
import EmotionItem from './EmotionItem'
import { useNavigate } from 'react-router-dom'

const emotionList = [
    { emotionId: 1, emotionName: "완전 좋음" },
    { emotionId: 2, emotionName: "좋음" },
    { emotionId: 3, emotionName: "그럭저럭" },
    { emotionId: 4, emotionName: "나쁨" },
    { emotionId: 5, emotionName: "끔찍함" }
]

const Editor = ({ onSubmit }) => {
    const nav = useNavigate()
    const [input, setInput] = useState({
        createdDate: new Date(),
        emotionId: 1,
        content: ''
    })
    const changeInput = (e) => {
        let name = e.target.name
        let value = e.target.value
        if (name === 'createdDate') {
            value = new Date(value)
        }
        setInput({
            ...input,
            [name]: value
        })
    }
    const submitButton = () => {
        onSubmit(input)
    }

    return (
        <div className='Editor'>
            <section className="date-section">
                <h4>오늘 날짜</h4>
                <input type="date" name='createdDate' onChange={changeInput} />
                <section className="emtion-section">
                    {emotionList.map((i) => (<EmotionItem key={i.emotionId} {...i} isSelected={i.emotionId == input.emotionId} onClick={() => changeInput({ target: { name: 'emotionId', value: i.emotionId } })} />))}
                </section>
                <section className="content">
                    <h4>오늘의 일기</h4>
                    <textarea placeholder='오늘의 일기' value={input.content} name='content' onChange={changeInput}></textarea>
                    <section className="button-section">
                        <Button text={'취소'} onClick={() => nav(-1)} />
                        <Button text={'완성'} type={'POSITIVE'} onClick={submitButton}/>
                    </section>
                </section>
            </section>
        </div>
    )
}

export default Editor