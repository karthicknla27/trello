import React, { useReducer } from "react";
import "./App.css";

const initialState = {
  lists: [
    {
      id: 1,
      title: "To Do",
      cards: ["Task 1", "Task 2"],
    },
    {
      id: 2,
      title: "In Progress",
      cards: ["Task 3"],
    },
    {
      id: 3,
      title: "Done",
      cards: ["Task 4"],
    },
  ],
  draggedCard: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_CARD":
      const { listId, cardcontent } = action.payload;
      if (listId === 1) {
        const updatedLists = state.lists.map((list) => {
          if (list.id === listId) {
            list.cards = [...list.cards, cardcontent];
          }
          return list;
        });
        return { ...state, lists: updatedLists };
      }
      return state;
    case "MOVE_CARD":
      const { sourceListId, destListId, cardContent } = action.payload;
      const sourceList = state.lists.find((list) => list.id === sourceListId);
      const destList = state.lists.find((list) => list.id === destListId);

      // Remove the card from the source list
      sourceList.cards = sourceList.cards.filter(
        (card) => card !== cardContent
      );

      // Add the card to the destination list
      destList.cards = [...destList.cards, cardContent];

      return { ...state, draggedCard: null };
    case "DELETE_CARD":
      const { listId: deleteListId, cardContent: deleteCardContent } =
        action.payload;
      const filteredLists = state.lists.map((list) => {
        if (list.id === deleteListId) {
          list.cards = list.cards.filter((card) => card !== deleteCardContent);
        }
        return list;
      });
      return { ...state, lists: filteredLists };

    case "DRAG_START":
      return { ...state, draggedCard: action.payload.draggedCard };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onDragStart = (e, card, listId) => {
    dispatch({ type: "DRAG_START", payload: { draggedCard: card } });
    e.dataTransfer.setData("card", card);
    e.dataTransfer.setData("listId", listId);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, listId) => {
    e.preventDefault();
    const cardContent = e.dataTransfer.getData("card");
    const sourceListId = parseInt(e.dataTransfer.getData("listId"), 10);

    if (sourceListId !== listId) {
      // Update the state to move the card
      dispatch({
        type: "MOVE_CARD",
        payload: { sourceListId, destListId: listId, cardContent },
      });

      // Remove the card from the source list
      dispatch({
        type: "DELETE_CARD",
        payload: { listId: sourceListId, cardContent },
      });
    }

    e.dataTransfer.clearData(); // Clear the data transfer
  };

  return (
    <div className="App">
      <div className="board">
        {state.lists.map((list) => (
          <div
            key={list.id}
            className="list"
            onDrop={(e) => onDrop(e, list.id)}
            onDragOver={(e) => onDragOver(e)}
          >
            <h2>{list.title}</h2>
            {list.cards.map((card, index) => (
              <div
                key={index} // Use a unique key, e.g., index
                className="card"
                draggable
                onDragStart={(e) => onDragStart(e, card, list.id)}
                onDoubleClick={() => handleDeleteCard(list.id, card)}
              >
                {card}
              </div>
            ))}
            {list.id === 1 && (
              <div className="add-card">
                <button
                  onClick={() =>
                    dispatch({
                      type: "ADD_CARD",
                      payload: { listId: list.id, cardContent: "New Task" },
                    })
                  }
                >
                  Add Card
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
