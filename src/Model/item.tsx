interface ItemProps{
    id: string,
    name: string,
    description: string,
    status: "New" | "Inprogress" | "Complete",
    startDate: Date,
    endDate: Date
}
 
export default ItemProps;