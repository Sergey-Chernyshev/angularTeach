import {Component, inject} from '@angular/core';
import {SvgIconComponent} from "../svg-icon/svg-icon.component";
import {RouterLink} from "@angular/router";
import {AsyncPipe, JsonPipe, NgForOf} from "@angular/common";
import {SubscriberCardComponent} from "./subscriber-card/subscriber-card.component";
import {ProfileService} from "../../data/services/profile.service";
import {firstValueFrom} from "rxjs";
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    RouterLink,
    NgForOf,
    SubscriberCardComponent,
    AsyncPipe,
    JsonPipe,
    ImgUrlPipe
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  profileService = inject(ProfileService);

  // Т.к это стрим то нужно добавить $
  subdcribers$ = this.profileService.getSubscribersShortList()

  me = this.profileService.me;

  menuItems = [
    {
      label: "Моя страница",
      icon: "home",
      link: '/profile/me'
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

  ngOnInit(){
    firstValueFrom(this.profileService.getMe())
  }
}
