import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    @ViewChild('userNameElementRef') userNameElementRef: ElementRef;
    @ViewChild('userPasswordElementRef') userPasswordElementRef: ElementRef;
    isUserCredValid: boolean;
    userName: string;
    password: string;
    showErrorMessage: boolean = false;
    apiBaseUrl = 'https://onlinenotemakingapp20210529201513.azurewebsites.net';
    submit = false;
    httpCallComplete = false;
    isLoading = false;
    errorMessage = '';
    isUserRegistered = false;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient) {
    }

    ngOnInit() {
    }


    onClickLogin() {
        this.showErrorMessage = false;
        this.userName = this.userNameElementRef.nativeElement.value;
        this.password = this.userPasswordElementRef.nativeElement.value;

        if (this.userName == '' || this.password == '') {
            this.errorMessage = 'Username and Password cannot be blank'
            this.showErrorMessage = true;
            return;
        }
        
        this.isLoading = true;

        //call api to authenticate user

        let authenticateUserApiUrl: string = `${this.apiBaseUrl}/Authentication/${this.userName}/${this.password}`;
        this.http.get<boolean>(authenticateUserApiUrl).subscribe(
            data => {
                this.isUserCredValid = data;
                if (this.isUserCredValid) {
                    //route to notes page
                    this.router.navigate(
                        ['note'],
                        {queryParams : {"username" : this.userName}});
                }
                else {
                    this.errorMessage = 'Invalid Input Credentials';
                    this.showErrorMessage = true;
                    return;
                }
            },
            error => {},
            () => {
                this.isLoading = false;
            }
            
        );
    }

    onClickRegister() {
        this.userName = this.userNameElementRef.nativeElement.value;
        this.password = this.userPasswordElementRef.nativeElement.value;

        //call api to save user
        var user = new User(0,this.userName,this.password)
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(user);
        

        let authenticateUserApiUrl: string = `${this.apiBaseUrl}/User`;
        
        this.isLoading = true;
        this.http.post<boolean>(authenticateUserApiUrl,body,{'headers': headers}).subscribe(
            data => {
                this.isUserRegistered = data;
                if(this.isUserRegistered)
                {
                    //route to notes page
                    this.router.navigate(
                        ['note'],
                        {queryParams : {"username" : this.userName}});
                }
                else
                {
                    this.isLoading = false;
                    this.errorMessage = 'Registration Failed';
                    this.showErrorMessage = true;
                }
                
            });
    }
}
