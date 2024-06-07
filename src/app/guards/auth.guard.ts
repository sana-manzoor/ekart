import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { EkartService } from '../service/ekart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
const api=inject(EkartService)
const toastr=inject(ToastrService)
const router=inject(Router)

if(api.isLoggedIn()){
  return true;
}
else{
  toastr.warning("Please Login First!!")
  router.navigateByUrl("/log")
  return false
}
  
};
