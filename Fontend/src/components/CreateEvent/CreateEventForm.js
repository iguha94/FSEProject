import React from "react"
import './CreateEventForm.css';
import axios from "axios";
import FormControl from "react-bootstrap/lib/FormControl";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Form from "react-bootstrap/lib/Form";


const Url='http://localhost:5000/';

class CreateEventForm extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            resources: [{resourceType:"", amount:""}],
            organization: "",
            disaster: ""
        };
        this.handleChangeResources = this.handleChangeResources.bind(this);
        this.handleChangeOrg = this.handleChangeOrg.bind(this);
        this.handleChangeDisaster = this.handleChangeDisaster.bind(this);
        this.addResource = this.addResource.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        console.log('In Events page')
    }
    
    handleChangeResources = (e) => {
            var index = parseInt(e.target.getAttribute('data-id'))
            console.log('current index: ',index)
            let resources = [...this.state.resources]
            console.log(resources)
            var curjson = resources[index]
            console.log('current resource count: ',curjson)
            curjson[e.target.name] = e.target.value.toUpperCase()
            resources[index] = curjson
            console.log(resources)
            this.setState({resources: resources});
    }
    handleChangeOrg = (e) => {
        this.setState({organization: e.target.value});
    }
    handleChangeDisaster = (e) => {
        this.setState({disaster: e.target.value});
    }
    addResource = (e) => {
        e.preventDefault();
        console.log("in add resource")
        var newresource = {resourceType:"", amount:""}
        var oldresources = this.state.resources
        console.log(oldresources)
        this.setState({resources: oldresources.concat(newresource)});
        console.log(this.state.resources)
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('In handle submit'+this.state.resources)
        console.log('Organization: '+this.state.organization)
        console.log('# Resouces: '+this.state.resources.length)
        const payload = {
            resources:this.state.resources,
            organization: this.state.organization,
            disaster: this.state.disaster
        }
        console.log(payload)
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
                <Form onSubmit={this.handleSubmit} onChange={this.handleChange} className="Event-form" >
                    <label htmlFor="Organization">Organization</label>
                    <FormGroup controlId="formOrg">
                    <FormControl type="text" name="organization" id="organization" value={organization} className="Event-input" onChange={this.handleChangeOrg}/>
                    <label htmlFor="disaster">Disaster Description</label>
                    <FormControl type="text" name="disaster" id="disaster" value={disaster} className="Event-input" onChange={this.handleChangeDisaster}/>
                    <button className="Form-button" onClick={this.addResource}>Add new resource</button>
                    </FormGroup>
                    {
                        this.state.resources.map((val, idx)=> {
                            let resourceID = `resource-${idx}`, amountID = `amount-${idx}`
                            return (
                                <div key={idx} className="Form-Div">
                                    <FormGroup controlID = "formResource">
                                    <label htmlFor={resourceID}>{`Resource #${idx + 1}`}</label>
                                    <FormControl
                                        type="text"
                                        name="resourceType"
                                        data-id={idx}
                                        id={resourceID}
                                        value={resources[idx].resourceType}
                                        className="Event-input"
                                        onChange={this.handleChangeResources}
                                    />
                                    </FormGroup>
                                    <FormGroup controlID="formAmount">
                                    <label htmlFor={amountID}>Amount</label>
                                    <FormControl
                                        type="text"
                                        name="amount"
                                        data-id={idx}
                                        id={amountID}
                                        value={resources[idx].amount}
                                        className="Event-input"
                                        onChange={this.handleChangeResources}
                                    />
                                    </FormGroup>
                                </div>
                        )
                    })
                }
                <input className="Form-button" type="submit" value="Submit" onClick={this.handleFormSubmit}/>
<<<<<<< HEAD
            </Form>
=======
                </form>
>>>>>>> 388ed397aae67cc178f8c94fcd3ea84e99a908be
        )
    }
}

export default CreateEventForm