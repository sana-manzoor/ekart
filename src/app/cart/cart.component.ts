import { APP_ID, Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { EkartService } from '../service/ekart.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  constructor(private api:EkartService,private toastr:ToastrService,private r:Router){

  }

  cartProducts:any=[]
  totalAmount:any=[0]
  cartCoupon:any=false
  couponClickStatus:any=false
  

  ngOnInit() {
    this.getData()
  }

getData(){
  this.api.viewToCart().subscribe({
    next:(res:any)=>{
      console.log(res)
      this.cartProducts=res
      this.getToatalAmount()
    },
    error:(err:any)=>{
      console.log(err)

    }
  })
}

removeCartItem(id:any){
  this.api.deleteCartListApi(id).subscribe({
    next:(res:any)=>{
      console.log(res)
      this.getData()
      this.toastr.success("Item deleted from Cart!!")
      this.api.getCartCountApi()
    },
    error:(err:any)=>{
      console.log(err)
      this.toastr.error("Failed!!")
      
    }
  })
}

getToatalAmount(){
  this.totalAmount=Math.ceil(this.cartProducts.map((item:any)=>item.totalPrice).reduce((p1:any,p2:any)=>p1+p2))
  console.log(this.totalAmount)
}

increase(id:any){
  this.api.incCartQuantityApi(id).subscribe({
    next:(res:any)=>{
      console.log(res)
      this.getData()
    },
    error:(err:any)=>{
      console.log(err)
      
    }
  })
}

decrease(id:any){
  this.api.decCartQuantityApi(id).subscribe({
    next:(res:any)=>{
      console.log(res)
      this.getData()
    },
    error:(err:any)=>{
      console.log(err)
      
    }
  })
}

emptyCart(){
  this.api.emptyCartApi().subscribe({
    next:(res:any)=>{
      this.toastr.success('Cart is Empty!')
      this.api.getCartCountApi()
      this.getToatalAmount()
      this.getData()
      
    },
    error:(err:any)=>{
      this.toastr.error("Something went wrong!!")
      console.log(err)
      
    }
  })
}

getCoupons(){
  this.cartCoupon=true
}

getDiscount10(){
  this.couponClickStatus=true
  const discount=this.totalAmount* 0.1
  this.totalAmount=Math.ceil(this.totalAmount - discount)
  

}

getDiscount20(){
  this.couponClickStatus=true
  const discount=this.totalAmount* 0.2
  this.totalAmount=Math.ceil(this.totalAmount - discount)
  

}

getDiscount50(){
  this.couponClickStatus=true
  const discount=this.totalAmount* 0.5
  this.totalAmount=Math.ceil(this.totalAmount - discount)
  

}

clickCheckout(){
  sessionStorage.setItem("totalAmount",this.totalAmount)
  this.r.navigateByUrl('checkout')
}
}



