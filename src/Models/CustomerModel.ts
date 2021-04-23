import { LevelEnum } from './Enums';

class CustomerModel {
    public id:number=0 ;
	public name:string="";
	public address:string="";
	public phone:string="";
	public level:LevelEnum=LevelEnum.NONE;
	public salt:string="";
	public email:string="";
	public password:string="";
}

export default CustomerModel;