import {
  AiOutlineEdit as EditIcon,
  AiOutlineDelete as DeleteIcon,
  AiOutlineCoffee as ViewIcon
} from 'react-icons/ai';

export default function FlashCardItem({
  children: flashCard,
  onDelete = null,
  onEdit = null,
}) {
  const { title, description } = flashCard;

  function handleDeleteIconClick() {
    if (onDelete) {
      onDelete(flashCard.id);
    }
  }

  function handleEditIconClick(editionMode) {
    if (onEdit) {
      onEdit(flashCard, editionMode);
    }
  }

  return (
    <div  style={{border:'1px solid', borderColor:'gray', padding: 10, margin: 20}}>
      <ul style={{display:'flex', flexDirection:'column'}}>
        <li>
          <strong>Título:</strong> <span>{title}</span>
        </li>

        <li>
          <strong>Descrição:</strong> <span>{description}</span>
        </li>
      </ul>

      <div style={{marginTop: 4, display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'end', padding: 10, margin: 20}}>
        <EditIcon
          onClick={() => handleEditIconClick(true)}
          style={{cursor: 'pointer'}}
          size={24}
        />

        <DeleteIcon
          onClick={handleDeleteIconClick}
          style={{cursor: 'pointer'}}
          size={24}
        />

        <ViewIcon
         onClick={() => handleEditIconClick(false)}
         style={{cursor: 'pointer'}}
         size={24}>

        </ViewIcon>
      </div>
    </div>
  );
}
