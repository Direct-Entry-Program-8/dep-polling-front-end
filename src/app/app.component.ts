import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  texts = ["ijse", "esoft", "abc", "KKK"];

  add() {
    this.texts.push('Something' + Math.random());
  }

  remove() {
    this.texts.pop();
  }
}
