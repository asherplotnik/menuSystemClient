import BranchModel from './BranchModel';
import { LevelEnum } from './Enums';

class UserModel {
    public id:number=0 ;
	public name:string="";
	public address:string="";
	public phone:string="";
	public level:LevelEnum=LevelEnum.NONE;
	public branch:BranchModel;
	public email:string="";
    public password:string="";
	public token:string="";

}

export default UserModel;
