import EntryPayload from './EntryPayload';
import { OrderType } from './Enums';

class OrderPayload {
    public orderType:OrderType=OrderType.NONE;
    public note:string="";
    public entries:EntryPayload[] = [];
}

export default OrderPayload;