import {Component} from 'react'
import {v4} from 'uuid'

import './App.css'

class App extends Component {
  state = {
    isTrue: false,
    isShow: false,
    webSite: '',
    userName: '',
    passWord: '',
    list: [],
  }

  websiteInput = event => {
    this.setState({webSite: event.target.value})
  }

  usernameInput = event => {
    this.setState({userName: event.target.value})
  }

  passwordInput = event => {
    this.setState({passWord: event.target.value})
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  formContent = event => {
    event.preventDefault()
    const {userName, passWord, webSite} = this.state
    const initial = webSite[0].toUpperCase()
    const newData = {
      id: v4(),
      initial: initial,
      webSite: webSite,
      userName: userName,
      passWord: passWord,
    }
    this.setState(prev => ({
      list: [...prev.list, newData],
      webSite: '',
      userName: '',
      passWord: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }
  dlt = id => {
    const {list} = this.state
    const newList = list.filter(each => each.id !== id)
    const caseOf = newList.length !== 0
    this.setState({list: newList, isTrue: caseOf})
  }
  render() {
    const {searchInput, isShow, webSite, userName, passWord, list} = this.state
    let {isTrue} = this.state
    const newList = list.filter(e =>
      e.webSite.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />
          <form onSubmit={this.formContent}>
            <h1>Add New Password</h1>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                type="text"
                placeholder="Enter Website"
                value={webSite}
                onChange={this.websiteInput}
              />
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                type="text"
                placeholder="Enter Username"
                value={userName}
                onChange={this.usernameInput}
              />
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={passWord}
                onChange={this.passwordInput}
              />
            </div>
            <button type="submit">Add</button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
        </div>
        <div>
          <div>
            <div>
              <h1>Your Passwords</h1>
              <p>{list.length}</p>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div>
            <input type="checkbox" id="check" onChange={this.showPassword} />
            <label htmlFor="check">Show Passwords</label>
          </div>
          {!isTrue && (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p>No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul>
              {newList.map(each => (
                <li id={each.id} key={each.id}>
                  <p>{each.initial}</p>
                  <div>
                    <p>{each.webSite}</p>
                    <p>{each.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                      />
                    )}
                    {isShow && <p>{each.passWord}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => this.dlt(each.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default App
