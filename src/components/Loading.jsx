import React from 'react';
import LoadingLogo from "/LoadingLogo.gif";

const Loading = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center bg-[#000]'>
      <img className='w-[60vw] sm:w-[30vw] object-cover' src={LoadingLogo} alt="" />
    </div>
  )
}

export default Loading;