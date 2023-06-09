import React, { useEffect, useState } from 'react'
import AdminViewCard from './AdminViewCard'
import Loading from '../UI/Loading'
import { pastBooking, upcomingBooking } from '../../utils/utils'

function AdminView () {
  const [bookedList, setBookedList] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const defaultFetch = async () => {
      setLoading(true)
      const data = await upcomingBooking()
      setLoading(false)
      setBookedList(data.data)
    }
    defaultFetch()
  }, [])

  // useEffect(()=>{

  // },[])
  const blurHandler = async e => {
    if (e.target.value === 'past') {
      setLoading(true)
      const data = await pastBooking()
      setLoading(false)
      setBookedList(data.data)
      // console.log(data)
    }
    if (e.target.value === 'future') {
      setLoading(true)
      const data = await upcomingBooking()
      setLoading(false)
      setBookedList(data.data)
      // console.log(data)
    }
  }
  const content = bookedList.map(item => (
    <AdminViewCard key={item._id} item={item} />
  ))
  return (
    <div>
      <select onChange={blurHandler}>
        <option value='future'>Upcoming Booking</option>
        <option value='past'>Past Booking</option>
      </select>
      {loading ? <Loading /> : content}
    </div>
  )
}

export default AdminView
