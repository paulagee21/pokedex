import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pokenav',
  templateUrl: './pokenav.component.html',
  styleUrls: ['./pokenav.component.sass']
})
export class PokenavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input()
  pokemon: String;

  @Input()
  class: String;
}
