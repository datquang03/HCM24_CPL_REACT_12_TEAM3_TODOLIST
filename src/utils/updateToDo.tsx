import ItemProps from "../Model/ItemProps";

export function updateTodo(updatedTodo:ItemProps, items: ItemProps[]) {
    // Map through existing data to find and update the correct todo
    const updatedData = items.map(item => 
        item.id === updatedTodo.id ? { ...item, ...updatedTodo } : item
    );
    
    try {
        localStorage.setItem('items', JSON.stringify(updatedData));
    } catch (error) {
        console.error('Error saving data to localStorage:', error);
    }
}
