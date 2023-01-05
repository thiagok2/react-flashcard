export default function FlashCards({ children: flashcards }) {
  const styleContainer = {
    border: '1px solid',
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'

  }
  return (
    <div style={styleContainer}>
      {flashcards}
    </div>
  );
}
