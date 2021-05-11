import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bet } from "../models/bet.model";
import { formatDate } from '@angular/common';
import { EntityHelper } from "../helpers/EntityHelper";
import { BettingService } from "../betting.service";

@Component({
  selector: 'app-bet-history',
  templateUrl: './bet-history.component.html',
  styleUrls: ['./bet-history.component.css']
})
export class BetHistoryComponent implements OnInit {
  public bettingHistoryDetails: Bet[] = [];
  public otherUsersBetsModal: boolean = false;
  public otherUsersBets: Bet[];
  constructor(private bettingService: BettingService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.bettingService.getBettingHistory().subscribe(resp => {
      this.formatResponse(resp);
      },
      error => {
        this.openSnackBar("Error occured. Please retry!", "Ok");
      });
  }

  formatResponse(betHistoryDetails: Bet[]) {
    betHistoryDetails.forEach(bet => {
      bet.DisplayDate = formatDate(bet.MatchDate, EntityHelper.DateFormat, 'en-US');
    });
    this.bettingHistoryDetails = betHistoryDetails;
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  checkOtherUsersBets = (matchId: number) => {
    this.bettingService.getAmountOwnByUsers(matchId).subscribe(resp => {
      this.otherUsersBets = resp;
      this.otherUsersBetsModal = true;
    }, error => {
      this.openSnackBar("Error occured. Please retry!", "Ok");
      this.otherUsersBetsModal = false;
    });
  }

  onClose = () => {
    this.otherUsersBetsModal = false;
    this.otherUsersBets = [];
  }

}
