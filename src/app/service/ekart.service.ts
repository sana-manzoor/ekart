import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EkartService {

  SERVER_URL="http://localhost:3000"
  wishlistCount=new BehaviorSubject(0)
  cartlistCount=new BehaviorSubject(0)



  constructor(private http:HttpClient) { 
    if(sessionStorage.getItem("Token")){
      this.getWishListCountApi()
      this.getCartCountApi()
    }

  }
  
  getAllProducts(){
    return this.http.get(`${this.SERVER_URL}/all-products`)
  }

  getProduct(id:any){
    return this.http.get(`${this.SERVER_URL}/get-product/${id}`)
  }

  userRegister(data:any){
    return this.http.post(`${this.SERVER_URL}/add-user`,data)
  }

  userLogin(data:any){
    return this.http.post(`${this.SERVER_URL}/login`,data)
  }

  // function for setting header with roken
  appendTokenToHeader(){
    const token=sessionStorage.getItem('Token')
    let headers=new HttpHeaders()
    if(token){
      headers=headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  addWishListApi(product:any){
    return this.http.post(`${this.SERVER_URL}/addwish`,product,this.appendTokenToHeader())
  }

  getWishListApi(){
    return this.http.get(`${this.SERVER_URL}/getwish`,this.appendTokenToHeader())
  }

  deleteWishList(id:any){
    return this.http.delete(`${this.SERVER_URL}/delwish/${id}`,this.appendTokenToHeader())
  }

  getWishListCountApi(){
    this.http.get(`${this.SERVER_URL}/getwish`,this.appendTokenToHeader()).subscribe((res:any)=>{
      this.wishlistCount.next(res.length)
    })
  }

  addToCartApi(product:any){
    return this.http.post(`${this.SERVER_URL}/add-to-cart`,product,this.appendTokenToHeader())

  }

  viewToCart(){
    return this.http.get(`${this.SERVER_URL}/cart-list`,this.appendTokenToHeader())
  }

  getCartCountApi(){
    return this.http.get(`${this.SERVER_URL}/cart-list`,this.appendTokenToHeader()).subscribe((res:any)=>{
      this.cartlistCount.next(res.length)
    })


  }

  deleteCartListApi(id:any){
    return this.http.delete(`${this.SERVER_URL}/deletecartlist/${id}`,this.appendTokenToHeader())

  }

  incCartQuantityApi(id:any){
    return this.http.get(`${this.SERVER_URL}/cart-increase/${id}`,this.appendTokenToHeader())

  }

  decCartQuantityApi(id:any){
    return this.http.get(`${this.SERVER_URL}/cart-decrease/${id}`,this.appendTokenToHeader())

  }

  emptyCartApi(){
    return this.http.delete(`${this.SERVER_URL}/empty-cart`,this.appendTokenToHeader())
  }

  isLoggedIn(){
    return !!sessionStorage.getItem("Token")
  }

}
