import DishModel from "./DishModel";

class BrandModel {

    public id:number=0 ;
	public name:string="";
	public branches:BrandModel[];
    public dishes: DishModel[];
}

export default BrandModel;
