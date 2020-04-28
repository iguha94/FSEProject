import React from "react"
import axios from "axios";
import './Donate.css';
import NavBar from "../NavBar/NavBar";
import Form from "react-bootstrap/lib/Form";
import {FormGroup} from "react-bootstrap";
import FormControl from "react-bootstrap/lib/FormControl";

const Url='http://localhost:5000/'

class Donate extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            Eventid: "",
            eventparams: "",
            Donor:"",
            RItems:"",
            DonatedItems:{},
            dstreet:"",
            dcity:"",
            dstate:"",
            dzip:"",
            dcountry:""
        };
        this.handleSubmitDonation = this.handleSubmitDonation.bind(this);
        this.handleDonorNameChange = this.handleDonorNameChange.bind(this);
        this.handleDonation = this.handleDonation.bind(this);
        this.handlestreetchange = this.handlestreetchange.bind(this);
        this.handlecitychage = this.handlecitychage.bind(this);
        this.handlestatechange = this.handlestatechange.bind(this);
        this.handlezipchange = this.handlezipchange.bind(this);
        this.handlecountrychange = this.handlecountrychange.bind(this);
    }

    handleSubmitDonation = (e) => {
        e.preventDefault();
        var payload=[];
        for (var i = 0; i < this.state.RItems.length; i++){
            var item=this.state.RItems[i];
            var ditem={};
            ditem["EID"]= this.state.Eventid;
            ditem["IID"]= item["IID"];
            ditem["DonorID"]=this.state.Donor;
            ditem["ItemName"]=item["ItemName"];
            ditem["Requested"]=item["Requested"];
            ditem["Donated"]=this.state.DonatedItems[item["IID"]];
            ditem["ReqCallCenterID"]=this.state.eventparams["CallCenter"];
            ditem["DonCallCenterID"]=this.state.eventparams["CallCenter"];
            ditem["Street"] = this.state.dstreet;
            ditem["City"] = this.state.dcity;
            ditem["State"] = this.state.dstate;
            ditem["ZIP"] = this.state.dzip;
            ditem["Country"] = this.state.dcountry;
            payload[i]=ditem;
        }
        const body = {
            data: payload
        };
        console.log(body);
        axios({method:'post',
            url: Url+'subdonation',
            data:{
                body
            }
        }).then(data => {
            console.log(data);
            console.log("Donation SUBMITTED!");
            this.props.history.push('/query');
        }).catch(err=>console.log(err));
    }

    handlestatechange = (e) => {
        this.setState({dstate: e.target.value});
    }

    handlestreetchange = (e) => {
        this.setState({dstreet: e.target.value});
    }

    handlecitychage = (e) => {
        this.setState({dcity: e.target.value});
    }
    
    handlezipchange = (e) => {
        this.setState({dzip: e.target.value});
    }

    handlecountrychange = (e) => {
        this.setState({dcountry: e.target.value});
    }

    handleDonorNameChange = (e) => {
        this.setState({Donor: e.target.value});
    }

    handlecountrychange = (e) => {
        this.setState({dcountry: e.target.value});
    }

    handleDonation = (e) => {
        console.log(e.target.id);
        var prevdonations=this.state.DonatedItems
        prevdonations[e.target.id] = e.target.value
        this.setState({DonatedItems: prevdonations});
        //this.state.DonatedItems[e.target.id]=e.target.value;
    }

    componentDidMount() {
        const eventurl=Url+'eventdetails?'
        var eventid = this.props.location.search
        eventid = eventid.substring(1, eventid.length);
        this.setState({Eventid: eventid});
        axios.get(eventurl, {
            params: {
              ID: eventid
            }
          }).then(data => {
              this.setState({eventparams: data['data']['EventDetails']});
              this.setState({RItems: data['data']['EventDetails']['RItems']});
              var initdonation={}
              for (var i = 0; i < this.state.RItems.length; i++){
                var item=this.state.RItems[i];
                initdonation[item["IID"]]=0
              }
              this.setState({DonatedItems: initdonation});
        }).catch(err=>console.log(err));
    }

    render() {
        let {eventparams, Eventid, Donor,RItems} = this.state
        console.log(this.state.RItems);
        return (
            <div className="CreateDonationPage">
                <header className="Event-header">
                    <NavBar className="Nav-Bar"/>
                </header>
                <h2 className="Donate-title">Donate Disaster Resources</h2>
                <Form onSubmit={this.handleSubmitDonation} className="Event-form" >
                    <label htmlFor="Organization"><b>Organization: </b> {eventparams['CallCenter']}</label>
                    <br></br>
                    <label htmlFor="DisasterTitle"><b>Disaster Title: </b> {eventparams['EventName']}</label>
                    <br></br>
                    <label htmlFor="Location"><b>Disaster Location: </b> {eventparams['Street']},{eventparams['City']},{eventparams['State']},{eventparams['ZIP']},{eventparams['Country']}</label>
                    <br></br>
                    <label htmlFor="Created AT"><b>Event Created On: </b> {eventparams['CreatedAt']}
                    </label>
                    <br></br>
                    <label htmlFor="Created By"><b>Event Created By: </b> {eventparams['Creator']}</label>
                    <br></br>
                    <label htmlFor="disaster"><b>Donor's Address:</b></label>
                    <br></br>
                    <FormGroup controlId="formDonate">
                    <label htmlFor="disaster"><b>Street: </b></label>
                    <FormControl type="text" name="donor" id="street" value={this.state.dstreet} className="Event-input" onChange={this.handlestreetchange}/>
                    <label htmlFor="disaster"><b>City: </b></label>
                    <FormControl type="text" name="donor" id="city" value={this.state.dcity} className="Event-input" onChange={this.handlecitychage}/>
                    <label htmlFor="disaster"><b>State: </b></label>
                    <FormControl type="text" name="donor" id="state" value={this.state.dstate} className="Event-input" onChange={this.handlestatechange}/>
                    <label htmlFor="disaster"><b>ZIP: </b></label>
                    <FormControl type="text" name="donor" id="ZIP" value={this.state.dzip} className="Event-input" onChange={this.handlezipchange}/>
                    <label htmlFor="disaster"><b>Country: </b></label>
                    <FormControl type="text" name="donor" id="country" value={this.state.dcountry} className="Event-input" onChange={this.handlecountrychange}/>
                    </FormGroup>
                    <br></br>
                    <label htmlFor="disaster"><b>Donor's Email</b></label>
                    <FormControl type="text" name="donor" id="donor" value={this.state.Donor} className="Event-input" onChange={this.handleDonorNameChange}/>
                    <br></br>
                    <label htmlFor="AllItems"><b>Requested Items: </b></label>
                    <table>
                        <tr>
                            {/*<th className = "Donate-text">Item&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>*/}
                            {/*<th className = "Donate-text">#Requested&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>*/}
                            {/*<th className = "Donate-text">#Donate&nbsp;&nbsp;&nbsp;&nbsp;</th>*/}
                        </tr>
                        {
                            this.state.RItems.length > 0 ?
                            this.state.RItems.map((item,index) => {
                            return(
                                    <tr>   
                                        <div>
                                            <small className="itemname">{item.ItemName}</small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<small className="reqitem">{item.Requested}</small>
                                            &nbsp;<FormControl type="text" name="donor" id={item.IID} value={this.state.DonatedItems[item.IID]} className="Event-input" onChange={this.handleDonation}/>
                                        </div>
                                    </tr> 
                                
                                );
                            }):
                            []
                        }
                    </table>
                    <FormControl className="Form-button" type="submit" value="Submit" onClick={this.handleSubmitDonation}/>
            </Form>
            </div>
        )
    }
}

export default Donate
