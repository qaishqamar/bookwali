import React, {Component, useState} from 'react'
import { alignPropType } from 'react-bootstrap/esm/DropdownMenu';
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import '../constants/globalVar';
class CityAddress extends Component{
    
    constructor(){
        super();
        
        this.state = {
            Cities: [],
            Localities:[],
            selectedCity:"",
            charge:"",
            pinA:[], //29
            pinB:[], //39
            pinC:[], //49 
            pinD:[], //59
            pinE:[], //79
            pinF:[], //89
            pinG:[], //99
            pinH:[], //109
            pinI:[], //119
            pinJ:[], //129
            pinK:[], //139
            pinL:[], //149
            pinM:[],
            pinN:[]            
        };
    
    }
   componentDidMount(){
       this.setState({
           Cities:[
               {name:"Ranchi",Localities:["835103","835109","835222","834001","834009","834002","835222"
            ,"835219","834006","835204","834004","835221","834001","829208"]},
               {name:"Lohardagga",Localities:["835302","835213","Lohar3","Lohar4"]},
               {name:"Khunti",Localities:["835210","835227","khunti3","khunti4"]},
               {name:"Ramgrah",Localities:["829110","825316","829133","815301"]},
               {name:"Plamu",Localities:["822101","822113","822117","822101","822123"]},
               {name:"Godda",Localities:["814133","814154","godda3","godda4"]},
               {name:"Gumla",Localities:["835207","835227","835208"]},

               {name:"Simdega",Localities:["835223","835211","simdega3","simdega"]},
               {name:"Latehar",Localities:["829206","825322","godda3","godda4"]},
               {name:"Garhwa",Localities:["822114","822125","822121"]},

               {name:"Jamshedpur",Localities:["831002","835211","simdega3","simdega"]},
               {name:"E singhbhum ",Localities:["831006","831002","831012","831010","832103","832302","785675","832102"]},
               {name:"saraikela karsawa",Localities:["831013","833219","833102"]},

               {name:"W Singhbhum ",Localities:["833201","833104","833103","412307","833201","833217","833102","825301","832401"]},
               {name:"Hajaribag",Localities:["825405","825319","825406","743247","825323"]},
               {name:"Chatra",Localities:["825401","829109"]},
               {name:"Giridih",Localities:["815301","825106","825167","815318","825412","825322"]},
               {name:"Koderma",Localities:["825410","825409","825407"]},
               {name:"Jamtara",Localities:["815351","815354",]},
               {name:"Dumka",Localities:["814118","814101","814101"]},
               {name:"Sahebganj ",Localities:["816109","816101","816108","816109"]},
               {name:"Pakur",Localities:["816407","814111","816107"]},
               {name:"Deoghar",Localities:["814112","814149","8815353","814113","814142"]},
               {name:"Sahebganj ",Localities:["816109","816101","816108","816102","816116"]},
               {name:"Dhanbad",Localities:["826001","828401","828306","826001","826001","828110","828111","828101","826001","828204","828142","828116","828116","828205","828202","828109","382480"]},
               {name:"Bokaro",Localities:["827001","828302","828134","829111","828102","827010","829113"]},


           ],	
           


           pinA:["834001","834009","834002","835222"],  //29
           pinB:[" 834006"],  //39
           pinC:["835208",""],  //49
           pinD:["835103",""], //59
           pinE:["835219"," 834004","829109","829110","825316"], //69
           pinF:["835221","829133"], //79
           pinG:["834001","835302"," 831001","829113"," 832401","825301","825405","814133","814154","826001","826001","827010","835227","826001","829111","828102"], //89
           pinH:[" 835204","835210","822101","828401","831012","833103","412307","825322","825323","831002","815301","825106","835227","825401","743247","827001","828306","828134","828302","828101","825319","833102","828111","828110"," 833102","  833219","835207","831013"," 833201","833201","835223","831013","822101","829206"," 831002","831006","831010"],//99
           pinI:[" 835211","835213","815351","814101","832302","822123"," 822114","822125","828204","832102","825406","825410","828142"," 382480","828109","828202","825409","828205"], //109
           pinJ:["825322","832103","828116","815301","825412","825407","814112","814149","826001","828116"], //119
           pinK:["822113","814113","815353","814111","822117","822121","785675","833217","825167","815318","815354","814118"], //129
           pinL:["816101","816407","816102","814142","816107"],//139
           pinM:["816109","816108","816116","816109","833104"]  //149
                  
    
       });
   }
   slectStyle = {
    // fontSize: 14,
    // color: 'blue',
    marginLeft: '15px'
    
  }
   setData(e){
    // var [charge, setCharge] = useState('select pin');
    // setCharge("29")
    var charge=0
    global.cityName=this.state.selectedCity
    global.pinNo=e.target.value
    if(this.checkPin(this.state.pinA,e.target.value)){
        // this.props.setAdd(29)
        charge=29
    }else if(this.checkPin(this.state.pinB,e.target.value)){
        // this.props.setAdd("39")
        charge=39
    }else if(this.checkPin(this.state.pinC,e.target.value)){
        this.props.setAdd("49")
        charge=49
    }else if(this.checkPin(this.state.pinD,e.target.value)){
        // this.props.setAdd("59")
        charge=59
    }else if(this.checkPin(this.state.pinE,e.target.value)){
        this.props.setAdd("69")
        charge=69
    }else if(this.checkPin(this.state.pinF,e.target.value)){
    
        charge=79
    }else if(this.checkPin(this.state.pinG,e.target.value)){
  
        charge=89
    }else if(this.checkPin(this.state.pinH,e.target.value)){

        charge=99
    }else if(this.checkPin(this.state.pinI,e.target.value)){

        charge=109
    }else if(this.checkPin(this.state.pinJ,e.target.value)){
        this.props.setAdd("119")
        charge=119
    }else if(this.checkPin(this.state.pinK,e.target.value)){

        charge=129
    }else if(this.checkPin(this.state.pinL,e.target.value)){

        charge=139
    }else{
      
        charge=149
    }
 this.props.setAdd(charge)
    console.log(charge)
    // global.totalMrp=global.totalMrp+charge
   }
  checkPin(pinArr,pin){
    for (var i = 0; i < pinArr.length; i++) {
         if(pinArr[i] === pin){
            console.log(pin)
            console.log(pinArr[i])
             return true
         }
    }
       return false
    

  }
   selectChange(e){
       this.setState({ selectedCity: e.target.value});
       this.setState({Localities : this.state.Cities.find(x=> x.name === e.target.value).Localities});
 
       
   }
     render() {
         return (
             <div>
          
                <select value={this.state.selectedCity} onChange={this.selectChange.bind(this)} >
                {/* <select value={this.state.selectedCity} onChange={this.setData}> */}
                    <option>...selest cities...</option>
                    {this.state.Cities.map(x => {
                    return <option>{x.name}</option>
                    // return <ObjectRow key={row.uniqueId} />;
                    }
                        
                    )}
                </select>
             
              
                <select onChange={(e)=> this.setData(e)} >
                <option selected disabled>-------------</option>
                {this.state.Localities.map(x => {
                    return <option>{x}</option>
                    }
                        
                    )}
                </select>
                
             </div>
         )
     }
    }
     export default CityAddress