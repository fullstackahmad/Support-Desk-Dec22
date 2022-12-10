import { useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {getTickets, reset} from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'


function Tickets() {
  const {tickets, isLoading, isError, isSuccess, message } = useSelector((state) => state.tickets)

  const dispatch = useDispatch()

  // SECONDARY USEEFFECT
  // brad says you can use the same useEffect 
  // .. but i prefer to create another one to unmount
  // .. he describes the purpose of this useEffect is to 
  // .. clear the state on UnMount .. ?? i dont get it ..
  useEffect(() => {  
    return () => {
      if(isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])
  

  // THE PRIMARY USEEFFECT
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTickets())
  }, [dispatch, isError, message])
  

  if(isLoading) {
    return <Spinner />
  }


  return (
    <>
      <BackButton url='/' />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>          
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  )
}

export default Tickets