import { Category } from './Enums';
class DishModel {
    public id:number=0;
    public name:string="";
	public description:string="";
	public price:number=0;
	public primaryImage:string="";
	public secondaryImage:string="";
	public category:Category=Category.NONE ; 
}

export default DishModel;