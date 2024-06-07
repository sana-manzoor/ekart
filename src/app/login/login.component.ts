import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EkartService } from '../service/ekart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb:FormBuilder,private toastr:ToastrService,private api:EkartService,private router:Router){

  }

  logForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9@!]*'),Validators.minLength(6)]]
  })

  getFormData(){
    console.log(this.logForm.value)
    this.api.userLogin(this.logForm.value).subscribe({
      next:(res:any)=>{
        console.log(res.status)
        sessionStorage.setItem('excistingUser',JSON.stringify(res.excistingUser))
        sessionStorage.setItem('Token',res.token)
        this.api.getWishListCountApi()
        this.toastr.success("Login Successfull!!")
        this.router.navigateByUrl('/home')
      },
      error:(err)=>{
        // console.log(err)
        this.toastr.error("Login Failed!!")
      }
    })

  }
}
