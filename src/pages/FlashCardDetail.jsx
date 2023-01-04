import React, { useEffect } from 'react'
import { getCard } from '../services/apiService'

export default function FlashCardDetail({children: flashCard}) {

  useEffect( () => {
    async function load(){
      const detail = await getCard(flashCard.id);
      console.log(detail);
    }
    
    load();
  }

  , [flashCard]);

  return (
    <div  className={`mb-4 shadow-lg p-4 m-2 w-100 h-48 cursor-pointer
    flex flex-row items-center justify-center 
    font-semibold`}>
      <ul>
        <li className='text-xl'>{flashCard.title}</li>
        <li>{flashCard.description}</li>
      </ul>
    </div>
  )
}
