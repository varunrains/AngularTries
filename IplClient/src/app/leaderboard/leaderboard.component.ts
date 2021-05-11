import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntityHelper } from "../helpers/EntityHelper";
import { BettingService } from "../betting.service";
import { User } from '../models/user.model';
import { MatDialog} from '@angular/material/dialog';
import { SimpleDialogComponent } from '../simple-dialog/simple-dialog.component';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  public leaderBoardUsers: User[] = [];
  constructor(private bettingService: BettingService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.bettingService.getUserWinningPercentage().subscribe(resp => {
      this.leaderBoardUsers = resp;
    },
      error => {
        this.openSnackBar("Error occured. Please retry!", "Ok");
      });
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  leaderScreenInfo = () => {
    const dialogRef = this.dialog.open(SimpleDialogComponent, {
      // width: '250px',
      data: {
        title: 'Information',
        body: 'Leader board is created for the users who have betted more than 3 matches and the winning percentage is calcuated based on the total number of wins.'
      }
    });
  }


}
