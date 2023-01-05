import { getNewId } from '../services/idService';

export default function TextInput({
  labelDescription = 'Descrição do label:',
  inputValue = 'Valor padrão do input',
  onInputChange = null,
  id = getNewId(),
  autoFocus = false,
}) {
  function handleInputChange({ currentTarget }) {
    if (onInputChange) {
      const newValue = currentTarget.value;
      onInputChange(newValue);
    }
  }

  return (
    <div style={{display:'flex', flexDirection:'column', marginTop:5, marginBlock: 5}}>
      <label style={{fontSize: 0.875,lineHeight: 1.25}} htmlFor={id}>
        {labelDescription}
      </label>

      <input
        autoFocus={autoFocus}
        id={id}
        style={{border: '1px solid', borderColor: 'gray', padding: 5}}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}
