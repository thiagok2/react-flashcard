export default function FlashCard({
  id,
  title = 'Título do card',
  description = 'Descrição do card, que pode conter mais palavras que o título',
  showFlashCardTitle = true,
  onToggleFlashCard = null,
  onSelected = null
}) {
  function handleCardClick() {
    if (onToggleFlashCard) {
      onToggleFlashCard(id);
    }
    if(onSelected)
      onSelected(id);
  }

  const fontStyle = {
      fontSize: showFlashCardTitle ? 24 : 16,
      lineHeight: showFlashCardTitle ? 2 : 1.25 
  }
  
  return (
    <div
      style={{...styles.container, ...fontStyle}}
      onClick={handleCardClick}
    >
      {showFlashCardTitle ? title : description}

      <button onClick={() => {}}></button>
    </div>
  );
}

const styles = {
  container: {
    padding: 16,
    margin: 8,
    width: 320,
    height: 192,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    lineHeight: 28,
    boxShadow: '1px 3px 1px gray',
    fontFamily: "'JetBrains Mono', monospace"
  }
}
