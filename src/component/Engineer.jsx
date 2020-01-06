import React, { Component, Fragment } from 'react';
import { Grid } from '@material-ui/core/';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import TypoGraphy from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import chat from '../image/chat.png';
import bell from '../image/bell.png';
import UserIcon from '../image/default-user.png';
import logo from '../image/arkademy-logo.png';
import axios from 'axios';
import getAuth from '../helpers/auth';
import Cards from './Cards';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../styles/Engineer.css';
import Swal from 'sweetalert2';

//redux
import { connect } from 'react-redux'
import { getEngineerProfile } from '../redux/actions/engineerProfile'


class Engineer extends Component {
    constructor(props) {
      super(props)
      this.state = {
          engineerProfile:[],
          project: [],
          data: [],
          id:'',
          name_engineer:'',
          description:'',
          location:'',
          birth:'',
          skill_item:'',
          search: '',
          name_company: '',
          id_project:'',
          name_project: '',
          status_project:'',
          status_engineer: '',
          token: localStorage.getItem('token'),
          page: 1,
          limit: 5,
          sortBy: 'name',
          order: 'asc',
      }     
    }
 

    handleSearch = (e) => {
      console.log("VALUES ", e.target.value)
      this.setState({search: e.target.value})
    }

    handleSignout = (e) => {
      this.setState({ token: '' });
      localStorage.clear();
    }

    getFetch = async (url) =>{
        const auth = getAuth();
        console.log("Get Aouth ",auth)
        console.log("Get Aouth Role",auth.role)
        const authRole = auth.role
        if (authRole === 'company') {
            axios.get(url, { headers: { Authorization: `Bearer ${auth.token}`}})
            .then(res => {
                console.log("res axios ",res.data)
                this.setState({
                    data: res.data.result 
                })
            })
        } else if (authRole === 'engineer') {
            await this.props.dispatch(getEngineerProfile(localStorage.getItem('token')))
            const engineerProfile = await this.props.engineerProfile;
            this.setState({
              engineerProfile: engineerProfile
            })
            console.log("SSSS ", this.props)
            
            // axios.get('https://hiringchannel-api.herokuapp.com/v1/engineer/profile', { headers: { Authorization: `Bearer ${auth.token}`}})
            // .then(res => {
            //   console.log("res axios ke-2 B ", res.data.data)  
            //   console.log("res axios ke-2 ", res.data.data[0])
            //     this.setState({
            //         data:res.data.data,
            //         id: res.data.data[0].id,
            //         name_engineer: res.data.data[0].name_engineer,
            //         description: res.data.data[0].description,
            //         location: res.data.data[0].location,
            //         birth: res.data.data[0].birth.slice(0,10)
            //     })
            // })
            // .catch(err => {
            //     console.log(err)
            //     this.setState({
            //       data: 'Not Found.'
            //     })
            // })
        }
    }

    getProject = () => {
      const auth = getAuth();
      const url = `https://hiringchannel-api.herokuapp.com/v1/project`

      axios.get(url, { Authorization: `Bearer ${auth.token}`})
      .then(res => {
        this.setState({
          project: res.data.data,
          id_project: res.data.data[0].id_project,
          id_engineer: res.data.data[0].id_engineer,
          id_company: res.data.data[0].id_company,
          name_company: res.data.data[0].name_company,
          name_project: res.data.data[0].name_project,
          status_project: res.data.data[0].status_project,
          status_engineer: res.data.data[0].status_engineer,

        })
        console.log("PROJECT ",this.state.project[0])
      })
    }

    handlePatch = () => {
      const auth = getAuth();
      const token = auth.token;
      const url = `https://hiringchannel-api.herokuapp.com/v1/engineer/${this.state.id}`
      console.log("ID ",this.state.id)
      const data = {
        name_engineer: this.state.name_engineer,
        description: this.state.description,
        location: this.state.location,
        birth: this.state.birth
      }
      const headers = { Authorization: `Bearer ${token}`};

      axios.patch(url, null, {
        headers: headers,
        params: data 
      })
      .then(res => {
        Swal.fire({
          icon: 'success',
          title:'Success',
          text:'Profile Updated.'
        })
        this.getFetch('https://hiringchannel-api.herokuapp.com/v1/engineer')
      })
      .catch(err => {
        Swal.fire ({
          icon: 'error',
          title: 'error',
          text: 'Update Failed.'
        })
      })
    }

    handleStatusProject = () => {
      console.log("ID PROJECT ",this.state.id_project)
      const auth = getAuth();
      const token = auth.token;
      const url = `https://hiringchannel-api.herokuapp.com/v1/project/${this.state.id_project}`
      console.log("ID PROJECT ",this.state.id_project)
      const data = {
        status_project: "Accept",
        status_engineer: this.state.status_engineer
      }
      console.log("DATA ", data)
      const headers = { Authorization: `Bearer ${token}`};

      axios.patch(url, null, {
        headers: headers,
        params: data 
      })
      .then(res => {
        console.log(res)
        Swal.fire({
          icon: 'success',
          title:'Accept',
          text:'Project accepted.'
        })
        this.getProject(`https://hiringchannel-api.herokuapp.com/v1/project/${this.state.id_project}`)
      })
      .catch(err => {
        console.log(err)
      })
    }

    handleStatusProjectDec = () => {
      const auth = getAuth();
      const token = auth.token;
      const headers = { Authorization: `Bearer ${token}`};
      const url = `https://hiringchannel-api.herokuapp.com/v1/project/${this.state.id_project}`
      console.log("ID PROJECT ",this.state.id_project)
      const data = {
        status_project: "Decline",
        status_engineer: this.state.status_engineer
      }
      axios.patch(url, null, {
        headers: headers,
        params: data 
      })
      .then(res => {
        console.log(res)
        Swal.fire ({
          icon: 'error',
          title: 'Decline',
          text: 'Project Declined.'
        })
        this.getProject('https://hiringchannel-api.herokuapp.com/v1/project')
      })
      .catch(err => {
        console.log(err)
      })
    }    

    handleSkillUpgrade = () => {
      const auth = getAuth();
      const token = auth.token;
      const url = `https://hiringchannel-api.herokuapp.com/v1/engineer/skill/${this.state.id}`
      console.log("ID ENG ",this.state.id)
      const dataSkill = {
        skill_item: this.state.skill_item,
        // id: this.state.id,
      }
      const headers = { Authorization: `Bearer ${token}`};

      axios.post(url, null, {
        headers: headers,
        params: dataSkill
      })
      .then(res => {
        Swal.fire({
          icon: 'success',
          title:'Success',
          text:'Skill Upgraded.'
        })
        this.getFetch(`https://hiringchannel-api.herokuapp.com/v1/engineer/profile`)
      })
      .catch(err => {
        Swal.fire ({
          icon: 'error',
          title: 'error',
          text: 'Update Failed.'
        })
      })
    }

    handleSkillDelete = () => {
      const auth = getAuth();
      const token = auth.token;
      const url = `https://hiringchannel-api.herokuapp.com/v1/engineer/skill/${this.state.skill_item}`
      console.log("ID ENG ",this.state.id)
      const dataSkill = {
        skill_item: this.state.skill_item,
        // id: this.state.id,
      }
      const headers = { Authorization: `Bearer ${token}`};

      axios.delete(url, null, {
        headers: headers,
        params: dataSkill
      })
      .then(res => {
        Swal.fire({
          icon: 'success',
          title:'Success',
          text:'Skill Deleted.'
        })
        this.getFetch(`https://hiringchannel-api.herokuapp.com/v1/engineer/profile`)
      })
      .catch(err => {
        Swal.fire ({
          icon: 'error',
          title: 'error',
          text: 'Failed deleted.'
        })
      })
    }


    componentDidMount(){
      console.log("componentDidMount")
      this.getFetch(`https://hiringchannel-api.herokuapp.com/v1/engineer/profile`)
      this.getProject(`https://hiringchannel-api.herokuapp.com/v1/project`)
    }


    render() {
      console.log("TANDA ",this.props.engineerProfile.engineerProfile)
      const engineerProfile = this.props.engineerProfile.engineerProfile;
      
      if (!this.state.token) {
        this.props.history.push('/login');
      }

      let filtered = this.state.data.filter(
        data => {
          return data.skill&&data.name_engineer.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
      )


      return (
        <Fragment>
          <AppBar position="fixed" color="inherit">
            <Toolbar>
              <div className="nav-group">
                <img src={logo} className="logo" alt="logo" />
                <div className="search">
                  <SearchIcon />
                  <InputBase
                    type="text"
                    placeholder="Search…"
                    value={this.state.search}
                    onChange={this.handleSearch.bind()}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
                <div className="home">
                
                  <Button className="btn-home">Home</Button>
            
                  <Button className="user-detail">
                  <Avatar className="avatar"><img src={UserIcon} className="avatar" alt="user"></img></Avatar>
                  <h4>User</h4>
                  </Button>
                  <TypoGraphy className="typo-wrap" variant="inherit" gutterbottom="true">
                      <hr width="1" size="40" />
                      <img src={chat} className="chat" alt="chat"></img>
                      <img src={bell} className="notif" alt="bell notif"></img>
                  </TypoGraphy>
                  <Button onClick={this.handleSignout.bind()}
                  >Logout</Button>
                </div>
              </div>
            </Toolbar>
          </AppBar>

          {/* <CardList /> */}
      
          <Grid className="map">

            {/* {
                filtered && filtered.map(data => {
                    return <Cards key={data.id} name={data.name_engineer}
                    desc={data.description} skill={data.skill}/>
                })
            } */}
                  <Cards key={engineerProfile.id} name={engineerProfile.name_engineer}
                  desc={engineerProfile.description} skill={engineerProfile.skill}/>
              <div className="group-form-editprofile">
                <h2>Edit profile</h2>
                <p>Companies on Hiring Channel will get to know you with the info below</p>
                <div className="form-editprofile">
                  <TextField
                  // label="Full Name"
                  // id="outlined-size-small"
                  // value={engineerProfile.name_engineer}
                  value={this.state.name_engineer}
                  onChange={ e => {this.setState({name_engineer:e.target.value})
                  console.log(this.state.name_engineer)}}
                  variant="outlined"
                  size="small"
                  />
                  <br/>
                  <TextField
                    // label="Description"
                    // id="outlined-size-small"
                    value={engineerProfile.description}
                    // value={this.state.description}
                    onChange={ e => {this.setState({description:e.target.value})
                  console.log(e.target.value)}}
                    variant="outlined"
                    size="small"
                  />
                  <br/>
                  <TextField
                  // label="Location"
                  // id="outlined-size-small"
                  value={engineerProfile.location}
                  // value={this.state.location}
                  onChange={ e => {this.setState({location:e.target.value})
                  console.log(e.target.value)}}
                  variant="outlined"
                  size="small"
                  />
                  <br/>
                  <TextField
                  // id="outlined-size-small"
                  type="date"
                  size="small"
                  variant="outlined"
                  label="Date of birth"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={engineerProfile.birth.slice(0,10)}
                  // value={this.state.birth}
                  onChange={ e => {this.setState({birth:e.target.value})
                  console.log(e.target.value)}}
                  />
                  <br/>
               
                </div>
                <div className="btn-editprofile">
                  <ButtonGroup>
                    <Button 
                    variant="text" 
                    color="secondary"
                    >
                      Cancel&nbsp;
                    </Button>
                    
                    <Button 
                    variant="contained" 
                    color="inherit"
                    onClick={e => this.handlePatch(e)}
                    >
                      Done
                    </Button>
                  </ButtonGroup>
                </div>
              </div>

          </Grid>
          <Grid className="map-table">
            <div className="table-title">
              <h1><b>Job list table.</b></h1>
              <hr />
            </div>
            <br/>
            <div className="wrap-table">
              <TableContainer component={Paper}>
                <Table className="{classes.table}" aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="table-head-side-left">Company</TableCell>
                      <TableCell className="table-head" align="left">Project Name</TableCell>
                      <TableCell className="table-head" align="center">Status Project</TableCell>
                      <TableCell className="table-head-side-right" align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.project.map(project => (
                      <TableRow key={project.id_project}>
                        <TableCell component="th" scope="row">
                          {project.name_company}
                        </TableCell>
                        <TableCell align="left">{project.name_project}</TableCell>
                        <TableCell align="center">{project.status_project}</TableCell>
                        <TableCell align="center">
                          <Button color="secondary" onClick={this.handleStatusProjectDec}>x</Button>
                          <Button color="inherit" onClick={this.handleStatusProject}>v</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
          
          <Grid className="map-form">
            <div className="wrap-form">
              
              {/* skill */}
              <div className="group-form-editprofile">
                <h2>Your Skill</h2>
                <p>Upgrade more your skill on Hiring Channel, insert below</p>
                <div className="form-editprofile">
                  <TextField
                  label="Insert your skill"
                  id="outlined-size-small"
                  defaultValue={this.state.skill_item}
                  onChange={ e => {this.setState({skill_item:e.target.value})
                  console.log(e.target.value)}}
                  variant="outlined"
                  size="small"
                  />
                  <br/>
                </div>
                <div className="btn-editprofile">
                  <ButtonGroup>
                  <Button 
                    variant="text" 
                    color="secondary"
                    onClick={this.handleSkillDelete}
                    // onClick={this.continue}
                    >
                      Delete
                    </Button>
                    <Button 
                    variant="text" 
                    color="inherit"
                    onClick={this.handleSkillUpgrade}
                    // onClick={this.continue}
                    >
                      Add
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </Grid>
        </Fragment>
      )
    }
}

const mapStateToProps = state => {
  return {
    engineerProfile: state.engineerProfile
  }
}

const mapDispatchToProps = dispatch => ({
    getEngineerProfile,
    dispatch
  })


export default connect(mapStateToProps, mapDispatchToProps)(Engineer)