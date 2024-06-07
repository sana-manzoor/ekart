import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
import { EkartService } from '../service/ekart.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  checkOutStatus:boolean=false
  total:any=sessionStorage.getItem("totalAmount")
  payPalConfig ? : IPayPalConfig;

  constructor(private fb:FormBuilder,private toastr:ToastrService,private r:Router,private api:EkartService){

  }

  checkOutForm=this.fb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    address:['',[Validators.pattern('[a-zA-Z 0-9 ]*'),Validators.required]],
    pincode:['',[Validators.pattern('[ 0-9 ]*'),Validators.required]]
  })

  proceedCheckout(){
    if(this.checkOutForm.valid){
      this.checkOutStatus=true
      this.initConfig();
    }
    else{
      this.toastr.info("Invalid Form Data!!")
    }
  }

  cancel(){
    this.checkOutForm.reset()
  }

  initConfig() {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.total,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.total
                        }
                    }
                },
                // items: [{
                //     name: 'Enterprise Subscription',
                //     quantity: '1',
                //     category: 'DIGITAL_GOODS',
                //     unit_amount: {
                //         currency_code: 'EUR',
                //         value: '9.99',
                //     },
                // }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
           this.api.emptyCartApi().subscribe((res:any)=>{
            this.api.getCartCountApi()
            this.toastr.success("Transaction completed for checking out Cart!!")
            this.checkOutStatus=false
            this.checkOutForm.reset()
            this.r.navigateByUrl('/')
           })
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.toastr.warning("Transaction has been cancelled!!")

        },
        onError: err => {
            console.log('OnError', err);
          this.toastr.warning("Transaction Cancelled!!Please try after some time!!")
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            // this.resetStatus();
        }
    };
  }
}
