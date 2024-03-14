import React from 'react'
import StartFirebase from '../firebase'
import { ref, set, get, update, remove, child } from "firebase/database";

export class ACRUD extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            db: '',
            date: '',
            time: '',
            email: '',
            name: '',
            section: '',
            negativeKey: ''
            
            
            
        }
        this.interface = this.interface.bind(this);
    }
    
    componentDidMount(){
        this.setState({
            db: StartFirebase()
        });
    }

    render(){
        return(
            <>
            <label>Enter NegativeKey</label>
            <input type='number' id="negativeKeybox" value={this.state.negativeKey} 
            onChange={e => {this.setState({negativeKey: e.target.value});}}/>
            <br/><br/>

            <label>Enter Time</label>
            <input type='time' id="timebox" value={this.state.time} 
            onChange={e => {this.setState({time: e.target.value});}}/>
            <br/><br/>

            <label>Enter Date</label>
            <input type='date' id="datebox" value={this.state.date} 
            onChange={e => {this.setState({date: e.target.value});}}/>
            <br/><br/>

            <label>Enter Email</label>
            <input type='email' id="emailbox" value={this.state.email} 
            onChange={e => {this.setState({email: e.target.value});}}/>
            <br/><br/>

            <label>Enter Name</label>
            <input type='text' id="namebox" value={this.state.name} 
            onChange={e => {this.setState({name: e.target.value});}}/>
            <br/><br/>

            <label>Enter Section</label>
            <input type='text' id="sectionbox" value={this.state.section} 
            onChange={e => {this.setState({section: e.target.value});}}/>
            <br/><br/>

            

            <button id="addBtn" onClick={this.interface}>Add Data</button>
            <button id="upemailBtn" onClick={this.interface}>Upemail Data</button>
            <button id="deleteBtn" onClick={this.interface}>Delete Data</button>
            <button id="selectBtn" onClick={this.interface}>Get Data from DB</button>
            </>
        )
    }

    interface(event){
        const id = event.target.id;
        
        if(id==='addBtn'){
            this.insertData();
        } 
        else if(id==='upemailBtn'){
            this.upemailData();
        } 
        else if(id==='deleteBtn'){
            this.deleteData();
        }
        else if(id==='selectBtn'){
            this.selectData();
        } 
    }


    getAllInputs(){
        return{
            negativeKey: Number(this.state.negativeKey),
            date: this.state.section,
            time: this.state.time,
            email: this.state.email,
            name: this.state.name,
            section: this.state.section,

            
            
        }
    }

    insertData(){
        const db = this.state.db;
        const data = this.getAllInputs();


        
        

        set(ref(db, 'Users/'+data.negativeKey),
        {
            date: data.date,
            time: data.time,
            email: data.email,
            name: data.name,
            section: data.section,
            
            
        })
        .then(()=>{alert('data was added successfully')})
        .catch((error)=>{alert('there was an error, details: '+error)})
        ;
    }

    updateData(){
        const db = this.state.db;
        const data = this.getAllInputs();

        update(ref(db, 'Users/'+data.negativeKey),
        {
            date: data.date,
            time: data.time,
            email: data.email,
            name: data.name,
            section: data.section,
            
        })
        .then(()=>{alert('data was upemaild successfully')})
        .catch((error)=>{alert('there was an error, details: '+error)})
        ;
    }

    deleteData(){
        const db = this.state.db;
        const negativeKey = this.getAllInputs().negativeKey;

        remove(ref(db, 'Users/'+ negativeKey))
        .then(()=>{alert('data was deleted successfully')})
        .catch((error)=>{alert('there was an error, details: '+error)});
    }

    selectData(){
        const dbref = ref(this.state.db);
        const negativeKey = this.getAllInputs().negativeKey;
        
        get(child(dbref, 'Users/' + negativeKey)).then((snapshot)=>{
            if (snapshot.exists()) {
                this.setState({
                    email: snapshot.val().email,
                    name: snapshot.val().name,
                    section: snapshot.val().section,
                    date: snapshot.val().date,
                    time: snapshot.val().time,
                    
                })
            }
            else{
                alert("no data found!")
            }
        })
        .catch((error)=>{alert("there was an error, details: "+error)});
    }

        
  
}

export default ACRUD