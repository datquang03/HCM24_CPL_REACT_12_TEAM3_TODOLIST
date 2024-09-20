import ItemProps from "../Model/ItemProps";

const handleFilter = (
  todoList: ItemProps[],
  todoName: string,
  todoTime: [string, string]
): ItemProps[] => {
  let filteredList = todoList;

  if (todoName.trim() !== "") {
    filteredList = filteredList.filter((todo) =>
      todo.name.trim().toLowerCase().includes(todoName.trim().toLowerCase())
    );
  }

  if (todoTime[0] !== "" && todoTime[1] !== "") {
    filteredList = filteredList.filter((todo) => {
      const [todoStartDate, todoEndDate] = todo.formToDate;

      // Convert strings to Date objects
      const todoStart = new Date(todoStartDate);
      const todoEnd = new Date(todoEndDate);
      const filterStart = new Date(todoTime[0]);
      const filterEnd = new Date(todoTime[1]);

      const normalizeDate = (date: Date) => new Date(date.toDateString());

      return (
        normalizeDate(todoStart) >= normalizeDate(filterStart) &&
        normalizeDate(todoEnd) <= normalizeDate(filterEnd)
      );
    });
  }

  console.log("Filtered List:", filteredList);
  return filteredList;
};

export default handleFilter;
