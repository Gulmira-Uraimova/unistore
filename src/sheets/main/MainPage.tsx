import React from 'react'
import green from '../../assets/green.jpg'
import { Button } from '@mui/material'
// import { Button } from '@mui/material'

const MainPage = () => {
  return (
    <>
    
    <div className='w-1200  flex flex-row justify-around'>
     <img src={green} alt="error" className='w-[600px] h-[400px] mt-[50px] ml-[50px]' />
     <div className='w-[500px] h-[400px] flex flex-col justify-between'>
     <p className='text-5xl mt-11'>Грандиозная распродажа! </p>
     <p className='text-4xl mt-11'>Для тех, кто любит выделяться</p>
     {/* <Button className='w-[150px] bg-green-600' variant='outlined'>О нас</Button> */}
     <button className='w-[150px] h-[40px] bg-green-600 rounded-xl'>О нас</button>
     </div>
     
    </div>
    </>
  )
}

export default MainPage