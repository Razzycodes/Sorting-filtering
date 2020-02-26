import React, { Component } from 'react';
import axios from 'axios'

import './Header.css'

 class Header extends Component {

    state ={
        data:[],
        loading:false,
        visible :10,
        _newdata:[]
    }
    
    getDAta(){
    this.setState({loading:true})
     axios.get('https://jsonplaceholder.typicode.com/posts')
     .then((res) =>{
        this.setState({
             data:res.data,
             loading:false
            })
         console.log(res)
     }).catch((err) => {
         console.log(err.response);
     })
     
    }
    componentDidMount(){
        this.getDAta()
    }

    goback = ()=> {
        this.setState({
            _newdata:[]
        })
    }
    sortbody = () => {
        this.setState({
            data:this.state.data.sort((a,b) =>    a.id - b.id )
        })
    }    
    sortTitle =() => {
      this.setState({
         data:this.state.data.sort((a,b) => b.id - a.id)
         })
    }

    sortTable  =(id) => {
        console.log('clicked', id);
        this.setState({
            _newdata: this.state.data.filter((value) => value.id ===  id)
        })
    }

    render() {
        return (
            <div className=' Header_container'>
                 {this.state.data.length ? <h1 className='text-center pb-4 py-4'>
                {!this.state._newdata.length ? "Sorting..." :  "Sorted..."}</h1> : null}              
                <div className=''>
                {this.state.loading === true ? <div className='py-4 my-4' style={{textAlign:'center',fontSize:'30px'}}>loading.....</div> : 
                <table className='text-center' style={{borderCollapse:'collapse',width:'100%', fontFamily:'arial, san-serif', position:'relative'}}>
                <thead>
                    <tr>
                       <th style={{cursor:'pointer'}} onClick={this.sortTitle}>{!this.state._newdata.length ? "Sort by Id" :"Title"}</th>
                        <th style={{cursor:'pointer'}} onClick={this.sortbody}>{!this.state._newdata.length ? " Sort by Title" : "Body"}</th>

                    </tr>
                   
                </thead>
                <tbody id='tableData'>
                {!this.state._newdata.length ? this.state.data.map((val) =>{
                 return(
                     <React.Fragment key={val.id}>
                    <tr key={val.id}>
                     <td>{val.id}</td>
                     <td style={{cursor:'pointer'}} onClick={() => this.sortTable(val.id)}>{val.title}</td>
                    </tr>
                  
                    </React.Fragment>
                    
                   
                 
             )
         }):this.state._newdata.map((data) => {
            return(
                <React.Fragment key={data.id}>
               <tr key={data.id}>
                <td style={{cursor:'pointer'}} >{data.title}</td>
                <td>{data.body}</td>
               </tr>
               </React.Fragment>
               
              
            
        )
         })}           
            </tbody>
            </table>}
            {!this.state._newdata.length ? null : (<button className='btn btn-secondary my-4' onClick={this.goback}>Back</button>)}

              </div>
             
              
             
            </div>
        )
    }
}

export default Header
