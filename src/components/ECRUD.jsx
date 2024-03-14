import React from 'react'
import StartFirebase from '../firebase'
import { ref, set, get, update, remove, child } from "firebase/database";

export class ECRUD extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            db: '',
            date: '',
            time: '',
            magnitude: ''
            
            
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
            

            <label>Enter Date</label>
            <input type='date' id="datebox" value={this.state.date} 
            onChange={e => {this.setState({date: e.target.value});}}/>
            <br/><br/>

            <label>Enter Time</label>
            <input type='time' id="timebox" value={this.state.time} 
            onChange={e => {this.setState({time: e.target.value});}}/>
            <br/><br/>

            <label>Enter Magnitude</label>
            <input type='number' id="magnitudebox" value={this.state.magnitude} 
            onChange={e => {this.setState({magnitude: e.target.value});}}/>
            <br/><br/>

            

            <button id="addBtn" onClick={this.interface}>Add Data</button>
            <button id="updateBtn" onClick={this.interface}>Update Data</button>
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
        else if(id==='updateBtn'){
            this.updateData();
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
            
            date: this.state.date,
            time: this.state.time,
            magnitude: Number(this.state.magnitude),
            
        }
    }

    insertData(){
        const db = this.state.db;
        const data = this.getAllInputs();


        
        

        set(ref(db, 'Earthquake/'+ data.date+"|"+data.time),
        {
            magnitude: data.magnitude,
        })
        .then(()=>{alert('data was added successfully')})
        .catch((error)=>{alert('there was an error, details: '+error)})
        ;
    }

    updateData(){
        const db = this.state.db;
        const data = this.getAllInputs();

        update(ref(db, 'Earthquake/'+data.date),
        {
            
            time: data.time,
            magnitude: data.magnitude,
            
        })
        .then(()=>{alert('data was updated successfully')})
        .catch((error)=>{alert('there was an error, details: '+error)})
        ;
    }

    deleteData(){
        const db = this.state.db;
        const date = this.getAllInputs().date;

        remove(ref(db, 'Earthquake/'+ date))
        .then(()=>{alert('data was deleted successfully')})
        .catch((error)=>{alert('there was an error, details: '+error)});
    }

    selectData(){
        const dbref = ref(this.state.db);
        const date = this.getAllInputs().date;
        
        get(child(dbref, 'Earthquake/' + date)).then((snapshot)=>{
            if (snapshot.exists()) {
                this.setState({
                    
                    time: snapshot.val().time,
                    magnitude: snapshot.val().magnitude,
                    
                })
            }
            else{
                alert("no data found!")
            }
        })
        .catch((error)=>{alert("there was an error, details: "+error)});
    }

        
  
}

export default ECRUD