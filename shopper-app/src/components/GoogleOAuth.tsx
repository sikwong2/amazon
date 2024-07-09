import React from "react";

function navigate(url: string){
  window.location.href = url
}

async function auth(){
  const response = await fetch ('http://localhost:3015/request',
  {method:'POST'});
  
  const data = await response.json()
  navigate(data.url);
}

const GoogleLoginComponent = () => {
  return (
    <>
   <button type="button" onClick={()=> auth()}>
    GOOGLE OAUTH BUTTON
   </button>
    </>
  );
};

export default GoogleLoginComponent;