import { atom, selector } from "recoil";

export interface ITodo {
  id: any;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: "Doto",
  default: {
    "1dd": [],
    "2aa": [],
    "3aa": [],
    "4aa": [],
    "5aa": [],
  },
});
