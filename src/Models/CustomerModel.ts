import { LevelEnum } from './Enums';

class CustomerModel {
    public id:number=0 ;
	public name:string="";
	public address:string="";
	public phone:string="";
	public level:LevelEnum=LevelEnum.NONE;
	public branchId:number;
	public email:string="";
    public password:string="";
	public token:string="";

}

export default CustomerModel;
