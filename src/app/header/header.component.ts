import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { EkartService } from '../service/ekart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // count:Number=0
  username:any=""
  wishCount:any=""
  cartCount:any=""
  


  constructor(private api:EkartService,private r:Router){

  }

ngOnInit(): void {
  // this.getCount()
  if(sessionStorage.getItem("excistingUser")){
    const user:any=sessionStorage.getItem("excistingUser")
    this.username=JSON.parse(user).username
    this.api.wishlistCount.subscribe((res:any)=>{
      this.wishCount=res
    })
  }

  if(sessionStorage.getItem("excistingUser")){
    const user:any=sessionStorage.getItem("excistingUser")
    this.username=JSON.parse(user).username
    this.api.cartlistCount.subscribe((res:any)=>{
      this.cartCount=res
    })
  }
 
  
}

logout(){
  sessionStorage.clear()
  this.wishCount=0
  this.cartCount=0
  this.r.navigateByUrl('/log')

}



// getCount(){
//   this.api.getWishListApi().subscribe((res:any)=>{
//     this.count=res.length

//   })
// }

}
