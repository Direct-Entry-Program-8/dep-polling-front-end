import {Component, Input, OnInit} from '@angular/core';
import {Poll} from "../dto/poll";

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  @Input()
  poll!: Poll;

  constructor() { }

  ngOnInit(): void {
  }

}
