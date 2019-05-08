import {
    Injectable
} from "@angular/core";
import {
    HttpClient
} from "@angular/common/http";

import { Observable, of, from } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import {Contact, Message, Subject} from "./app/app.models";

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {}

    getSubjects = () => {
        return this.http.get<Subject[]>("/api/subjects")
        .pipe(catchError(this.handleError("getSubjects", [])));
    }
    sendMessage = (message: Message) => {
        return this.http.post<Message>("/api/messages", message)
        .pipe(catchError(this.handleError("sendMessage", [])));
    }
    checkCaptcha = (captcha: string) :Observable<Object> => {
        console.log("service: ",captcha);
        return this.http.post("/api/captcha", {CaptchaCode: captcha})
        .pipe(catchError(this.handleError("checkCaptcha", [])));
    }  

    private handleError<T>(operation = "operation", result?: T) {
        return (error: any): Observable<T> => {
          console.error(error);
          return of(result as T);
        };
      }
}