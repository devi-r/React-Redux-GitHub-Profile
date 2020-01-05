import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import moment from 'moment';
import SearchInput from '../../components/Inputs/SearchInput.jsx';
import DropDownInput from '../../components/Inputs/DropDownInput.jsx';
import RowListItem from '../../components/RowListItem.jsx';
import Button from '../../components/Button.jsx';
import {tabArray,typeArray,languageArray} from '../../variables/Variables.jsx';
import Octicon, {Star,Law,X,Repo} from '@primer/octicons-react';

export class RightContent extends Component {
	render() {
		return (
		  <div className="content-right-block">
		    <Tabs selectedIndex={this.props.content.state.tabIndex} onSelect={tabIndex => this.props.content.setState({ "tabIndex" : 1 })}>
		      <TabList>
		        {tabArray.map((tabname,index) => {
		          return (
		            <Tab key={`repo_${index}`}>
		            {tabname}
		              {(this.props.content.state.tabIndex === index) ? <span className="counter">{this.props.content.state.repos.length}</span>: null}
		            </Tab>
		          )
		        })
		      }
		      </TabList>

		      <div className="filter-block row-item">
		        <SearchInput className="filter-search" name="searchFilter" defaultValue={this.props.content.state.searchFilter} changeEvent={this.props.content.handleFilterChange} />
		        <div className="d-flex">
		          <DropDownInput className="filter-dropdown" name="typeFilter" title="type" options={typeArray} defaultOption={this.props.content.state.typeFilter} defaultOpen={this.props.content.state.filterOpen} changeEvent={this.props.content.handleFilterChange} clearFilter={this.props.content.handleResetFilter} />
		          <DropDownInput className="filter-dropdown" name="languageFilter" title="language" options={languageArray} defaultOption={this.props.content.state.languageFilter} defaultOpen={this.props.content.state.filterOpen} changeEvent={this.props.content.handleFilterChange}  clearFilter={this.props.content.handleResetFilter} />
		          <Button data="New" icon={Repo} />
		        </div>
		      </div>

		      {(this.props.content.state.searchFilter || (this.props.content.state.typeFilter !== 'All') || (this.props.content.state.languageFilter !== 'All')) && 
		        <div className="filter-message-block row-item">
		          <div className="filter-message">
		            {this.props.content.state.filteredRepos.length} results found for 
		            {` ${(this.props.content.state.typeFilter !== 'All') ? this.props.content.state.typeFilter:''} `}repositories 
		            {this.props.content.state.searchFilter ? ` matching ${this.props.content.state.searchFilter}` : ''} 
		            {(this.props.content.state.languageFilter !== 'All') ? ` written in ${this.props.content.state.languageFilter}` : ''}
		          </div>
		          <Button className="filter-clear-button" data="Clear filter" icon={X} iconClass="clear-icon" clickEvent={this.props.content.handleResetFilter}/>
		        </div>
		      }

		      {tabArray.map((tabname,index) => {
		      	if(this.props.content.state.tabIndex === index){
		      		return (
		      			<TabPanel key={tabname}>
					        <div className="tab-data">
					          {
					          this.props.content.state.filteredRepos.length ?
					            <ul className="tab-list">
					              {this.props.content.state.filteredRepos.sort( (a, b) => new Date(b.pushed_at) - new Date(a.pushed_at) ).map((repo) =>{
					                return (
					                  <RowListItem key={repo.id} item={repo} >
					                    <h3 className="list-item-title">
					                      <a href={repo.html_url} target="blank">
					                      {repo.name}</a>
					                    </h3>
					                    {repo.fork ? 
					                      <div className="list-item-label">Forked</div>
					                      : null}
					                    <div className="list-item-description">{repo.description}</div>
					                    <div className="list-item-bottom">
					                      {repo.language ?
					                        <span className="list-bottom-span">  
					                          <span className={`repo-language-color ${repo.language}`}></span>
					                          <span>{repo.language}</span>
					                        </span>
					                      : null}

					                      {repo.stargazers_count ?
					                        <span className="list-bottom-span"> 
					                          
					                            <Octicon icon={Star}/>
					                            {repo.stargazers_count}
					                          
					                        </span>
					                      : null}

					            
					                      {repo.license ? 
					                        <span className="list-bottom-span">
					                          <Octicon icon={Law}/>
					                           {repo.license.name}
					                        </span>
					                      : null}

					                      <span className="list-bottom-span"> Updated on 
					                        {` ${moment(repo.pushed_at).format('DD MMM YYYY')}`}
					                      </span>
					                    </div>
					                  </RowListItem>
					                )
					              })}
					            </ul>
					            : <div className="no-alert">{`${this.props.content.state.user.login} doesn't have any repositories that match.`}</div>
					          }
					        </div>
					     </TabPanel>
				    )
		      	}
		      	else{
		      		return <TabPanel key={tabname}>No content</TabPanel>;
		      	}
		      })}

		      
		    </Tabs>
		  </div>
		);
	}
}

export default RightContent;
