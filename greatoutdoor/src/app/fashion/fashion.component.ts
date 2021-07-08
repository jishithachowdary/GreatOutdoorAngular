import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartDao } from '../model/cartdao.model';
import { CartRequest } from '../model/cartrequest.model';
import { Product } from '../model/product.model';
import { WishDao } from '../model/wishdao.model';
import { WishListRequest } from '../model/wishListRequest.model';
import { AuthService } from '../service/auth.service';
import { CartService } from '../service/cart.service';
import { ProductService } from '../service/product.service';
import { WishListService } from '../service/wish-list.service';

@Component({
  selector: 'app-fashion',
  templateUrl: './fashion.component.html',
  styleUrls: ['./fashion.component.css']
})
export class FashionComponent implements OnInit {
  allProducts:Product[];
  allProduct:boolean=true;
  wish:WishDao[];
  cart:CartDao[];
  Cart1:CartRequest=new CartRequest();
  wish1:WishListRequest=new WishListRequest();
  constructor(private productService:ProductService,private route: ActivatedRoute,private router: Router,private authService:AuthService,private cartService:CartService,private wishList:WishListService) { }

  ngOnInit(): void {
    this.productService.getProductByCategory('fashion').subscribe(data=>{
                  this.allProducts=data;
    })
    console.log(this.allProducts);
  }
  addToCart(product:Product){
    console.log(product);
    this.cartService.getAllCart(this.authService.name).subscribe(data=>{
      console.log(data);
      this.cart=data;
      if(this.cart.length!==0){
       console.log(this.cart.length);
       this.findCart(product,this.cart[0])
      }
      else{
         
        console.log(this.Cart1);
        this.Cart1.userId=this.authService.name;
        this.Cart1.productCart=[];
        console.log(this.Cart1);
        this.Cart1.productCart[0]=product;
        console.log(typeof(this.Cart1.productCart))
        this.cartService.addCart(this.Cart1).subscribe(date=>{
          console.log(data);
        })
      }
    })
  }
  findCart(p:Product,cart:CartDao){
    let cart1:CartDao;
    console.log(cart);
    console.log(p);
    this.cartService.addProductToCart(cart.cartId,p).subscribe(data=>{
      console.log(data);
    })
   //  this.cartService.getAllCart()
  }
  
  addProductToWishLit(p:Product){
    this.wishList.getWishList(this.authService.name).subscribe(data=>{
      console.log(data);
      console.log(typeof(data));
      this.wish=data;
      if(this.wish.length!=0){
        console.log(this.wish[0]);
        this.findItem(p,this.wish[0]);
    }
    else{
      this.wish1.userId=this.authService.name;
      this.wish1.product=[];
      this.wish1.product[0]=p;
      this.wishList.addWish(this.wish1).subscribe(data=>{
        console.log(data);
      })
    }
  })
  }
  findItem(p:Product,wish:WishDao){
    let wish1:WishDao;
      console.log(wish);
      console.log(p);
      this.wishList.getWishLitItem(p.productId,wish.uid).subscribe(data=>{
        wish1=data;
        console.log(wish1);
        if(wish1.wid==0){
          this.wishList.addProductToWishList(wish.wid,p).subscribe(data=>{
            console.log(data);
          })
        }
      })
  }
}
