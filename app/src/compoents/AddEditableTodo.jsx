import { useState } from "react";

export const AddEditableTodo = ({ initialText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const handleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };
  const handleBlur = () => {
    setIsEditing(false);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setText(e.target.value);
  }
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} class="w3-container">
          <input type="text" value={text} class="w3-input" />
        </form>
      </div>
      <div onClick={handleClick}>
        {isEditing ? (
          <input
            class="w3-input"
            type="text"
            value={text}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        ) : (
          <span>{text}</span>
        )}
      </div>
    </div>
  );
};
export default function EditTodo({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event) => {
    setEditedText(event.target.value);
  };
  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <label onClick={handleClick}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </>
      ) : (
        <>
          <div>{todo.text}</div>
        </>
      )}
    </label>
  );
}
