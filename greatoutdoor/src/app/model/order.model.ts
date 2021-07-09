import { Product } from "./product.model";

export class Order{
    oid:string;
    uid:string;
    totalPrice:number;
    totalQuantity:number;
    dispatchDate:Date;
    deliveryDate:Date;
    productOrder:Map<string,Product>;

    
}