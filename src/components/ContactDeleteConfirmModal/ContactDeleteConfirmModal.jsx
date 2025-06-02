export const ContactDeleteConfirmModal = ({ onCancel, onDelete }) => {
  return (
    <div>
      <p>Delete contact?</p>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onDelete}> Yes</button>
    </div>
  );
};
