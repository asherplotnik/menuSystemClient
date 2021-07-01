import MenuOrderModel from "./MenuOrderModel";

class BranchModel {
    public id:number;
    public name:string;
    public address:string;
    public orders: MenuOrderModel[]
}

export default BranchModel;