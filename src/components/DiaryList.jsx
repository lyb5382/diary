import React, { useState } from 'react'
import './DiaryList.css'
import DiaryItem from './DiaryItem'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const DiaryList = ({ data }) => {
    const nav = useNavigate()
    const [sort, setSort] = useState('latest')
    const onChangeSort = (e) => {
        setSort(e.target.value)
    }
    const getSortData = () => {
        return data.toSorted((a, b) => {
            if (sort === 'oldest') {
                return Number(a.createdDate) - Number(b.createdDate)
            } else {
                return Number(b.createdDate) - Number(a.createdDate)
            }
        })
    }
    const sortData = getSortData()
    return (
        <div className='DiaryList'>
            <div className="menu-bar">
                <select value={sort} onChange={onChangeSort}>
                    <option value="latest">최신순</option>
                    <option value="oldest">오래된순</option>
                </select>
                <Button text={'새 일기 쓰기'} type={'POSITIVE'} onClick={() => nav(`/new`)} />
            </div>
            <div className="list-wrapper">
                {sortData.map((item) => (<DiaryItem key={item.id} {...item} />))}
            </div>
        </div>
    )
}

export default DiaryList