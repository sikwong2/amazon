import TopBar from "@/components/TopBar"


export function ComingSoon() {
  return(
    <div style={{ display: 'flex', justifyContent: "center", flexDirection: 'column'}}> 
      <TopBar></TopBar>
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
        <h1> COMING SOON </h1>
      </div>
    </div>
  )
}

