import { Component, OnInit } from '@angular/core';
import {Poll} from "../dto/poll";
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  static number = 0;
  polls: Array<Poll> = []

  constructor(private userService: UserService,
              private routerService: Router,
              private httpService: HttpClient) { }

  ngOnInit(): void {
    if (!this.userService.getPrincipal()){
      this.routerService.navigateByUrl('login');
    }

    this.httpService.get<Array<Poll>>('http://localhost:8080/polling-system/api/v1/polls')
      .subscribe({
        next: value => this.polls = value,
        error: err => console.error(err)
      });
  }

  createPoll(title: string) {
    if (title.trim()){
      const poll = new Poll(title, this.userService.getPrincipal()!);

      this.httpService.post<Poll>('http://localhost:8080/polling-system/api/v1/polls', poll)
        .subscribe({
          next: value => {
            this.polls.unshift(value);
          },
          error: err => {
            console.error(err);
          }
        })
    }
  }

  navigate(id: number) {
    // this.routerService.navigateByUrl(`polls/${id}`);
    this.routerService.navigate(['polls', id]);
  }
}
