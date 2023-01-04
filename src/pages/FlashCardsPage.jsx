import { useEffect, useState } from 'react';
import Button from '../components/Button';
import FlashCard from '../components/FlashCard';
import FlashCards from '../components/FlashCards';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Main from '../components/Main';
import RadioButton from '../components/RadioButton';
import { allFlashCards } from '../data/allFlashCards';
import { helperShuffleArray } from '../helpers/arrayHelpers';
import { getAllCards } from '../services/apiService';
import FlashCardDetail from './FlashCardDetail';

export default function FlashCardsPage() {
  const [allCards, setAllCards] = useState([]);
  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);
  const [selectedFlashCard, setSelectedFlashCard] = useState(null);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load(){
      const result = await getAllCards();
      setAllCards(result);

      setTimeout(() => {
        setLoading(false);
      }, 2000)
    }

    load()
  },[])

  function handleButtonClick() {
    const shuffledCards = helperShuffleArray(allCards);

    setAllCards(shuffledCards);
  }

  function handleRadioShowDescriptionClick() {
    // prettier-ignore
    const updatedCards = 
      [...allCards].map(card => ({...card, showTitle: false}));

    setAllCards(updatedCards);
    setRadioButtonShowTitle(false);
  }

  function handleRadioShowTitleClick() {
    // prettier-ignore
    const updatedCards = 
      [...allCards].map(card => ({...card, showTitle: true}));

    setAllCards(updatedCards);

    setRadioButtonShowTitle(true);
  }

  function handleToggleFlashCard(cardId) {
    const updatedCards = [...allCards];
    const cardIndex = updatedCards.findIndex(card => card.id === cardId);
    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;

    setAllCards(updatedCards);
  }

  function handleSelectedFlashCard(cardId){
    const selected = allCards.find(flashCard => flashCard.id === cardId);
    setSelectedFlashCard(selected);
  }

  if(loading){
    return (
      <div style={{display: 'flex', justifyContent:'center', marginTop: 100}}>
        <Loading></Loading>
      </div>
    )
  }

  return (
    <>
      <Header>react-flash-cards-v1</Header>
      <Main>
        <div className="text-center mb-4">
          <Button onButtonClick={handleButtonClick}>Embaralhar cards</Button>
        </div>

        <div className="flex flex-row items-center justify-center space-x-4 m-4">
          <RadioButton
            id="radioButtonShowTitle"
            name="showInfo"
            buttonChecked={radioButtonShowTitle}
            onButtonClick={handleRadioShowTitleClick}
          >
            Mostrar título
          </RadioButton>

          <RadioButton
            id="radioButtonShowDescription"
            name="showInfo"
            buttonChecked={!radioButtonShowTitle}
            onButtonClick={handleRadioShowDescriptionClick}
          >
            Mostrar descrição
          </RadioButton>
        </div>

        {selectedFlashCard && <FlashCardDetail>{selectedFlashCard}</FlashCardDetail>}

        <FlashCards>
          {allCards.map(({ id, title, description, showTitle }) => {
            return (
              <FlashCard
                key={id}
                id={id}
                title={title}
                description={description}
                showFlashCardTitle={showTitle}
                onToggleFlashCard={handleToggleFlashCard}
                onSelected={handleSelectedFlashCard}
              />
            );
          })}
        </FlashCards>

        
      </Main>
    </>
  );
}
