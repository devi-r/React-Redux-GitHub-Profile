import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import moment from 'moment';
import User from '../components/User.jsx';
import SearchInput from '../components/Inputs/SearchInput.jsx';
import DropDownInput from '../components/Inputs/DropDownInput.jsx';
import RowListItem from '../components/RowListItem.jsx';
import Button from '../components/Button.jsx';
import {tabArray,typeArray,languageArray} from '../variables/Variables.jsx';
import Octicon, {Star,Law,X,Repo} from '@primer/octicons-react';


class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "tabIndex": 1,
      "user": {},
      "repos" : [],
      "filteredRepos" : [],
      "searchFilter":"",
      "typeFilter":"All",
      "languageFilter":"All",
      "filterOpen" : false
    }  
  }

  componentDidMount(){
    let UserPopulateAPI = "https://api.github.com/users/supreetsingh247";
    fetch(UserPopulateAPI,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data =>{
        this.setState({user : data},
          () =>{
            this.handleReposPopulate();
          }
        );
      });
  }

  handleReposPopulate = () => {
    let ReposPopulateAPI = 'https://api.github.com/users/supreetsingh247/repos';
    
    fetch(ReposPopulateAPI,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data =>{
        this.setState({
          repos : data,
          filteredRepos : data
        });
      });
  }

  handleResetFilter = () => {
    this.setState({
      "searchFilter":"",
      "typeFilter":"All",
      "languageFilter":"All",
      "filterOpen" : false,
      "filteredRepos": this.state.repos
    });
  }

  handleFilterChange = (e) => {
    this.setState({[e.target.name]: e.target.value},
      ()=>{
        let filtering_array = this.state.repos;
        let filtered = false;
    
        if(this.state.searchFilter){
          console.log('has search')
          filtering_array = filtering_array.filter((repo) =>{      
            let lowerRepoName = String(repo.name).toLowerCase();        
            let lowerSearchFilter = String(this.state.searchFilter).toLowerCase();
            filtered = (lowerRepoName.startsWith(lowerSearchFilter) ? true : false);
            return filtered;
          }) 
        }

        if(this.state.typeFilter !== 'All'){
          console.log('has type')
          filtering_array = filtering_array.filter((repo) =>{ 
            if(this.state.typeFilter === 'All'){
              filtered = true;
            }
            else if(this.state.typeFilter === 'Source'){
              filtered = (!repo.fork ? true : false);
            }
            else if(this.state.typeFilter === 'Forked'){
              filtered = (repo.fork ? true : false);
            }
            else if(this.state.typeFilter === 'Archived'){
              filtered = (repo.archived ? true : false);
            }
          return filtered;
          }) 
        }
        
        if(this.state.languageFilter !== 'All'){
          console.log('has lang')
          filtering_array = filtering_array.filter((repo) =>{
            if(this.state.languageFilter === 'All'){
              filtered = true;
            }
            else{
              filtered = (repo.language === this.state.languageFilter) ? true : false;
            }
            return filtered;
          }) 
        }

        this.setState({
          filteredRepos: filtering_array
        },
          ()=>{
            console.log(this.state)
          }
        );
      },0);
  }


  render() {
    return (
      <div className="content">
        <div className="user-details">
          <User userDetails={this.state.user} />
        </div>

        <div className="user-navbar">
          <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ "tabIndex" : 1 })}>
            <TabList>
              {tabArray.map((tabname,index) => {
                return <Tab key={`repo_${index}`}>{tabname}</Tab>
              })
            }
            </TabList>

            <div className="filter-block">
              <SearchInput name="searchFilter" defaultValue={this.state.searchFilter} changeEvent={this.handleFilterChange} />
              <DropDownInput name="typeFilter" title="type" options={typeArray} defaultOption={this.state.typeFilter} defaultOpen={this.state.filterOpen} changeEvent={this.handleFilterChange} clearFilter={this.state.handleResetFilter} />
              <DropDownInput name="languageFilter" title="language" options={languageArray} defaultOption={this.state.languageFilter} defaultOpen={this.state.filterOpen} changeEvent={this.handleFilterChange}  clearFilter={this.state.handleResetFilter} />
              <Button data="New" icon={Repo} />
            </div>

            {(this.state.searchFilter || (this.state.typeFilter !== 'All') || (this.state.languageFilter !== 'All')) && 
              <div className="filter-message-block">
                <div className="filter-message">
                  {this.state.filteredRepos.length} results found for 
                  {` ${(this.state.typeFilter !== 'All') ? this.state.typeFilter:''} `}repositories 
                  {this.state.searchFilter ? ` matching ${this.state.searchFilter}` : ''} 
                  {(this.state.languageFilter !== 'All') ? ` written in ${this.state.languageFilter}` : ''}
                </div>
                <Button data="Clear filter" icon={X} clickEvent={this.handleResetFilter}/>
              </div>
            }

            <TabPanel>
              <h2>No content</h2>
            </TabPanel>

            <TabPanel>
              <div className="tab-data">
                {
                this.state.filteredRepos.length ?
                  <ul>
                    {this.state.filteredRepos.map((repo) =>{
                      return (
                        <RowListItem key={repo.id} item={repo} >
                          <h3>
                            <a href={repo.html_url} target="blank">
                            {repo.name}</a>
                          </h3>
                          {repo.fork ? 
                            <div>Forked from <a href={repo.forks_url} target="blank">
                            {repo.forks_url}</a></div>
                            : null}
                          <div>{repo.description}</div>
                          <div>
                            <span>{repo.language}</span>
                            {repo.stargazers_count ? 
                              <a href={repo.stargazers_url} target="blank">
                                <Octicon icon={Star}/>
                                {repo.stargazers_count}
                              </a>
                            : null}


                            
                            {repo.license ? 
                              <span>
                                <Octicon icon={Law}/>
                                 {repo.license.name}
                              </span>
                            : null}

                            <span> Updated on 
                              {moment(repo.updated_at).format('DD MMM YYYY')}
                            </span>
                          </div>
                        </RowListItem>
                      )
                    })}
                  </ul>
                  : `${this.state.user.login} doesn't have any repositories that match.`
                }
              </div>
            </TabPanel>

            <TabPanel>
              <h2>No content</h2>
            </TabPanel>
            <TabPanel>
              <h2>No content</h2>
            </TabPanel>
            <TabPanel>
              <h2>No content</h2>
            </TabPanel>
            <TabPanel>
              <h2>No content</h2>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default ProfilePage;