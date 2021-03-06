import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import {Switch, Route} from 'react-router-dom' 
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import AnimalList from './components/shelters/Animallist';
import AddAnimals from './components/shelters/Addanimals';
import AnimalDetail from './components/shelters/Animaldetails'
import EditAnimals from './components/shelters/Editanimals'
import SignupUser from './components/SignupUser';
import config from './config';
// import EditProfile from './components/shelters/EditProfilesh'
import ShelterAplic from './components/shelters/ShelterAplic'
import LandingPage from './components/LandingPage'

import SignupShelter from './components/SignupShelter';
import ApplicationUser from './components/users/ApplicationUser'

import UserProfile from './components/users/Profileuser'
import FavoriteUser from './components/users/FavoriteUser'
import PetsUser from './components/users/PetsUser'
import DonateUser from './components/users/DonateUser'

class App extends React.Component {

  state = {
    animals: [],
    loggedInUser: null,
    loggednInAdopt: null
  }

  getAnimals = () => {
    axios.get(`${config.API_URL}/shelter/animals`)
      .then((res) => {
        this.setState({
          animals: res.data
        })
      })
      .catch((err) => {
        if(err.response.status === 401) {
          this.props.history.push('/')
        }
      })  
  }

  getUser(){
    axios.get(`${config.API_URL}/user`, {withCredentials: true})
    .then((res) => {
      this.setState({
        loggedInUser: res.data,
      })
    })
    .catch((err) => {
      if(err.response.status === 401) {
        this.props.history.push('/')
      }
    })  
  }
  getAdopter(){
    axios.get(`${config.API_URL}/adopter`, {withCredentials: true})
    .then((res) => {
      this.setState({
        loggednInAdopt: res.data,
      })
    })
    .catch((err) => {
      if(err.response.status === 401) {
        this.props.history.push('/')
      }
    })  
  }

  componentDidMount(){
    this.getAnimals();
    if (!this.state.loggedInUser) {
      this.getUser();
    }
    if (!this.state.loggednInAdopt) {
      this.getAdopter();
    }
  }


  handleAddAnimals = (e) => {
      e.preventDefault()
      let name = e.target.name.value;
      let description = e.target.description.value;
      let breed = e.target.breed.value;
      let color = e.target.color.value;
      let age = e.target.age.value;
      let height= e.target.height.value;
      let weight= e.target.weight.value;
      let funfact = e.target.funfact.value;
      let location = e.target.location.value;
      let hair_length = e.target.hair_length.value;
      let available_housing = e.target.available_housing.value;
      let good_with = e.target.good_with.value;
      let bad_with = e.target.bad_with.value;
      let needs_time = e.target.needs_time.value;
      let image = e.target.image.files[0]

     
      let uploadData = new FormData();
      uploadData.append('imageUrl', image)

      axios.post(`${config.API_URL}/upload`, uploadData)
         .then((res) => {
           console.log(res)
         })

      axios.post(`${config.API_URL}/create`, {
        name: name,
        description: description,
        image: uploadData,
        breed: breed, 
        color: color, 
        age: age, 
        height: height, 
        weight: weight,
        hair_length: hair_length,
        available_housing: available_housing, 
        good_with: good_with,
        bad_with: bad_with, 
        needs_time: needs_time, 
        funfact: funfact, 
        location: location
      }, {withCredentials: true})
      .then((res) => {
        this.setState({
          animals: [...this.state.animals, res.data]
        }, () => {
          this.props.history.push('/shelter/animals')
        })
      })
      .catch((err) => {''
        if(err.response.status === 401) {
          this.props.history.push('/')
        }
      })
  }

  handleDelete = (id) => {
      //filter animals
      let newAnimal = this.state.animals.filter((animal) => {
          return animal._id !== id
      })

      this.setState({
        animals: newAnimal 
      }, () => {
        this.props.history.push('/shelter/animals')
      })
      console.log(this.state.animals)
  }
  
  handleEdit = () => {

      this.setState({
        animals: [...this.state.animals]
      }, () => {
        this.props.history.push('/shelter/animals')
      })
}

  handleLogout = () => {
    console.log(document.cookie)
    axios.post(`${config.API_URL}/logout`, {}, { withCredentials: true})
    .then((res) => {
      console.log(res)
      this.setState({
        loggedInUser: null
      }, () => {
        this.props.history.push('/')
      })
    })
  }

  handleSignIn = (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value
    
    axios.post(`${config.API_URL}/signin`, {
      email: email,
      password: password
    })
    .then((res) => {
      this.setState({
        loggedInUser: res.data,
        // loggednInShelter: res.data
      }, () => {
        this.props.history.push('/shelter/animals')
      })
    })
  }

  handleShelterSignUp = (e) => {
    e.preventDefault()
    let shelter_name = e.target.shelter_name.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    let phone = e.target.phone.value;
    let location = e.target.location.value;
    let description = e.target.description.value;
    let url = e.target.url.value;

    axios.post(`${config.API_URL}/shelter/signup`, {
      shelter_name: shelter_name,
      email: email,
      password: password,
      phone: phone,
      location: location,
      description: description,
      url: url
    }, { withCredentials: true})
    .then((res) => {
        this.setState({
          loggedInUser: res.data,
        }, () => {
          this.props.history.push('/shelter/animals')
        })
    })
    
  }
  //USER SIGN UP 
  handleUserSignUp = (e) => {
    e.preventDefault()
    let fullName = e.target.fullName.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    let phone = e.target.phone.value;
    let location = e.target.location.value;
    let job = e.target.job.value;
    let livingPlace = e.target.livingPlace.value;
    let otherowned = e.target.otherowned.value;
    let availability = e.target.availability.value;
    

    axios.post(`${config.API_URL}/user/application`, {
      fullName: fullName,
      email: email,
      password: password,
      phone: phone,
      location: location,
      job: job,
      livingPlace: livingPlace,
      otherowned: otherowned, 
      availability: availability,
    }, { withCredentials: true})
    .then((res) => {
        this.setState({
          loggednInAdopt: res.data
        }, () => {
          this.props.history.push('/user/pets')
        })
    })
    
  }

  handleLogoutUser = () => {
    console.log(document.cookie)
    axios.post(`${config.API_URL}/user/logout`, {}, { withCredentials: true})
    .then((res) => {
      console.log(res)
      this.setState({
        loggednInAdopt: null
      }, () => {
        this.props.history.push('/')
      })
    })
  }

  render(){
    const {loggedInUser} = this.state;
    const {loggednInAdopt} = this.state;
    return (
      <>
              
        
        <Switch>
            {/* <Route exact path="/shelter/profile"  render={(routeProps) => {
              return <EditProfile onLogout={this.handleLogout} 
              loggedInUser={this.state.loggedInUser} {...routeProps}/>
            }}/> */}
            <Route exact path="/"  render={(routeProps) => {
              return <LandingPage loggedInUser={this.state.loggedInUser} 
              loggednInAdopt={loggednInAdopt}
              {...routeProps} 
                />
              }}/>
            <Route exact path="/shelter/animals"  render={(routeProps) => {
              return <AnimalList onLogout={this.handleLogout}
              loggedInUser={loggedInUser}
                  animals={this.state.animals} 
                  {...routeProps} 
                />
            }}/>
            <Route exact path="/shelter/applications"  render={(routeProps) => {
              return <ShelterAplic onLogout={this.handleLogout}
              loggedInUser={loggedInUser}
              {...routeProps}  />
            }}/>
            <Route path="/shelter/add-form" render={(routeProps) => {
              return <AddAnimals onLogout={this.handleLogout}
                  loggedInUser={loggedInUser} 
                  onAdd={this.handleAddAnimals} 
                  {...routeProps} 
              />
            }}/>
           <Route exact path="/shelter/animal/:id" render={(routeProps) => {
              return <AnimalDetail onLogout={this.handleLogout}
                loggedInUser={loggedInUser} 
                afterDelete={this.handleDelete} 
                {...routeProps} 
              />
            }}/>
            <Route path="/shelter/animal/:id/edit" render={(routeProps) => {
              return <EditAnimals onLogout={this.handleLogout}
                loggedInUser={loggedInUser} 
                afterEdit={this.handleEdit}
                {...routeProps} 
              />
            }}/>
            <Route exact path="/user/application" render={(routeProps) => {
              return <ApplicationUser onSignUpUser={this.handleUserSignUp} 
               {...routeProps} />
            }}/>
            <Route exact path="/shelter/signup" render={(routeProps) => {
              return <SignupShelter onSignUp={this.handleShelterSignUp} 
              {...routeProps} />
            }}/>
            <Route exact path="/user/signup" render={(routeProps) => {
              return <SignupUser  {...routeProps} />
            }}/>

            <Route exact path="/user/pets" render={(routeProps) => {
              return <PetsUser animals={this.state.animals}
              loggednInAdopt={loggednInAdopt} 
              onLogout={this.handleLogoutUser} {...routeProps} />
            }}/>
            <Route exact path="/user/profile" render={(routeProps) => {
              return <UserProfile loggednInAdopt={loggednInAdopt} 
              onLogout={this.handleLogoutUser} {...routeProps} />
            }}/>
            <Route exact path="/user/favorite" render={(routeProps) => {
              return <FavoriteUser loggednInAdopt={loggednInAdopt} 
              onLogout={this.handleLogoutUser} {...routeProps} />
            }}/>
            <Route exact path="/donate" render={() => {
              return <DonateUser />
            }}/>
        </Switch>
      </> 
    )
  }
};


export default withRouter(App)

//Higher Order Component
