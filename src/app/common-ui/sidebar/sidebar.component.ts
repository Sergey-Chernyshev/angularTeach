import { Component } from '@angular/core';
import {SvgIconComponent} from "../svg-icon/svg-icon.component";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
import {SubscriberCardComponent} from "./subscriber-card/subscriber-card.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    RouterLink,
    NgForOf,
    SubscriberCardComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menuItems = [
    {
      label: "Моя страница",
      icon: "home",
      link: ''
    },
    {
      label: "Чаты",
      icon: "chat",
      link: '/chats'
    },
    {
      label: "Поиск",
      icon: "search",
      link: '/search'
    },
  ]
}
