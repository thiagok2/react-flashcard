import TextInput from './TextInput';
import TextArea from './TextArea';
import { useEffect, useState } from 'react';
import Button from './Button';
import Error from './Error';

export default function FlashCardForm({
  createMode = true,
  onPersist = null,
  children: flashCard = null,
}) {
  const [title, setTitle] = useState(flashCard?.title || '');
  const [description, setDescription] = useState(flashCard?.description || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (createMode) {
      setTitle('');
      setDescription('');
    }
  }, [createMode]);

  function handleTitleChange(newTitle) {
    setTitle(newTitle);
  }

  function handleDescriptionChange(newDescription) {
    setDescription(newDescription);
  }

  function clearFields() {
    console.log('reset');
    setTitle('');
    setDescription('');
  }

  function validateForm() {
    return title.trim() !== '' && description.trim() !== '';
  }

  function handleFormSubmit(event) {
    console.log('submit');
    event.preventDefault();

    if (validateForm()) {
      setError('');

      if (onPersist) {
        onPersist(title, description);
        clearFields();
      }
    } else {
      setError('Título e Descrição são obrigatórios.');
    }
  }

  function handleFormReset() {
    clearFields();
  }

  const backgroundName = createMode ? 'green' : 'yellow';

  return (
    <form
      style={{backgroundColor: backgroundName, padding: 40}}
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
    >
      <h2 style={{textAlign:'center', fontWeight:'bold'}}>Manutenção de Flash Cards</h2>

      <TextInput
        labelDescription="Título:"
        inputValue={title}
        onInputChange={handleTitleChange}
      />
      <TextArea
        labelDescription="Descrição:"
        textAreaValue={description}
        onTextAreaChange={handleDescriptionChange}
      />
      {/** flex items-center justify-between*/}
      <div style={{display: 'flex', alignItems: 'center', justifyContent:'space-between'}}>
        {error.trim() !== '' ? <Error>{error}</Error> : <span>&nbsp;</span>}

        <div>
          <Button type="reset">
            Limpar
          </Button>

          <Button  type="submit">
            Salvar
          </Button>
        </div>
      </div>
    </form>
  );
}
