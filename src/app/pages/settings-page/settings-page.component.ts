import {Component, effect, inject, ViewChild} from '@angular/core';
import {ProfileHeaderComponent} from "../../common-ui/profile-header/profile-header.component";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProfileService} from "../../data/services/profile.service";
import {firstValueFrom} from "rxjs";
import {AvatarUploadComponent} from "./avatar-upload/avatar-upload.component";

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule,
    AvatarUploadComponent
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent {
  fb = inject(FormBuilder)
  profileService = inject(ProfileService);

  @ViewChild(AvatarUploadComponent) avatarUploader!: any;

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: '', disabled: true}, Validators.required],
    description: [''],
    stack: [''],
  })

  constructor() {
    effect(() => {
      // @ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
        //@ts-ignore
        stack: this.mergeStack(this.profileService.me()?.stack)
      });
    })
  }

  ngAfterViewInit() {
    // this.avatarUploader.avatar
  }

  onSave() {
    this.form.markAsTouched();
    this.form.updateValueAndValidity()

    if (this.form.invalid) return

    console.log(this.avatarUploader.avatar)
    if (this.avatarUploader.avatar){
      firstValueFrom(this.profileService.uploadAvatar((this.avatarUploader.avatar)))
    }

    // @ts-ignore
    firstValueFrom(this.profileService.patchProfile({
        ...this.form.value,
        stack: this.splitStack(this.form.value.stack)
      }
    ))
  }

  splitStack(stack
               :
               string | null | string[] | undefined
  ) {
    if (!stack) return []
    if (Array.isArray(stack)) return stack

    return stack.split(",")
  }

  mergeStack(stack
               :
               string | null | string[] | undefined
  ) {
    if (!stack) return ''
    if (Array.isArray(stack)) return stack.join(",")

    return stack
  }


}
