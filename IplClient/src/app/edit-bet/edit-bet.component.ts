import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bet } from "../models/bet.model";
import { formatDate } from '@angular/common';
import { EntityHelper } from "../helpers/EntityHelper";
import { BettingService } from "../betting.service";
import { NgForm } from '@angular/forms';
import { AuthService } from "../login/auth.service";
import { User } from "../models/user.model";
import { WebNotificationService } from '../header/webnotification.service';

@Component({
  selector: 'app-edit-bet',
  templateUrl: './edit-bet.component.html',
  styleUrls: ['./edit-bet.component.css']
})
export class EditBetComponent implements OnInit {
  isModalOpen: boolean = false;
  public currentBetDetails: Bet[] = [];
  public editingBet: Bet;
  public originalCopyOfBet: Bet[] = [];
  public betAmounts: number[] = [10, 20, 50, 100];
  private betAmountBeforeEdit: number;
  public otherUsersBetsModal: boolean = false;
  public otherUsersBets: Bet[];
  constructor(private bettingService: BettingService, private snackBar: MatSnackBar, private authService: AuthService, private webNotificationService: WebNotificationService) { }

  ngOnInit(): void {
    this.bettingService.getCurrentBets().subscribe(resp => {
        this.formatResponse(resp);
      },
      error => {
        this.openSnackBar("Error occured. Please retry!", "Ok");
      });

    if (!this.webNotificationService.isUserSubscribedForNotification()) {
      const snack = this.snackBar.open('Haven\'t subscribed yet ?', 'Get Notified!');
      snack
        .onAction()
        .subscribe(() => {
          this.webNotificationService.subscribeToNotification();
        });

      snack._dismissAfter(15000);
    }
  }

  onClose = () => {
    this.currentBetDetails = JSON.parse(JSON.stringify(this.originalCopyOfBet));
    this.isModalOpen = !this.isModalOpen;
  }

  canEdit = (bet: Bet): boolean => {
    const currentDate = new Date();
    currentDate.setMinutes(new Date().getMinutes() + 30);
    if (new Date(bet.MatchDate) > currentDate) {
      return true;
    }
    return false;
  }

  onEditClick = (betDetail: Bet) => {
    this.editingBet = betDetail;
    this.betAmountBeforeEdit = +JSON.stringify(betDetail.BetAmount);
    this.isModalOpen = true;
  }

  formatResponse(betHistoryDetails: Bet[]) {
    betHistoryDetails.forEach(bet => {
      bet.DisplayDate = formatDate(bet.MatchDate, EntityHelper.DateFormat, 'en-US');
    });
    this.currentBetDetails = betHistoryDetails;
    this.originalCopyOfBet = JSON.parse(JSON.stringify(this.currentBetDetails));
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  updateBet = (formRef: NgForm, isBetDeleted: boolean) => {
    if (!this.editingBet) return;
    var userInfo = EntityHelper.getUserDetails();
    const message = isBetDeleted ? "Bet deleted Successfully!!" : "Bet updated Successfully!!";
    var betAmount = isBetDeleted ? 0 : +formRef.value.betValue;
    var bet = new Bet(betAmount, this.editingBet.MatchId, +formRef.value.team, this.editingBet.BetId, isBetDeleted);
    this.bettingService.updateBet(bet).subscribe(resp => {
      this.updateWalletAndFutureBets(resp, userInfo, isBetDeleted);
      this.originalCopyOfBet = JSON.parse(JSON.stringify(this.currentBetDetails));
      this.onClose();
        this.openSnackBar(message, "Ok");
      },
      error => {
        this.onClose();
        this.openSnackBar("Please check your wallet amount before edit!!", "Ok");
      });
   
  }

  private updateWalletAndFutureBets(betDetails: Bet,userInfo:User, isBetDeleted: boolean) {
    if (isBetDeleted) {
      this.processDeletedBet(betDetails, userInfo);
    }
    userInfo.UserAmount = userInfo.UserAmount + this.betAmountBeforeEdit  - betDetails.BetAmount;
    localStorage.setItem(EntityHelper.LocalStorageUser, JSON.stringify(userInfo));
    this.authService.user.next(userInfo);
    this.betAmountBeforeEdit = 0;
  }

  private processDeletedBet(betDetails: Bet, userInfo: User) {
    const index = userInfo.UsersFutureBets.indexOf(betDetails.MatchId);
    if (index > -1) {
      userInfo.UsersFutureBets.splice(index, 1);
    }
    let betIndex = -1;
    this.currentBetDetails.forEach((bet,index) => {
      if (bet.BetId === betDetails.BetId) {
        betIndex = index;
      }
    });

    this.currentBetDetails.splice(betIndex, 1);
  }

  onBetsModalClose = () => {
    this.otherUsersBetsModal = false;
    this.otherUsersBets = [];
  }

  checkOtherUsersBets = (matchId: number) => {
    this.bettingService.otherUsersBets(matchId).subscribe(resp => {
      this.otherUsersBets = resp;
      this.otherUsersBetsModal = true;
    }, error => {
      this.openSnackBar("Error occured. Please retry!", "Ok");
      this.otherUsersBetsModal = false;
    });
  }
}
