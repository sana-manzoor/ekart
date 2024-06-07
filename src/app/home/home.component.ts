import { Component } from '@angular/core';
import { EkartService } from '../service/ekart.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
        products:any[]=[]
        
        constructor(private api:EkartService,private toastr:ToastrService){


      }
      ngOnInit() {
        this.getData()
      }
      getData(){
        this.api.getAllProducts().subscribe((res:any)=>{
          console.log(res);
          this.products=res
        },
        (err:any)=>{
             console.log(err)
        }
        )
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