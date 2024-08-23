declare var google:any;
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  private router = inject(Router);
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '959230062032-mvfljrnfsk9gtql217jeevaq3dpc0qkv.apps.googleusercontent.com',
      callback:(resp:any)=>this.handleLogin(resp)
    })
    google.accounts.id.renderButton(document.getElementById('google-btn'),{
      theme:'filled_blue',
      size:'large',
      shape:'rectangle',
      width:300
    })
  }

  private decodeToken(token:string){
    return JSON.parse(atob(token.split('.')[1]))
  }


  handleLogin(response:any){
    if(response){
      //decode the token
      const payLoad =  this.decodeToken(response.credential);
      //store in session
      sessionStorage.setItem("loggedInUser",JSON.stringify(payLoad));
      //navigate to home/browse
      this.router.navigate(['browse'])
    }
  }
}
