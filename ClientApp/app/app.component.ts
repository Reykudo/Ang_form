import {Component, OnInit} from "@angular/core";
import {DataService} from "../data.services";
import {Contact, Message, Subject} from "./app.models";
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {
    FormGroup,
    FormBuilder,
    Validators,
    AsyncValidatorFn,
    AbstractControl,
    ValidationErrors
} from "@angular/forms";

@Component({
    selector: "app",
    templateUrl: "./app.component.html",
    providers: [DataService],
    styleUrls: [
        "./app.component.less",
        "../style.less"
    ]
})

export class AppComponent implements OnInit {

    title = "myapp";
    subjects: Subject[];
    myForm: FormGroup;
    sended: boolean = false;
    data: string[];

    constructor(private fb: FormBuilder, private dataService: DataService) {}

    isControlInvalid(controlName: string): boolean {
        const control = this.myForm.controls[controlName];
        const result = control.invalid && control.touched;
        return result;
    }

    onSubmit() {
        const controls = this.myForm.controls;
        /** Проверяем форму на валидность */
        if (this.myForm.invalid) {
            /** Если форма не валидна, то помечаем все контролы как touched*/
            Object.keys(controls)
                .forEach(controlName => controls[controlName].markAsTouched());
            return;
        } else {
            let contact = new Contact(this.myForm.value.name, this.myForm.value.email, this.myForm.value.phone);
            let message = new Message(contact, this.myForm.value.subject, this.myForm.value.message);

            this.dataService.sendMessage(message).subscribe((data: string[]) => {
                 this.data = data;
                 this.sended = true;
            });
        }
    }

    CaptchaValidator = (service: DataService): AsyncValidatorFn =>
        (control: AbstractControl): Observable < ValidationErrors | null > =>
        service.checkCaptcha(control.value).pipe(map((data: boolean) =>
            data ? null : {
                captcha: true
            }
        ));

    ngOnInit() {
        this.myForm = this.fb.group({
            name: ["", [
                Validators.required,
                Validators.pattern(/[А-я|A-z|]$/)
            ]],
            email: ["", [
                Validators.required,
                Validators.email
            ]],
            phone: ["", [
                Validators.required,
                Validators.pattern(/^(([0-9]){10})$/)
            ]],
            subject: [null, [
                Validators.required
            ]],
            message: [null, [
                Validators.required
            ]],
            captcha: [null, [
                Validators.required,
                 Validators.minLength(5)
            ],
            this.CaptchaValidator(this.dataService)
        ]

        });
        //инициализация тем сообщения
        this.dataService.getSubjects().subscribe((subjects: Subject[]) => {
            this.subjects = subjects;
            this.myForm.get('subject').setValue(subjects[0]); //установка значения поумолчанию
        });
    }
}