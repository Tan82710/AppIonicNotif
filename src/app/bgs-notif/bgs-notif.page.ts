import { Component, OnInit } from '@angular/core';
import { NotifService } from '../notif.service';
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";
import { Router } from '@angular/router';
import { Message } from "../message";

@Component({
  selector: 'app-bgs-notif',
  templateUrl: './bgs-notif.page.html',
  styleUrls: ['./bgs-notif.page.scss'],
})
export class BgsNotifPage implements OnInit {

  message : Message;

  constructor(
    private requeteService: NotifService,
    private localNotifications: LocalNotifications,
    private router: Router
  ) { }

  ngOnInit() {
    //Effectue la req getReq toute les 10 sec
    setInterval(() => {
      this.getReq();
    }, 10000);
  }

  //Notification
  Notif(msg) {
    this.localNotifications.schedule({
      id: 1,
      title: "Mission attribué",
      text: '',
      smallIcon: "res://assets/icon/Exyzt.png",
      icon: "file://assets/icon/Exyzt.png",
      led: "FF0000",
    });
    //Au clic de la notif, ouvre la page de la liste des missions attribué
    this.localNotifications.on("click").subscribe(() => {
      console.log(msg)
      this.router.navigate(['/home', {message : msg}])
    });
  }

  //Service Req HTTP
    getReq() {
    console.log("TEST REQ");
    this.requeteService.getUrl().subscribe((res) => {
      console.log("Req Success")
      console.log(res)

      // let data = [
      //   { message: "Un message de test TAE", app: "TAE", agent: "001", type: 'PVe', localisation: 'Rue Victor Hugo' },
      //   { message: "Un message de test FPS", app: "FPS", agent: "002", type: 'Contrôle FPS', localisation: 'Avenue des Etats-Unis' },
      //   { message: "Un autre message de test FPS", app: "FPS", agent: "003", type: 'Contrôle FPS', localisation: 'Rue de Metz' },
      //   { message: "Un dernier message de test TAE", app: "TAE", agent: "004", type: 'PVe', localisation: 'Avenue de Toulouse ' },
      //   { message: "Un dernier message de test FPS", app: "FPS", agent: "005", type: 'Contrôle FPS', localisation: 'Rue Voltaire' },
      //   { message: "Un autre message de test TAE", app: "TAE", agent: "006", type: 'PVe', localisation: 'Avenue Beausoleil' },
      // ];

      let objJson = JSON.stringify(res)
      this.Notif(objJson)
    });
  }

}