import style from './ContactDeleteConfirmModal.module.css';

export const ContactDeleteConfirmModal = ({ onCancel, onDelete }) => {
  return (
    <div className={style.modal}>
      <div className={style.container}>
        <p>Delete contact?</p>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onDelete}> Yes</button>
      </div>
    </div>
  );
};
