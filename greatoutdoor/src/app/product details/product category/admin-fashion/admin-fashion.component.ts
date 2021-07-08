import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-admin-fashion',
  templateUrl: './admin-fashion.component.html',
  styleUrls: ['./admin-fashion.component.css']
})
export class AdminFashionComponent implements OnInit {
  allProducts:product[];
  prodcut:product;
  allProduct:boolean=true;
  isSearched:boolean=false;
  errorMsg:string='';
  isadded:boolean=false;
  @ViewChild('closebutton') closebutton: { nativeElement: { click: () => void; }; };
  
 
  constructor(private productService:ProductService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.productService.getProductByCategory('fashion').subscribe(data=>{
                  this.allProducts=data;
    })
    console.log(this.allProducts);
  }
  get f(){
    return this.productUpdateForm.controls;
  }
  onClickUpdate(Id:string){
    this.productService.getProductById(Id).subscribe(
            data=>{
              this.prodcut=data;
              console.log("*");
              console.log(this.prodcut);
              console.log(this,this.prodcut.productId);
              this.updateProductForm();
            })
  }
  productUpdateForm=new FormGroup({
    Id:new FormControl({value:'',disabled:true}),
    name:new FormControl('', [Validators.required]),
    price:new FormControl('',[Validators.required]),
    image:new FormControl('',[Validators.required]),
    color:new FormControl('',[Validators.required]),
    category:new FormControl('',[Validators.required]),
    quantity:new FormControl('',[Validators.required]),
    manufacturer:new FormControl('',[Validators.required]),
    specification:new FormControl('',[Validators.required])
  });

  updateProductForm(){
    this.productUpdateForm.setValue({
      Id:this.prodcut.productId,
      name:this.prodcut.productName,
      price:this.prodcut.price,
      image:this.prodcut.image,
      color:"pink",
      category:this.prodcut.category,
      quantity:this.prodcut.quantity,
      manufacturer:this.prodcut.manufacturer,
      specification:this.prodcut.specification
    })
  }

  onSubmit(){
    let product1=new product();
    product1.productId=this.productUpdateForm.getRawValue().Id;
    product1.productName=this.productUpdateForm.value.name;
    product1.price=this.productUpdateForm.value.price;
    product1.image=this.productUpdateForm.value.image;
    product1.colour=this.productUpdateForm.value.color;
    product1.category=this.productUpdateForm.value.category;
    product1.quantity=this.productUpdateForm.value.quantity;
    product1.manufacturer=this.productUpdateForm.value.manufacturer;
    product1.specification=this.productUpdateForm.value.specification;
    this.productService.updateProduct(product1).subscribe(
      data=>{
        this.closebutton.nativeElement.click();
        this.allProduct=true;
        this.isSearched=false;
        this.productService.getProductByCategory('fashion').subscribe(data=>{
          this.allProducts=data;
        })
      },
      error=>console.log(error)
    );
  }
  productAddForm=new FormGroup({
    Id:new FormControl('',[Validators.required]),
    name:new FormControl('', [Validators.required]),
    price:new FormControl('',[Validators.required]),
    image:new FormControl('',[Validators.required]),
    color:new FormControl('',[Validators.required]),
    category:new FormControl({value:'fashion',disabled:true},[Validators.required]),
    quantity:new FormControl('',[Validators.required]),
    manufacturer:new FormControl('',[Validators.required]),
    specification:new FormControl('',[Validators.required])
  });

  onAdd(){
    let addProduct=new product();
    addProduct.productId=this.productAddForm.value.Id;
    addProduct.productName=this.productAddForm.value.name;
    addProduct.price=this.productAddForm.value.price;
    addProduct.image=this.productAddForm.value.image;
    addProduct.colour=this.productAddForm.value.color;
    addProduct.category="fashion";
    addProduct.quantity=this.productAddForm.value.quantity;
    addProduct.manufacturer=this.productAddForm.value.manufacturer;
    addProduct.specification=this.productAddForm.value.specification;
    this.isadded=true;
    this.productService.addProduct(addProduct).subscribe(
      data=>{
        this.closebutton.nativeElement.click();
        this.productService.getProductByCategory('fashion').subscribe(data=>{
          this.allProducts=data;
        })
      },
      error=>console.log(error)
    );

  }

  productSearchForm=new FormGroup({
    name:new FormControl('',[Validators.required])});

  // onSearch(){
      
  //       this.productService.getSearchProduct(this.productSearchForm.value.name).subscribe(
  //         data=>{
  //           this.allProduct=false;
  //           this.isSearched=true;
  //           this.allProducts=data;
  //           console.log("*");
  //           console.log(this.allProducts);
  //           console.log(this.allProduct);
  //         })
     
  //   }

}