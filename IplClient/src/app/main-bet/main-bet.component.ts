import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BettingService } from "../betting.service";
import { Match } from "../models/match.model";
import { NgForm } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Bet } from "../models/bet.model";
import { EntityHelper } from "../helpers/EntityHelper";
import { User } from "../models/user.model";
import { AuthService } from "../login/auth.service";

@Component({
  selector: 'app-main-bet',
  templateUrl: './main-bet.component.html',
  styleUrls: ['./main-bet.component.css']
})
export class MainBetComponent implements OnInit {
  public matchDetails: Match[] = [];
  public betAmounts: number[] = [10, 20, 50, 100];
  public selectedMatch: Match;
  public userInfo: User;
  public userInsufficientFundAlert:boolean = false;
  constructor(private bettingService: BettingService, private snackBar: MatSnackBar, private authService: AuthService) { }

  ngOnInit(): void {
    this.userInsufficientFundAlert = false;
    this.loadMatchDetails();
  }

  loadMatchDetails = () => {
    this.bettingService.getMatchDetails().subscribe(resp => {
      this.formatResponse(resp);
    }, error => {
      this.openSnackBar("Error occured. Please retry!", "Ok");
      console.log(error);
    });
  }

  bet = (formRef: NgForm) => {
    if (this.userInfo.UserAmount < +formRef.value.betValue) {
      this.userInsufficientFundAlert = true;
      return;
    }

    var betData = new Bet(+formRef.value.betValue, +formRef.value.match, +formRef.value.team);
    this.bettingService.addBet(betData).subscribe(betResponse => {
      this.updateWalletAndFutureBets(betResponse);
      this.openSnackBar("Betting was successful!", "Ok");
      this.loadMatchDetails();
      this.resetFormData(formRef);

    }, error => {
        this.openSnackBar("Error occured. Please retry!", "Ok");
        this.resetFormData(formRef);
    });
    
  }

  resetFormData = (formRef: NgForm) => {
    formRef.resetForm();
    this.selectedMatch = null;
  }

  formatResponse(matchDetails: Match[]) {
    this.userInfo = EntityHelper.getUserDetails();
    var matchesToDisplay: Match[] = [];
    matchDetails.forEach(match => {
      match.DisplayDate = formatDate(match.MatchDateTime, EntityHelper.DateFormat, 'en-US');
      var isBettingDoneForThisMatch = this.userInfo.UsersFutureBets.find(ub => ub === match.MatchId);
     if (isBettingDoneForThisMatch) {
       match.DisableBettingForMatch = true;
     }
      const currentDate = new Date();
      currentDate.setMinutes(new Date().getMinutes() + 30);
      if (new Date(match.MatchDateTime) > currentDate) {
        matchesToDisplay.push(match);
      }
    });
    this.matchDetails = matchesToDisplay;
  }

  onMatchSelected(matchId:number) {
    this.selectedMatch = this.matchDetails.find(x => x.MatchId === +matchId);
  }

  private updateWalletAndFutureBets(betDetails: Bet) {
    this.userInfo.UsersFutureBets.push(betDetails.MatchId);
    this.userInfo.UserAmount -= betDetails.BetAmount;
    localStorage.setItem(EntityHelper.LocalStorageUser, JSON.stringify(this.userInfo));
    this.authService.user.next(this.userInfo);
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }


  onClose = () => {
    this.userInsufficientFundAlert = false;
  }

  
}
