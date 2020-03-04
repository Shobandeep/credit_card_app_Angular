import { ServerService } from 'src/app/services/server/server.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  public inputError: boolean = false;
  public serverError: boolean = false;
  public serverErrorMsg: string;
  public paymentSuccessful = false;

  constructor(
    private server: ServerService
  ) {}

  ngOnInit() {
  }

  submitPayment(status, data) {
    // if data was empty
    if(data.cardNumber === '' || data.amount === '')
      this.inputError = true;
    
    // reject form if the fields aren't valid
    if(status === 'INVALID')
      return;
    
    this.server.makePayment(data).subscribe(response => {
      if(response.error) {
        this.serverError = true;
        // if the server sent along a message, display it
        if(response.msg)
          this.serverErrorMsg = response.msg
        else
          this.serverErrorMsg = 'server error, payment could not be processed'
      }
      else 
        this.paymentSuccessful = true;
    });
    
  

  }

}
