import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EkartService } from '../service/ekart.service'; 
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  pid:any=0
  product:any={}
  
  constructor(private  aroute:ActivatedRoute,private api:EkartService,private toastr:ToastrService){
    this.aroute.params.subscribe((res:any)=>{
      console.log(res.id)
      this.pid=res.id
    })
  }

  ngOnInit(){
    this.getData()
  }

  getData(){
    this.api.getProduct(this.pid).subscribe((res:any)=>{
      this.product=res
      console.log(this.product)
    })
  }

  addWish(data:any){
    if(sessionStorage.getItem('Token')){
      console.log(data)
      this.api.addWishListApi(data).subscribe({
        next:(res:any)=>{
          this.toastr.success("Item Added to wishList!!")

        },
        error:(err:any)=>{
          console.log(err)
          this.toastr.error(err.error)
        }
      })
    }
    else{
      this.toastr.warning("Login First!!")
    }
  }

  addCart(data:any){
    if(sessionStorage.getItem('Token')){
      const {id,title,image,price}=data
      const product={id,title,image,price,quantity:1}
      this.api.addToCartApi(product).subscribe({
        next:(res:any)=>{
          this.toastr.success("Item added to cart!!")
          
        },
        error:(err:any)=>{
          this.toastr.error(err.error)
        }
      })
    }
    else{
      this.toastr.warning("Login First!!")
    }
  }


}
