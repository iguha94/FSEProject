import React from "react"
import './CreateEventForm.css';
import axios from "axios";

const Url='http://localhost:5000/';

class CreateEventForm extends React.Component {
    state = {
        resources: [{resourceType:"", amount:""}],
        organization: "",
        disaster: ""
    }
    handleChangeResources = (e) => {
            let resources = [...this.state.resources]
            resources[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
            this.setState({resources: e.target.value});
    }
    handleChangeOrg = (e) => {
        this.setState({organization: e.target.value});
    }
    handleChangeDisaster = (e) => {
        this.setState({disaster: e.target.value});
    }
    addResource = (e) => {
        this.setState((prevState) => ({
            resources: [...prevState.resources, {resourceType:"", amount:""}],
        }));
    }
    handleFormSubmit(e) {
        e.preventDefault();
        console.log('In handle submit')
        console.log('Organization: '+this.state.organization)
        console.log('# Resouces: '+this.state.resources.length)
        const payload = {
            resources:this.state.resources,
            organization: this.state.organization,
            disaster: this.state.disaster
        }
        axios({method:'post',
            url: Url+'event',
            data:{
                payload
            }
        }).then(data => {
            console.log(data);
            console.log("FORM SUBMITTED!");
            this.props.reRoute('/');
        }).catch(err=>console.log(err));
    }
    render() {
        let {organization, disaster, resources} = this.state
        return (
                <form onSubmit={this.handleSubmit} onChange={this.handleChange} className="Event-form" >
                    <label htmlFor="Organization">Organization</label>
                    <input type="text" name="organization" id="organization" value={organization} className="Event-input" onChange={this.handleChangeOrg.bind(this)}/>
                    <label htmlFor="disaster">Disaster Description</label>
                    <input type="text" name="disaster" id="disaster" value={disaster} className="Event-input" onChange={this.handleChangeDisaster.bind(this)}/>
                    <button className="Form-button" onClick={this.addResource}>Add new resource</button>
                    {
                        resources.map((val, idx)=> {
                            let resourceID = `resource-${idx}`, amountID = `amount-${idx}`
                            return (
                                <div key={idx} className="Form-Div">
                                    <label htmlFor={resourceID}>{`Resource #${idx + 1}`}</label>
                                    <input
                                        type="text"
                                        name={resourceID}
                                        data-id={idx}
                                        id={resourceID}
                                        value={resources[idx].resourceType}
                                        className="Event-input"
                                        onChange={this.handleChangeResources.bind(this)}
                                    />
                                    <label htmlFor={amountID}>Amount</label>
                                    <input
                                        type="text"
                                        name={amountID}
                                        data-id={idx}
                                        id={amountID}
                                        value={resources[idx].amount}
                                        className="Event-input"
                                        onChange={this.handleChangeResources.bind(this)}
                                    />
                                </div>
                        )
                    })
                }
                <input className="Form-button" type="submit" value="Submit" onSubmit={this.handleFormSubmit.bind(this)}/>
            </form>
        )
    }
}

export default CreateEventForm