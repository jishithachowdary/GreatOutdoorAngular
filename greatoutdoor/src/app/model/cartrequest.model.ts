import { Product } from "./product.model";

export class CartRequest{
    cartId:number;
    userId:string;
    cartTotalPrice:number;
    totalQuantity:number;
    productCart: Product[];
}