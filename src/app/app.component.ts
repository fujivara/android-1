import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {first, from} from "rxjs";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {AlertService} from "./alert.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.css',
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class AppComponent {
  readonly programmingLanguages = ['Python', 'JS', 'Java', 'Go', 'Rust', 'Lisp'];
  readonly fb = inject(FormBuilder);
  readonly selectedLanguageControl = this.fb.nonNullable.control('', Validators.required);
  readonly submittedLanguageControl = this.fb.nonNullable.control('', Validators.required);

  private readonly alertService = inject(AlertService);

  onCancel() {
    this.submittedLanguageControl.reset();
  }

  onSubmitLanguage() {
    if (this.selectedLanguageControl.invalid) {
      from(this.alertService.presentAlert({
        header: 'Please select language',
        buttons: ['Ok']
      }))
          .pipe(first())
          .subscribe();

      return;
    }

    this.submittedLanguageControl.setValue(this.selectedLanguageControl.getRawValue());
  }

  onSelectLanguage(lang: string) {
    this.selectedLanguageControl.setValue(lang);
  }
}
