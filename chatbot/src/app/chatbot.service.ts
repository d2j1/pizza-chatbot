import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private baseUrl='http://localhost:3333/event';
   private base='http://localhost:3333/userdetails';
   
   private orderStatus="http://localhost:3333/orderStatus";

  constructor(private http:HttpClient) { }
getMessage():Observable<any>{

  return this.http.get(`${this.baseUrl}`);

}

putUserDetailsInDatabase(name1:string,contact1:number,address1:string){
const obj={name:name1,contact:contact1,address:address1};
  
  return this.http.post(`${this.base}`,obj);


}

putOrderStatusinDatabase(orderId:number,status1:string){

  const obj={orderid:orderId,status:status1};
  return this.http.post(`${this.orderStatus}`,obj);
}
  getOrderStatus(orderId){
    console.log('order id in services'+orderId);
       var url=this.orderStatus+'?orderid='+orderId;

     return this.http.get(`${url}`);
  }
}


