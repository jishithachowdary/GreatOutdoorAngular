import { Product } from "./product.model";

export class OrderRequest{
    orderId:string;
    userId:string;
    totalPrice:number;
    delivaryDate:Date;
    dispatchDate:Date;
    productOrder:Product[];
    // productOrder:Map<string,Product>
}