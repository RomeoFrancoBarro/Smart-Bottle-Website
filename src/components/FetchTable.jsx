import React from 'react'
import { Table} from "react-bootstrap";
import { ref, onValue } from "firebase/database";
import StartFirebase from '../firebase';


const db = StartFirebase();

export class FetchTable extends React.Component {

    constructor(){
        super();
        this.state = {
            tableData: []
            
        }
        
    }

    componentDidMount(){
        const dbRef = ref(db, 'Customer')

        onValue(dbRef, (snapshot)=>{
            let records = [];
            snapshot.forEach(childSnapshot=>{
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({"key": keyName, "data":data})
            })
            this.setState({tableData: records});
        })

    }
    
    render(){
        return(
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Fullname</th>
                        <th>Phone Number</th>
                        <th>Date of Birth</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.tableData.map((row, index)=>{
                        return(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <th>{row.key}</th>
                            <th>{row.data.Fullname}</th>
                            <th>{row.data.Phonenumber}</th>
                            <th>{row.data.dateofbirth}</th>
                        </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
}

export default FetchTable