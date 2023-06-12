export interface ITodo {
  id: number;
  name: string;
  completed: boolean;
}

export type FilterType = "all" | "active" | "completed";
