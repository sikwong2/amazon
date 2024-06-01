
export default function Loading() {
  const randomNumber = Math.random();
  
  const loading1 = (
    <>
      <h1>
        Loading...
      </h1>
      <img
        src={'https://i.ibb.co/WD8KjzY/loading2.png'}
        alt="Loading"
        width="100%"
        height='100%'
      />
    </>
  )
  const loading2 = (
    <>
      <h1>
        Loading...
      </h1>
      <img
        src={'https://i.ibb.co/L9XMvjG/loading1.png'}
        alt="Loading"
        width="100%"
        height='100%'
      />
    </>
  )

  return (
    <>
      {randomNumber < 0.5 && loading1}
      {randomNumber >= 0.5 && loading2}
    </>
  )
}