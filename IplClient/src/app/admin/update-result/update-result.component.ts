import { Component, OnInit } from '@angular/core';
import { BettingService } from "../../betting.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';
import { Match } from "../../models/match.model";
import { EntityHelper } from "../../helpers/EntityHelper";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-result',
  templateUrl: './update-result.component.html',
  styleUrls: ['./update-result.component.css']
})
export class UpdateResultComponent implements OnInit {
  public matchDetails: Match[] = [];
  public betAmounts: number[] = [10, 20, 50, 100];
  public selectedMatch: Match;
  constructor(private bettingService: BettingService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadMatchDetails();
  }

  loadMatchDetails = () => {
    this.bettingService.getAdminMatchDetails().subscribe(resp => {
      this.formatResponse(resp);
    }, error => {
        console.log(error);
        this.openSnackBar("Error occured. Please retry!", "Ok");
    });
  }

  formatResponse(matchDetails: Match[]) {
    matchDetails.forEach(match => {
      match.DisplayDate = formatDate(match.MatchDateTime, EntityHelper.DateFormat, 'en-US');
    });
    this.matchDetails = matchDetails;
  }

  onMatchSelected(matchId: number) {
    this.selectedMatch = this.matchDetails.find(x => x.MatchId === +matchId);
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  resetFormData = (formRef: NgForm) => {
    formRef.resetForm();
    this.selectedMatch = null;
  }

  updateResult = (formRef:NgForm) => {
    let isMatchAbandoned = +formRef.value.team === 0;
    var match = new Match(this.selectedMatch.MatchId, +formRef.value.team, isMatchAbandoned);
    this.bettingService.updateMatchResult(match).subscribe(matchResponse => {
      this.openSnackBar("Result Updated successful!", "Ok");
      this.loadMatchDetails();
      this.resetFormData(formRef);

    }, error => {
      this.openSnackBar("Error occured. Please retry!", "Ok");
      this.resetFormData(formRef);
    });
  }

  removeAllBets = () => {
    this.bettingService.removeAllBets().subscribe(matchResponse => {
      this.openSnackBar("Removed All Bets", "Ok");

    }, error => {
      this.openSnackBar("Error occured. Please retry!", "Ok");
    });
  }
}
