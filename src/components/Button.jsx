export default function Button({
  children: description = 'Descrição do botão',
  onButtonClick = null,
  type = 'button'
}) {
  function handleButtonClick() {
    if (onButtonClick) {
      onButtonClick();
    }
  }
  return (
    
    <button
      type={type}
      style={{backgroundColor: '#ccc', padding: 10, margin: 5, borderRadius: 5}}
      onClick={handleButtonClick}
    >
      {description}
    </button>
  );
}
