import { ProductDao } from "./productdao.model";

export class CartDao{
    cartId:number;
    userId:string;
    cartTotalPrice:number;
    totalQuantity:number;
    productCart:ProductDao[];
}