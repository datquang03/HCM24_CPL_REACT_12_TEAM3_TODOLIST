import ItemProps from "../Model/ItemProps";

const handleFilter = (todoList: ItemProps[],todoName:string,todoTime:[string,string]): ItemProps[] => {
    let filteredList = todoList;
    // Filter by name if provided
    if (todoName.trim() !== "") {
      filteredList = filteredList.filter(
        (todo) =>
          todo.name.trim().toLowerCase().includes(todoName.trim().toLowerCase()) 
      );
    }

    // Filter by time range if both start and end dates are provided
    if (todoTime[0] !== "" && todoTime[1] !== "") {
      filteredList = filteredList.filter((todo) => {
        const [todoStartDate, todoEndDate] = todo.formToDate;
        return todoStartDate >= todoTime[0] && todoEndDate <= todoTime[1];
      });
    }

    console.log("Filtered List:", filteredList);
    return filteredList;
  };

export default handleFilter