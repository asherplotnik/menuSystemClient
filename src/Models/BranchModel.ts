import BrandModel from "./BrandModel";
import MenuOrderModel from "./MenuOrderModel";

class BranchModel {
    public id:number;
    public name:string;
    public address:string;
    public brand: BrandModel;
    public orders: MenuOrderModel[]
}

export default BranchModel;