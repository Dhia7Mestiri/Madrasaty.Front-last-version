import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permission } from '@enums/permission';
import { NotificationService } from '@services/notification.service';
import { PermissionsService } from '@services/permissions-service/permissions.service';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  stripePromise = loadStripe('pk_test_51Ksla8H1ud48pyOPeASTZ4Xy0wpENbfmW7Cl2ocTxKq0Jx9XQT4GRMLqd0iCf8glTZMQOBLX3YLcMfAYVAjKtIlu00Taq1xkO8');
  quantity = 1;
  pageTitle   = 'Tarification'; 
  constructor( private perm: PermissionsService, private router: Router , private notif: NotificationService) { }

  ngOnInit(): void { 

this.notif.updatePageTitle({
    title     : this.pageTitle,
    toggleView: false,
    orderBy   : false,
    breadcrumb: [
        { text: this.pageTitle, url: '/web/pricing' },
    ],
    actionsBtn: [  
    ]
});


}


  async checkout(priceId)
  {
      // Call your backend to create the Checkout session.
      // When the customer clicks on the button, redirect them to Checkout.
      const stripe = await this.stripePromise;
      const { error } = await stripe.redirectToCheckout({
          mode: "subscription",
          lineItems: [{ price: priceId, quantity: this.quantity }],
          successUrl: `${window.location.href}/success`,
          cancelUrl: `${window.location.href}/failure`,
      });

      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `error.message`.
      if (error) {
          console.log(error);
      }
  }

}
