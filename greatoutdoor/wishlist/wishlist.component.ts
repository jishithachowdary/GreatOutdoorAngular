import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartDao } from '../model/cartdao.model';
import { CartRequest } from '../model/cartrequest.model';
import { Product } from '../model/product.model';
import { ProductDao } from '../model/productdao.model';
import { WishDao } from '../model/wishdao.model';
import { AuthService } from '../service/auth.service';
import { CartService } from '../service/cart.service';
import { WishListService } from '../service/wish-list.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  list:WishDao[];
  cart:CartDao[];
  user:string;
  product:ProductDao[];
  wish:WishDao[];
  Cart1:CartRequest=new CartRequest();
  constructor(private wishList:WishListService,private route: ActivatedRoute,private router: Router,private authService:AuthService,private cartService:CartService) { }

  ngOnInit(): void {
    this.wishList.getWishList(this.authService.name).subscribe(data=>{
      console.log(data);
      console.log(typeof(data));
      this.list=data;
      console.log(this.list);
      this.product=this.list[0].products;
      console.log(this.list[0].products);
      console.log(this.product);
  })
  }
  addToCart(product:ProductDao){
    console.log(product);
    this.cartService.getAllCart(this.authService.name).subscribe(data=>{
      console.log(data);
      this.cart=data;
      if(this.cart.length!==0){
       console.log(this.cart.length);
       this.findCart(product,this.cart[0])
      }
      else{
        let pro=new Product();
        pro.productId=product.pid;
        pro.productName=product.pname;
        pro.price=product.price;
        pro.quantity=product.quantity;
        pro.specification=product.specification;
        pro.category=product.category;
        pro.colour=product.colour;
        pro.image=product.image;
        pro.manufacturer=product.manufacturer;
        console.log(this.Cart1);
        this.Cart1.userId=this.authService.name;
        this.Cart1.productCart=[];
        console.log(this.Cart1);
        this.Cart1.productCart[0]=pro;
        console.log(typeof(this.Cart1.productCart))
        this.cartService.addCart(this.Cart1).subscribe(data=>{
          console.log(data);
        })
      }
    })
  }
  findCart(p:ProductDao,cart:CartDao){
    let cart1:CartDao;
    console.log(cart);
    console.log(p);
    let product1=new Product();
    product1.productId=p.pid;
    product1.productName=p.pname;
    product1.price=p.price;
    product1.quantity=p.quantity;
    product1.specification=p.specification;
    product1.manufacturer=p.manufacturer;
    product1.image=p.image;
    product1.colour=p.colour;
    product1.category=p.category;
    this.cartService.addProductToCart(cart.cartId,product1).subscribe(data=>{
      console.log(data);
    })
   //  this.cartService.getAllCart()
  }
  onClickDelte(pid:string){
    this.deleteWishLits(pid,this.authService.name);
  }
  deleteWishLits(pid:string,uid:string){
      this.wishList.deleteProduct(pid,uid).subscribe(data=>{
        console.log(data);
        this.wishList.getWishList(this.authService.name).subscribe(data=>{
          this.list=data;
          this.product=this.list[0].products;
      })
      })
      

  }
  
}
