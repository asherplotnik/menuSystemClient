import { CategoryEnum } from './Enums';
class DishModel {
    public id:number=0;
    public name:string="";
	public description:string="";
	public price:number=0;
	public available:boolean;
    public primaryImage:string="";
	public secondaryImage:string="";
	public category:CategoryEnum=CategoryEnum.NONE ; 
    public image1:FileList
    public image2:FileList
}

export default DishModel;