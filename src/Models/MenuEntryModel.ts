import DishModel from "./DishModel";

class MenuEntryModel {
    public id:number=0;
    public dish:DishModel = new DishModel();
	public ready:Date = new Date();
	public quantity:number=0;
}

export default MenuEntryModel;