import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'todolistapp';
  public apiURL : any ;
  public alllist : any ;
  public listexist : boolean = false;
   constructor(private http: HttpClient) {
   this.apiURL  = "http://localhost:3000/api/"
  }
  ngOnInit() {
    this.listToDoList();
   
}

addToDoList(val)
{
   const params = {
      "todo_name": val,
    };

    this.http.post(this.apiURL + "todotables/addtodolist", params).subscribe(details => {
      if(details.response_status.status==200)
        {
        //alert(details.response_status.message)
        this.listToDoList();
        }
      else
        {
        alert("Error");
        }
    });
}

listToDoList()
{
    const params = {
      "list": "all",
    };
  this.http.post(this.apiURL + "todotables/listtodolist", params).subscribe(details => {
      if(details.response_status.status==200)
        {
         if(details.response.length>0)
          {
            this.listexist = true;
            this.alllist = details.response;
          }
          else
            {
              this.listexist = false;
            }
        }
      else
        {
        alert("Error");
        }
    });
}

removeToDoList(id)
{
  const params = {
      "id": id,
    };
  this.http.post(this.apiURL + "todotables/removetodolist", params).subscribe(details => {
      if(details.response_status.status==200)
        {
         alert(details.response_status.message);
         this.listToDoList();
        }
      else
        {
        alert("Error");
        }
    });
}

markAsRead(val)
{
   const params = {
      "id": val,
    };
  this.http.post(this.apiURL + "todotables/markasread", params).subscribe(details => {
      if(details.response_status.status==200)
        {
         alert(details.response_status.message);
         this.listToDoList();
        }
      else
        {
        alert("Error");
        }
    });
}
}


