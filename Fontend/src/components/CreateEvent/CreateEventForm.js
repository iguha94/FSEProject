import React from "react"
import './CreateEventForm.css';

class CreateEventForm extends React.Component {
    state = {
        resources: [{resourceType:"", amount:""}],
        owner: "",
        disaster: ""
    }
    handleChange = (e) => {
        if (["name", "age"].includes(e.target.className) ) {
            let resources = [...this.state.resources]
            resources[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
            this.setState({ resources }, () => console.log(this.state.resources))
        } else {
            this.setState({ [e.target.resourceType]: e.target.value.toUpperCase() })
        }
    }
    addResource = (e) => {
        this.setState((prevState) => ({
            resources: [...prevState.resources, {resourceType:"", amount:""}],
        }));
    }
    handleSubmit = (e) => { e.preventDefault() }
    render() {
        let {organization, disaster, resources} = this.state
        return (
                <form onSubmit={this.handleSubmit} onChange={this.handleChange} className="Event-form" >
                    <label htmlFor="resourceType">Resource Type</label>
                    <input type="text" name="organization" id="organization" value={organization} className="Event-input"/>
                    <label htmlFor="disaster">Disaster Description</label>
                    <input type="text" name="disaster" id="disaster" value={disaster} className="Event-input"/>
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
                                    />
                                    <label htmlFor={amountID}>Amount</label>
                                    <input
                                        type="text"
                                        name={amountID}
                                        data-id={idx}
                                        id={amountID}
                                        value={resources[idx].amount}
                                        className="Event-input"
                                    />
                                </div>
                        )
                    })
                }
                <input className="Form-button" type="submit" value="Submit" />
            </form>
        )
    }
}

export default CreateEventForm