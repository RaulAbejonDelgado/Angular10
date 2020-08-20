import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent implements OnInit {

  listOfSomething: string[] = ["TypeScript", "JavaScript", "Java", "python", "C#"];
  enable: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  enableDiscableButton() : void {
    this.enable = this.enable == true ? this.enable = false : this.enable = true
  } 

}
