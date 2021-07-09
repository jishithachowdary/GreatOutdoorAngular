import { ProductDao } from "./productdao.model";

export class OrderDao{
    oid:string;
    uid:string;
    totalQuantity:number;
    totalPrice:number;
    deliveryDate:Date;
    dispatchDate:Date;
    productOrder:Map<string,ProductDao>
}