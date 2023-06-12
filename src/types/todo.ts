export interface ITodo {
  id: number;
  name: string;
  completed: boolean;
}

export type FilterType = "all" | "active" | "completed";

export enum Filter {
  all = "all",
  active = "active",
  completed = "completed",
}
