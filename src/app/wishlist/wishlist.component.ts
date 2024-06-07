import { Component } from '@angular/core';
import { EkartService } from '../service/ekart.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  products:any[]=[]

  constructor(private api:EkartService,private toastr:ToastrService){

  }

  ngOnInit() {
    this.getData()
  }

  getData(){
    this.api.getWishListApi().subscribe({
      next:(res:any)=>{
        console.log(res)
        this.products=res
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  addWish(data:any){
    if(sessionStorage.getItem('Token')){
      console.log(data)
      this.api.addWishListApi(data).subscribe({
        next:(res:any)=>{
          this.api.getWishListCountApi()
          this.toastr.success("Item Added to Wishlist")
        },
        error:(err:any)=>{
          console.log(err)
          this.toastr.error(err.error)
        }
      })
    }else{
      this.toastr.warning("Login First!!")
    }
  }

  deleteWishList(id:any){
    this.api.deleteWishList(id).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.api.getWishListCountApi()
        this.toastr.success("Wislist Item Deleted!!")
        this.getData()
      },
      error:(err:any)=>{
        console.log(err)
        this.toastr.error("Deletion failed!!")
      }
    })

  }

  addCart(data:any){
    if(sessionStorage.getItem('Token')){
      const {id,title,image,price}=data
      const product={id,title,image,price,quantity:1}
      this.api.addToCartApi(product).subscribe({
        next:(res:any)=>{
          this.toastr.success("Item added to cart!!")
          this.deleteWishList(data._id)
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
