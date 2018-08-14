import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  year = [];
  month = ['MM', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  day = ['DD', 1, 2, 3, 4, 5, 6, 7, ]

  constructor() { }

  ngOnInit() {
  }

}
