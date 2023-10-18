import React from "react";
import EditTodo from "./EditTodo";

const Completed = ({ tasks, todos, onEdit, onDelete }) => {
  return (
    <div>
      <div>
        <h2 className="completed">COMPLETED</h2>
        <div className="todo-list">
          {todos
            .filter((k) => k.inState == "completed")
            .map((todo, index) => (
              <div key={todo.id} className="edit-head">
                <div className="clear-btn" draggable>
                  <button onClick={() => onDelete(todo.id)}>x</button>
                </div>
                <EditTodo todo={todo} onChange={onEdit} onDelete={onDelete} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Completed;
