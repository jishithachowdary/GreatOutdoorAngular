import { Product } from "./product.model";

export class WishListRequest{
    wishListId:number;
    userId:string;
    product:Product[];
}