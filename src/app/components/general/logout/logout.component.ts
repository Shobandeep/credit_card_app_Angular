import { Component, OnInit } from '@angular/core';
import { UserStateService } from 'src/app/services/user-state-store/user-state.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private userState: UserStateService
    ) { }

  ngOnInit() {
    this.userState.logout();
  }

}
