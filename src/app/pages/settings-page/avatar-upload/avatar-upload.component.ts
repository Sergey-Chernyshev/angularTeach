import {Component, inject, signal, SimpleChanges} from '@angular/core';
import {SvgIconComponent} from "../../../common-ui/svg-icon/svg-icon.component";
import {DndDirective} from "../../../common-ui/directives/dnd.directive";
import {ProfileService} from "../../../data/services/profile.service";
import {ImgUrlPipe} from "../../../helpers/pipes/img-url.pipe";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {switchMap} from "rxjs";
import {Profile} from "../../../data/interfaces/profile.interface";

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [
    SvgIconComponent,
    DndDirective,
    ImgUrlPipe
  ],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.css',
  providers: [ImgUrlPipe]
})
export class AvatarUploadComponent {
  profileService = inject(ProfileService);

  imgUrlPipe = inject(ImgUrlPipe)

  me$ = toObservable(this.profileService.me)
  preview = signal<string | null>("/assets/imgs/avatar-placeholder.png");

  ngOnInit() {
    // Подписка на `me$` для отслеживания изменений
    this.me$.subscribe(profile => {
      if (profile) {
        if (profile!.avatarUrl) {
          this.preview.set(this.imgUrlPipe.transform(profile!.avatarUrl));
        }
      }
    })
  }


  // <img _ngcontent-ng-c1463941611="" alt="" src="https://icherniakov.ru/yt-course/static/avatars/potomuchto999.png">
  avatar: File | null = null;

  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0]
    this.peocessFile(file)

  }

  onFileDroped(file: File | null) {
    this.peocessFile(file)
  }

  peocessFile(file: File | null | undefined) {
    if (!file || !file.type.match('image')) return

    const reader = new FileReader();
    reader.onload = event => {
      this.preview.set(event.target?.result?.toString() ?? '')
    }

    reader.readAsDataURL(file)
    this.avatar = file
  }
}
