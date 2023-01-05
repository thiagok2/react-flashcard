import { getNewId } from '../services/idService';

export default function TextInput({
  labelDescription = 'Descrição do label:',
  textAreaValue = 'Valor padrão do text area',
  onTextAreaChange = null,
  id = getNewId(),
  maxLength = 230,
  rows = 4,
}) {
  function handleInputChange({ currentTarget }) {
    if (onTextAreaChange) {
      const newValue = currentTarget.value;
      onTextAreaChange(newValue);
    }
  }

  const currentCharacterCount = textAreaValue.length;

  return (
    <div style={{display:'flex', flexDirection:'column', marginTop:5, marginBlock: 5}}>
      <label style={{fontSize: 0.875,lineHeight: 1.25}} htmlFor={id}>
        {labelDescription}
      </label>

      <textarea
        id={id}
        style={{border: '1px solid', borderColor: 'gray', padding: 5}}
        maxLength={maxLength}
        rows={rows}
        value={textAreaValue}
        onChange={handleInputChange}
      />

      <div style={{display: 'flex', flexDirection: 'row', justifyContent:'end', marginRight: 5}}>
        <span>
          {currentCharacterCount} / {maxLength}
        </span>
      </div>
    </div>
  );
}
