interface ItemProps{
    id: String,
    name: String,
    description: String,
    status: "New" | "Inprogress" | "Complete",
    startDate: Date,
    endDate: Date
}
 
export default ItemProps;