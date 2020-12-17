import { Component, OnInit } from '@angular/core';
import { ChatbotService } from '../chatbot.service';
import { status } from '../stauts'

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  constructor(private api :ChatbotService) { }
public stat:status;
  databaseData=[];
  data:any=[];

  //array to store cart
  cart:any=[];

  //tos store user information
  userInfo:any=[];

  ngOnInit(): void {
   
    //it gets call on load
       this.createMessage("chatbot","Hello How can i help you");
         this.buttonCreator(this.entryOptions,1);


  }


 


  
  // main function it gets called when send button is pressed

  
message(message:any){
    this.data=message.split(' ');
(<HTMLInputElement>document.getElementById('user-input')).value='';

if(message=='')
alert("please enter question");

var tempi,tempj,temp=false;
    this.api.getMessage().subscribe(data=>{
      this.databaseData=data;

      for(let i=0;i<this.data.length;i++){
        for(let j=0;j<this.databaseData.length;j++){

          if(this.data[i]==this.databaseData[j].question){
            temp=true;
              tempj=j;
              tempi=i;
              break;

            
          
        }
        
      }
      }

      if(temp)
      this.removeElementall(1,tempi,tempj);
      else{
          this.removeElementall(2,0,0);
      }
    },error=>console.log(error));
  }
  
  

removeElementall(k:number,i:number,j:number){
 
        var btn=document.getElementById('user1');
        while(btn!=null){
          this.removeElement();
          btn=document.getElementById('user1');
        }

        var btnName=document.getElementById('name');
        if(btnName!=null)
        this.removeElementById('name');
        var btnContact=document.getElementById('contact');
        if(btnContact!=null)
        this.removeElementById('contact');

        var btnAddress=document.getElementById('address');
        if(btnAddress!=null)
        this.removeElementById('address');

        var btnOrderId=document.getElementById('mainOrderInputDiv');
        if(btnOrderId!=null)
        this.removeElementById('mainOrderInputDiv');




        if(k==1){
            this.createMessage("user",this.data[i]);
              
       
          this.createMessage("chatbot",this.databaseData[j].answer);
         this.buttonCreator(this.entryOptions,1);
        }
        else if(k==2){
          this.createMessage("chatbot","What!!!! Sorry I didn't understand");
          this.createMessage("chatbot","How can i help you?");
         this.buttonCreator(this.entryOptions,1);
        }


}


  //function to create messages and append to "messages" parent tag 
  

    createMessage(userName:string,message1:string){

 var userinput=document.createElement('div');
          userinput.className=userName;
          userinput.innerHTML=message1;
         // userinput.id="user";
          document.getElementById('messages').appendChild(userinput);

  }

  // Options button name
     entryOptions=["Order Pizza","Track Order","Exit"];
entryOptions2=["Veg Pizza","Non veg Pizza"] ;
entryOptions3=["Order Another Pizza","Confirm Order"];

     // Function to create button options 
  buttonCreator(data:any=[],k:number){
     
     for(let i=0;i<data.length;i++){
      var btn=document.createElement('button');
      btn.innerHTML=data[i];
      btn.id="user1";
      if(k==1)
      btn.addEventListener("click", (e:Event) => this.functionwithparam(i));
      else if(k==2)
      btn.addEventListener("click", (e:Event) => this.functionwithparam2(i));

      else if(k==3)
      btn.addEventListener("click", (e:Event) => this.functionwithparam4(i));

      btn.className="chatarea-inner btn";
      document.getElementById('messages').appendChild(btn);
     }
    }

    //function to process first options list i.e. order pizza , track your order options 
        functionwithparam(i:any){
       if(i==0){
      
this.removeElement();
this.removeElement();
this.removeElement();
           this.createMessage("user","Order Pizza");
           

        this.buttonCreator(this.entryOptions2,2);
         
      
       }
       else if(i==1){
         this.removeElement();
         this.removeElement();
         this.removeElement();
         this.createMessage("user","Track Order");
          this.orderIdDiv();
       }
       else if(i==2){
         
        window.location.reload();

       }
       
     }
      //function to process second  options list i.e. veg pizza , Non veg pizza options 
     
     functionwithparam2(i:any){
       if(i==0){
        this.removeElement();
          this.removeElement();

          this.createMessage("user","Veg Pizza");
          this.buttonCreatorVeg();

         
       }
       else if(i==1){

        this.removeElement();
        this.removeElement();

        this.createMessage("user","Non Veg Pizza");
        this.buttonCreatorNonVeg();

       }
      }

      //below function for "buttonCreatorNonVeg" and "buttonCreatorVeg" function
functionwithparam3(i:number,type:string){

  if(type=="veg"){
  for(let j=0;j<this.vegPizzaList.length;j++){
  this.removeElement();
  }
  var str='<b>'+this.vegPizzaList[i].name+'</b><br>  Price: '+this.vegPizzaList[i].price+'</p>';
  this.createMessage('user',str);
  this.cart.push(this.vegPizzaList[i]);

}
    else if (type=="nonveg"){

      for(let j=0;j<this.nonVegPizzaList.length;j++){
  this.removeElement();
  }
  var str='<b>'+this.nonVegPizzaList[i].name+'</b><br>  Price: '+this.nonVegPizzaList[i].price+'</p>';
  this.createMessage('user',str);
  this.cart.push(this.nonVegPizzaList[i]);
    }

    this.buttonCreator(this.entryOptions3,3);
}

          // This function is for "Order Another Pizza and confirm Order" processes
          functionwithparam4(i:number){

            this.removeElement();
        this.removeElement();
        if(i==0){
                this.buttonCreator(this.entryOptions2,2);

        }else{
            var str="Your Orders :";
            var totalPrice=0;
            for(let j=0;j<this.cart.length;j++){
              str+='<br><b>'+(j+1)+": "+this.cart[j].name;
              totalPrice+=this.cart[j].price;
            }
            str+='</b><br> Total Price is: <b>'+totalPrice+ '</b>';
            this.createMessage("chatbot",str);
             this.createMessage("chatbot","Enter Your Details");
             this.takeUserDetailsTag();

        }

}

     removeElement(){
    const toRemove=  document.getElementById("user1");
    toRemove.remove();
     }
      
     removeElementById(str:string){

    const toRemove=  document.getElementById(str);
    toRemove.remove();
     }
 vegPizzaList=[{
name:"Veg Extravaganza",
details:"A pizza that decidedly staggers under an overload of golden corn, exotic black olives, crunchy onions, crisp capsicum, succulent mushrooms, juicyfresh tomatoes and jalapeno - with extra cheese to go all around."
,price:234
},
{
name:"CHEESE N CORN",
details:"Cheese and Golden Corn",
price:345},
{
name:"PANEER MAKHANI",
details:"Paneer and Capsicum on Makhani Sauce",
price:456
},
{
name:"VEGGIE PARADISE ",
details:"Goldern Corn, Black Olives, Capsicum & Red Paprika",
price:423
},
{
name:"Indi Tandoori Paneer",
details:"It is hot. It is spicy. It is oh-so-Indian. Tandoori paneer with capsicum and red paprika and mint mayo",
price:700}
];

nonVegPizzaList=[{
name:"PEPPER BARBECUE CHICKEN",
details:"Pepper Barbecue Chicken and Cheese",
price:465
},
{
name:"CHICKEN SAUSAGE",
details:"Chicken Sausage and Cheese",
price:400
},
{
name:"Chicken Golden Delight",
details:"Barbeque chicken with a topping of golden corn loaded with extra cheese. Worth its weight in gold!"
,price:489
},
{
name:"Chicken Dominator",
details:"Treat your taste buds with Double Pepper Barbecue Chicken, Peri-Peri Chicken, Chicken Tikka & Grilled Chicken Rashers"
, price:300
}];

buttonCreatorVeg(){
        
     for(let i=0;i<this.vegPizzaList.length;i++){
      var btn=document.createElement('button');
      btn.innerHTML='<b>'+this.vegPizzaList[i].name+'</b><br><p>'+this.vegPizzaList[i].details+'<br><br>  Price: '+this.vegPizzaList[i].price+'<br></p>';
      btn.id="user1";
      btn.addEventListener("click", (e:Event) => this.functionwithparam3(i,"veg"));
      btn.className="chatarea-inner btn";
      document.getElementById('messages').appendChild(btn);
     }
    }
     
    buttonCreatorNonVeg(){
      for(let i=0;i<this.nonVegPizzaList.length;i++){
      var btn=document.createElement('button');
      btn.innerHTML='<b>'+this.nonVegPizzaList[i].name+'</b><br><p>'+this.nonVegPizzaList[i].details+'<br><br>  Price: '+this.nonVegPizzaList[i].price+'<br></p>';
      btn.id="user1";
      btn.addEventListener("click", (e:Event) => this.functionwithparam3(i,"nonveg"));
      btn.className="chatarea-inner btn";
      document.getElementById('messages').appendChild(btn);
    }
}

  takeUserDetailsTag(){
    
    var mainDiv=document.createElement('div');
    mainDiv.id="mainUserInputDiv";
    mainDiv.className="chatarea-inner ";
    document.getElementById('messages').appendChild(mainDiv);

    var inputTag1=document.createElement('input');
    inputTag1.placeholder="Enter Name";
    inputTag1.id="name";
    document.getElementById("mainUserInputDiv").appendChild(inputTag1);

    
    var inputTag2=document.createElement('input');
     inputTag2.placeholder="Enter contact no";
    inputTag2.id="contact";
    document.getElementById("mainUserInputDiv").appendChild(inputTag2);

    
    var inputTag3=document.createElement('input');
     inputTag3.placeholder="Enter address";
    inputTag3.id="address";
    document.getElementById("mainUserInputDiv").appendChild(inputTag3);

    var button=document.createElement('button');
    button.id="user1";
    button.innerHTML="Submit";
    button.className="chatarea-inner btn";
     button.addEventListener("click", (e:Event) => this.takeUserInput());
     document.getElementById("mainUserInputDiv").appendChild(button);

    
  }

  takeUserInput(){
 
    var name=(<HTMLInputElement>document.getElementById('name')).value;
    var contactNo=(<HTMLInputElement>document.getElementById('contact')).value;
    var address=(<HTMLInputElement>document.getElementById('address')).value;
    var test=Number(contactNo);

    if(name.length==0 || contactNo.length==0 || address.length==0){
       this.removeElementById("mainUserInputDiv");
      this.createMessage("chatbot","Enter valid user credentials");
        this.takeUserDetailsTag();
    }
    else{

    if(contactNo.length!==10 || isNaN(test) ){
      this.removeElementById("mainUserInputDiv");
       
        this.createMessage("chatbot","Enter correct mobile number");
        this.takeUserDetailsTag();
    }
    else{
this.userInfo[0]=name;
  this.userInfo[1]=contactNo;
  this.userInfo[2]=address;
    

  
     
    this.removeElementById('mainUserInputDiv');

    //To print user details
      var str ="Your Details: "+'<br> Name: <b>'+this.userInfo[0]+'</b><br> Contact No: <b>'+this.userInfo[1]+'</b><br> Address: <b>'+this.userInfo[2]+'</b>'
      this.createMessage("chatbot",str);


      //to print order details
      var random=Math.floor(Math.random() * (9 * (Math.pow(10, 5)))) + (Math.pow(10, 5));
      var orderId=random;
      
      var str='Your Order Id: '+orderId+"<br> Your Orders Details:";
      var totalPrice=0;
            for(let j=0;j<this.cart.length;j++){
              str+='<br><b>'+(j+1)+": "+this.cart[j].name;
              totalPrice+=this.cart[j].price;
            }
            str+='<br> Total Price is: <b>'+totalPrice;
            this.createMessage("chatbot",str);
              this.cart=[];
            this.createMessage("chatbot" ,  " Your Order is placed successfully <br> Thank you ");

           
           this.api.putUserDetailsInDatabase(this.userInfo[0],Number(this.userInfo[1]),this.userInfo[2]).subscribe( data =>{
          
        },
        error => console.log(error));
           //to put order id and status in database
           this.api.putOrderStatusinDatabase(Number(orderId),"Order Dispatched").subscribe( data =>{
        },
        error => console.log(error));

        this.createMessage("chatbot","How can i help you?")
        this.buttonCreator(this.entryOptions,1);
  }
}
  }

  orderIdDiv(){
    this.createMessage("chatbot"," Enter Order Id")
     var mainDiv=document.createElement('div');
    mainDiv.id="mainOrderInputDiv";
    mainDiv.className="chatarea-inner ";
    document.getElementById('messages').appendChild(mainDiv);

    var inputTag1=document.createElement('input');
    inputTag1.placeholder=" Order Id";
    inputTag1.id="orderId";
    document.getElementById("mainOrderInputDiv").appendChild(inputTag1);

    var button=document.createElement('button');
    button.id="user1";
    button.innerHTML="Submit";
    button.className="chatarea-inner btn";
     button.addEventListener("click", (e:Event) => this.takeOrderId());
     document.getElementById("mainOrderInputDiv").appendChild(button);

    
  }
  
  takeOrderId(){
    var orderId=(<HTMLInputElement>document.getElementById('orderId')).value;
    this.removeElementById("mainOrderInputDiv");
   
     var temp=null;
    this.api.getOrderStatus(orderId).subscribe(data=>{
      temp=data;

      if(data[0]!=undefined){
      
      this.createMessage("chatbot",'Your order status is: <br>'+"  "+data[0].status);
      this.createMessage("chatbot","How can i help you?");
        this.buttonCreator(this.entryOptions,1);
      
      }
      else{

        this.createMessage("chatbot","Enter valid Order Id");
        this.orderIdDiv();
      }
      
      },error=>console.log(error));
      

  }

}
