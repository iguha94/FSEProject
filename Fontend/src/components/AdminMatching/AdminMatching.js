import React from "react"
import './AdminMatching.css';
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import Form from "react-bootstrap/lib/Form";

const Url='http://localhost:5000/'

class AdminMatch extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            Eventid: "",
            eventparams: "",
            MatchedItems:"",
            SelectedDonations:{},
            CloseEvent:0
        };

        this.choosedonation = this.choosedonation.bind(this);
        this.seldonation = this.seldonation.bind(this);
        this.closedonation = this.closedonation.bind(this);
    }

    closedonation = e =>{
        var checkBox = document.getElementById("closedonation");
        this.setState({CloseEvent: 0});
        if (checkBox.checked == true){
            this.setState({CloseEvent: 1});
        }
    }

    choosedonation = e =>{
        e.preventDefault();
        var info={}
        info['EventId'] = this.state.Eventid;
        info['Donations'] = this.state.SelectedDonations;
        info['CloseDonation']=this.state.CloseEvent;
        console.log(info)
        axios({method:'post',
            url: Url+'insertmatchingdonation',
            data:{
                info
            }
        }).then(data => {
            console.log(data);
            console.log("Donation SUBMITTED!");
            this.props.history.push('/query');
        }).catch(err=>console.log(err));

    }

    seldonation = e =>{
        var curItem = e.target.getAttribute('data-id');
        var curdonatedItem = e.target.getAttribute('id');
        var intcuritem=parseInt(curItem);
        var intcurdonitem=parseInt(curdonatedItem);
        var selectedonation = this.state.MatchedItems[intcuritem][intcurdonitem];
        var prevdonations = this.state.SelectedDonations
        prevdonations[curItem] = selectedonation
        this.setState({SelectedDonations: prevdonations});
        console.log(this.state.SelectedDonations);
    }

    componentDidMount() {
        const eventurl=Url+'getmatchingdonation?'
        var eventid = this.props.location.search
        eventid = eventid.substring(1, eventid.length);
        this.setState({Eventid: eventid});
        axios.get(eventurl, {
            params: {
              ID: eventid
            }
          }).then(data => {
              this.setState({eventparams: data['data']['EventDetails']});
              this.setState({MatchedItems: data['data']['EventDetails']['MatchingDonations']});
              console.log(this.state.MatchedItems)
              console.log(this.state.eventparams)
        }).catch(err=>console.log(err));
    }
    render(){
        let {eventparams, MatchedItems, Eventid} = this.state
        return(
            <div className="AdminMatchPage">
                <header className="Event-header">
                        <NavBar className="Nav-Bar"/>
                </header>
                <Form className = "Match-form">
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

                {
                    MatchedItems.length>0 ?
                    MatchedItems.map((itemarr,idx) =>{
                    return(
                        <Form>
                            {
                                itemarr.length>0 ?
                                itemarr.map((item,index) =>{
                                    return(
                                        <div>
                                        <input className="Match-radio" type="radio" data-id={idx} id={index} name={item.IID} value="donate" onChange={this.seldonation}/>
                                        <label className="Match-label" for="donation" > <b> Item Name: </b>{item.ItemName} <b>Requested: </b>{item.Requested} <b>Donated: </b>{item.Requested} <b>Donor: </b>{item.DonorID}
                                                <b> From: </b>{item.City},{item.State},{item.Country}</label>
                                        </div>
                                    )
                                }):[]
                            }
                            
                        </Form>
                    )
                    }):
                    []
                }
                <br></br><input type="checkbox" id="closedonation" name="close" value="CDonation" onChange={this.closedonation}></input>
                <label for="vehicle1"> Close Donation For This Event</label><br></br>
                <input className="Match-button" type="submit" value="Submit Donations" onClick={this.choosedonation}/>
                </Form>
            </div>
        );
    }
}

export default AdminMatch

