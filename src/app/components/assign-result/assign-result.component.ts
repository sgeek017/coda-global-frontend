import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { threadId } from 'worker_threads';
import { FormGroup, NgForm } from '@angular/forms';
import { zip } from 'rxjs';
import { LeaderboardService } from 'src/app/services/leaderboard.service';

@Component({
  selector: 'app-assign-result',
  templateUrl: './assign-result.component.html',
  styleUrls: ['./assign-result.component.scss'],
})
export class AssignResultComponent implements OnInit {
  form: FormGroup;
  disableTeam1 = false;
  disableTeam2 = true;

  disableButton = true;

  leaderBoardListLocal1 = [];
  leaderBoardListLocal2 = [];

  selectedTeams = [];

  @Input() leaderBoardList;

  constructor(
    private _modalController: ModalController,
    private _leaderboardService: LeaderboardService
  ) { }

  ngOnInit() {
    this.leaderBoardListLocal1 = [...this.leaderBoardList];
  }

  onCancel() {
    this._modalController.dismiss(null, 'CANCEL');
  }

  onChangeTeam1(event) {
    const value = event.detail.value;
    if (value !== undefined) {
      this.disableTeam1 = true;
      this.disableTeam2 = false;
      this.leaderBoardListLocal1.forEach(x => {
        if (x.id !== value.id) {
          this.leaderBoardListLocal2.push(x);
        }
      });

      this.selectedTeams.push(value);
    }
  }

  onChangeTeam2(event) {
    const value = event.detail.value;
    if (value !== undefined) {
      this.disableTeam2 = true;
      this.disableButton = false;

      this.selectedTeams.push(value);
    }
  }

  winner(x) {
    this.selectedTeams.forEach(st => {
      if (st.id === x.id) {
        st.wins = +st.wins + 1;
      } else {
        st.losses = +st.losses - 1;
      }
      st.score = +st.wins - +st.losses + +st.ties;
    });

    this.updateTeamScore();
  }

  tie(x) {
    this.selectedTeams.forEach(st => {
      st.ties = +st.ties + 1;
      st.score = +st.wins - +st.losses + +st.ties;
    });
    this.updateTeamScore();
  }

  updateTeamScore() {
    this._leaderboardService.updateTeamScore(this.selectedTeams).subscribe(result => {
      this._modalController.dismiss(null, 'DONE');
    }, error => {
      console.log(error);

    });
  }
}
