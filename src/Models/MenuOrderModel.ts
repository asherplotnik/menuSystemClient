import CustomerModel from './CustomerModel';
import { StatusEnum, OrderType } from './Enums';
import MenuEntryModel from './MenuEntryModel';

class MenuOrderModel {
    public id:number=0;
    public orderType:OrderType=OrderType.NONE;
    public time:Date=new Date();
    public note:string="";
    public status:StatusEnum=StatusEnum.NONE;
    public user:CustomerModel= new CustomerModel();
    public entries:MenuEntryModel[] = [];
}

export default MenuOrderModel;