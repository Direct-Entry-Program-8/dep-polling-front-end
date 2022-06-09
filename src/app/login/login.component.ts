import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  name = "";
  invalid = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  enter(): void{
    if (this.userService.login(this.name)){
      this.invalid = false;
    }else{
      this.invalid = true;
    }
  }

}
