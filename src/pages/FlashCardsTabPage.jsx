import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Button from '../components/Button';
import Error from '../components/Error';
import FlashCard from '../components/FlashCard';
import FlashCardForm from '../components/FlashCardForm';
import FlashCardItem from '../components/FlashCardItem';
import FlashCards from '../components/FlashCards';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Main from '../components/Main';
import RadioButton from '../components/RadioButton';
import { helperShuffleArray } from '../helpers/arrayHelpers';
import { createCard, deleteCard, editCard, getAllCards } from '../services/apiService';
import FlashCardDetail from './FlashCardDetail';

export default function FlashCardsTabPage() {
  const [allCards, setAllCards] = useState([]);
  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);
  const [selectedFlashCard, setSelectedFlashCard] = useState(null);
  
  //Component Loading
  const [loading, setLoading] = useState(true);

  //component Error
  const [error, setError] = useState('');

  const [ createMode, setCreateMode] = useState(false);
  const [ editMode, setEditMode] = useState(false);
  const [ selectedTab, setSelectedTab ] = useState(1);

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

  async function handleDeleteFlashCard(cardId) {
    try {
      await deleteCard(cardId);
      setAllCards(allCards.filter(card => card.id !== cardId));
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  }

  function handleEditFlashCard(card, editionMode) {
    setEditMode(editionMode);
    setCreateMode(false);
    setSelectedTab(2);
    setSelectedFlashCard(card);
  }

  function handleNewFlashCard(){
    setEditMode(true);
    setCreateMode(true);
    setSelectedTab(2);
    setSelectedFlashCard(null);
  }

  async function handlePersist(title, description){
    if(createMode){
      const newFlashCard = await createCard({title, description});
      console.log(JSON.stringify(newFlashCard));
      setAllCards([...allCards, newFlashCard]);
      setError(null);
    }else{
      await editCard( {id: selectedFlashCard.id, title, description});
      const updatedAllCards = allCards.map(c => {
        if(c.id === selectedFlashCard.id)
          return {...selectedFlashCard, title, description};
        return c;
      });
      setAllCards(updatedAllCards);

      setSelectedFlashCard(null);
      setCreateMode(true);
      setError(null);
    }
    
  }

  if(loading){
    return (
      <div style={{display: 'flex', justifyContent:'center', marginTop: 100}}>
        <Loading></Loading>
      </div>
    )
  }

  if(error){
    return <Error message={error}></Error>
  }

  return (
    <>
      <Header>react-flash-cards-v1</Header>
      <Main>
        <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
          <TabList>
            <Tab>Estudos</Tab>
            <Tab>Listagem</Tab>
            <Tab>Cadastro</Tab>
          </TabList>
          <TabPanel>
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

            <Button onButtonClick={handleNewFlashCard}>Novo FlashCard</Button>
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

        

          </TabPanel>
          <TabPanel>
            <Button onButtonClick={handleNewFlashCard}>Novo FlashCard</Button>
            {
              allCards.map(card => {
                return ( 
                  <FlashCardItem key={card.id} onDelete={handleDeleteFlashCard} onEdit={handleEditFlashCard}>
                    {card}
                  </FlashCardItem>
                )
              }

              )
            }
          </TabPanel>
          <TabPanel>
            <FlashCardForm createMode={createMode} editionMode={editMode} onPersist={handlePersist}>
              {selectedFlashCard}
            </FlashCardForm>
          </TabPanel>
        </Tabs>
       
      </Main>
    </>
  );
}
