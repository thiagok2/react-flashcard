import {get, create, remove, edit} from './httpService';
import { getNewId } from './idService';

export async function getAllCards(){
  const result = await get('flashcards');
  return result;
}

export async function getCard(cardId){
  const result = await get(`flashcards/${cardId}`);
  return result;
}

export async function deleteCard(cardId){
  await remove(`flashcards/${cardId}`);
}

export async function editCard({id, title, description}){
  const cardUpdated = await edit(`flashcards/${id}`, {
    title, 
    description
  });

  return cardUpdated;
}


export async function createCard({title, description}){
  const cardCreated = await create(`flashcards/`, {
    id: getNewId(),
    title, 
    description
  });
  console.log('createCard');
  console.log(JSON.stringify(cardCreated))
  return cardCreated;
}

