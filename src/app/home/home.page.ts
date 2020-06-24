import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Message } from "../message";
import { Router } from '@angular/router';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {

  msg : Message[] = [{message : "", id : 0, app: "", agent: 0, type: "", localisation: ""}];

  constructor(private route: ActivatedRoute, private router : Router) {
    console.log("INIT");
    this.getMsg()
  }

  changeView(mode){
    if (mode == "map"){
      this.router.navigate(['/map'])
    }else if(mode == "list"){
      this.router.navigate(['/home'])
    }
  }

  getMsg(){
    //Récupération des données d'une page à une autre
    var response = this.route.snapshot.paramMap.get('message')
    var obj = JSON.parse(response)
    this.msg = obj;
    console.log(this.msg)
  }

  openProject(message, id, app, agent, type, localisation){

    let actionName = "android.intent.action.MAIN";
    let extras = [{ name: "message", value: message, dataType: "String" },
                  { name: "id", value: id, dataType: "String"},
                  { name: "app", value: app, dataType: "String"},
                  { name: "agent", value: agent, dataType: "String"},
                  { name: "type", value: type, dataType: "String"},
                  { name: "localisation", value: localisation, dataType: "String"}
                ];

    var packageName = ""
    var FPS = 'com.exyzt.fps';
    var TAE = 'com.exyzt.tae';
    //App qui sera ouvert
    switch (app){
      case 'TAE' : 
      packageName = TAE;
      break;
      case 'FPS' : 
      packageName = FPS;
      break;
      default:
        console.error();
        break;
    }

    var myApp = {
      packageName : packageName,
      actionName: actionName,
      extras: extras
    }

    //L'app peut être lancé
    window["plugins"].launcher.canLaunch(
      { actionName: actionName, extras: extras },
      (data) => console.log("APP can be launched" + JSON.stringify(extras)),
      (errMsg) => console.log("APP not installed! " + errMsg)
    );

    //Lance l'app
    window["plugins"].launcher.launch(myApp);
  }


}
