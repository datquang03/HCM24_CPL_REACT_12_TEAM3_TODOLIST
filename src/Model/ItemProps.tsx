interface ItemProps{
    id: string,
    name: string,
    description: string,
    status: "New" | "Inprogress" | "Complete",
    formToDate: [string, string]
}
 
export default ItemProps;