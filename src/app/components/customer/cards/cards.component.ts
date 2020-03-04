import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server/server.service';
import { UserStateService } from 'src/app/services/user-state-store/user-state.service';
import { Component, OnInit } from '@angular/core';
import { CreditCard } from 'src/app/models/credit-card.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  public serverHasError: boolean = false;
  public firstName: string;
  public cards: CreditCard[];

  constructor(
    private userState: UserStateService, 
    private server: ServerService, 
    private router: Router
    ) {
    this.firstName = this.userState.currentUser.firstName;
    // do a query for user cards
    this.loadCards();
  }

  ngOnInit() {
  }

  loadCards() {
    this.server.getCards(this.userState.currentUser).subscribe(
      response => {
        // if there was any problem with the server, show an error message
        if(response.error) {
          this.serverHasError = true;
        }
        else {
          this.cards = response;
        }
      }
    );
  }

  applyForCard() {
    this.server.addNewCard(this.userState.currentUser).subscribe(
      response => {
        // if there was any problem with the server, show an error message
        if(response.error) {
          this.serverHasError = true;
        }
        else {
          this.loadCards();
        }
      }
    );
  }

  showTransactions(card) {
    this.userState.setCard(card);
    this.router.navigate(['card_transactions']);
  }

}
