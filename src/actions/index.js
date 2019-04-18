import { todosRef } from "../firebase";
import { FETCH_TODOS } from "./types";

export const addToDo = newToDo => async () => {
  todosRef.push().set(newToDo);
};

export const completeToDo = completeToDoId => async () => {
  todosRef.child(completeToDoId).remove();
};

export const fetchToDos = () => async dispatch => {
  todosRef.on("value", snapshot => {
    dispatch({
      type: FETCH_TODOS,
      payload: snapshot.val()
    });
  });
};
