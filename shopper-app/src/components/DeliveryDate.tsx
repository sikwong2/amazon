

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Returns date {offset} days from today
export default function RandomDeliveryDate({offset}: any){
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + offset);
  return (
    <>
      {days[nextWeek.getDay()]}, {months[nextWeek.getMonth()]} {nextWeek.getDate()}
    </>
  )
}