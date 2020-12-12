import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertController, IonSearchbar, ModalController } from '@ionic/angular';
import { LeaderboardService } from 'src/app/services/leaderboard.service';
import { AssignResultComponent } from '../assign-result/assign-result.component';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  leaderBoardList = [];

  dataLength = 0;
  displayedColumns: string[] = ['team_name', 'wins', 'losses', 'ties', 'score'];
  dataSource: MatTableDataSource<any[]>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('mySearchBar', { static: true }) searchbar: IonSearchbar;

  constructor(
    private _leaderboardService: LeaderboardService,
    private _alertController: AlertController,
    private _modalController: ModalController
  ) { }

  ngOnInit() {
    this.loadLeaderBoard();

  }

  loadLeaderBoard() {
    this._leaderboardService.getAllLeaderboard().subscribe(result => {
      this.leaderBoardList = result;
      this.dataSource = new MatTableDataSource(result);
      this.dataLength = result.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.sort.direction = 'desc';
      this.searchbar.value = '';
    }, error => {
      console.log('error while loading');
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  async onAdd() {
    const alert = await this._alertController.create({
      header: 'Add Team name',
      inputs: [
        {
          name: 'team_name',
          type: 'text',
          placeholder: 'Team name'
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Add',
          handler: (alertData) => {
            const team_name = alertData.team_name;
            if (team_name === undefined || team_name === null) {
              return false;
            } else {
              this._leaderboardService.addTeamname(team_name).subscribe(result => {
                window.alert("Successfully added");
                this.loadLeaderBoard();

              }, error => {
                console.log(error);

              });
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async onAssignResult() {
    this._modalController.create({
      componentProps: { leaderBoardList: this.leaderBoardList },
      component: AssignResultComponent,
      backdropDismiss: false,
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then(result => {
      if (result.role === 'DONE') {
        this.loadLeaderBoard();
      }
    });
  }
}
