import { useState } from "react";
import React from "react";

const Dragtest = () => {
  const [tasks, setTasks] = useState({
    todo: [
      {
        _id: 233243424,
        name: "This is a Todo",
      },
      {
        _id: 1123434,
        name: "This is a second Todo",
      },
    ],
    inProgress: [
      {
        _id: 1123243,
        name: "This is a In Progress",
      },
      {
        _id: 55322234,
        name: "This is a second In Progress",
      },
    ],
    done: [
      {
        _id: 2455422,
        name: "This is a Done",
      },
      {
        _id: 33235345,
        name: "This is a second Done",
      },
    ],
    dragged: {},
  });
  const draggableTodo = useRef(null);
  const groupName = useRef(null);

  const dragStart = (event) => {
    console.log("drag start");
    const { target } = event;
    const id = target.id;
    const parentElementId = target.parentElement.id;
    setTimeout(() => {
      target.style.display = "none";
      draggableTodo.current = target;
    }, 0);
    setTasks((prevState) => {
      // prevent mutation
      const state = { ...prevState };

      const fn = (name) => {
        groupName.current = name;
        state.dragged = state[name].find((i) => i._id.toString() === id);
      };

      switch (parentElementId) {
        case "todo_div":
          fn("todo");
          return state;
        case "inProgress_div":
          fn("inProgress");
          return state;
        case "done_div":
          fn("done");
          return state;
        default:
          return state;
      }
    });
  };
  const dragEnd = (event) => {
    console.log("dragEnd");
    event.preventDefault();
    draggableTodo.current.style.display = "block";
  };

  const dragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  // const dragEnter = (event) => {};

  const dragLeave = (event) => {
    // event.target.style.border = "none";
  };

  const dragDrop = (event) => {
    console.log("drop");

    event.preventDefault();
    event.stopPropagation();
    const { currentTarget } = event;
    const id = currentTarget.id;
    setTasks((prevState) => {
      // This is to not mutate state object
      const state = { ...prevState };
      const fn = (name) => {
        const { current } = groupName;
        const dragged = state.dragged;
        const previousParentId = draggableTodo.current.parentElement.id;
        if (previousParentId !== id) {
          state[current] = state[current].filter((i) => i._id !== dragged._id);
          state[name] = [...state[name], dragged];
        } else {
          draggableTodo.current.style.display = "block";
        }
      };

      switch (id) {
        case "todo_div":
          fn("todo");
          return state;
        case "inProgress_div":
          fn("inProgress");
          return state;
        case "done_div":
          fn("done");
          return state;
        default:
          return state;
      }
    });
  };
  return <div>Dragtest</div>;
};

export default Dragtest;
