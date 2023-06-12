import { act, cleanup, renderHook } from "@testing-library/react-hooks";

import { useTodos } from "../hooks/useTodos";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("useTodos tests", () => {
  it("should initialize with an empty todo list", () => {
    const { result } = renderHook(() => useTodos([]));

    expect(result.current.todos).toEqual([]);
  });

  it("should add a new todo", () => {
    const { result } = renderHook(() => useTodos([]));

    act(() => {
      result.current.addTodo("test");
    });
    console.log(result.current.todos);
    expect(result.current.todos).toEqual([
      {
        id: expect.any(Number),
        name: "test",
        completed: false,
      },
    ]);
  });

  it("should toggle a todo", () => {
    const initialTodos = [
      { id: 0, name: "todo 1", completed: false },
      { id: 1, name: "todo 2", completed: false },
    ];
    const { result } = renderHook(() => useTodos(initialTodos));
    act(() => {
      result.current.toggleTodo(0);
    });

    expect(result.current.todos).toEqual([
      { id: 0, name: "todo 1", completed: true },
      { id: 1, name: "todo 2", completed: false },
    ]);
  });

  test("should edit a todo", () => {
    const initialTodos = [
      { id: 0, name: "todo 1", completed: false },
      { id: 1, name: "todo 2", completed: false },
    ];
    const { result } = renderHook(() => useTodos(initialTodos));

    act(() => {
      result.current.editTodo(1, "updated todo 2");
    });

    expect(result.current.todos).toEqual([
      { id: 0, name: "todo 1", completed: false },
      { id: 1, name: "updated todo 2", completed: false },
    ]);
  });

  test("should remove a todo", () => {
    const initialTodos = [
      { id: 0, name: "todo 1", completed: false },
      { id: 1, name: "todo 2", completed: false },
    ];
    const { result } = renderHook(() => useTodos(initialTodos));

    act(() => {
      result.current.removeTodo(1);
    });

    expect(result.current.todos).toEqual([
      { id: 0, name: "todo 1", completed: false },
    ]);
  });

  test("should return the correct number of items left", () => {
    const initialTodos = [
      { id: 0, name: "todo 1", completed: false },
      { id: 1, name: "todo 2", completed: false },
    ];
    const { result } = renderHook(() => useTodos(initialTodos));

    expect(result.current.getItemsLeft()).toBe(2);
  });

  test("should remove completed todos", () => {
    const initialTodos = [
      { id: 0, name: "todo 1", completed: false },
      { id: 1, name: "todo 2", completed: true },
    ];
    const { result } = renderHook(() => useTodos(initialTodos));

    act(() => {
      result.current.removeCompleted();
    });

    expect(result.current.todos).toEqual([
      { id: 0, name: "todo 1", completed: false },
    ]);
  });
});
