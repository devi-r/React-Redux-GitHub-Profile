import React, { Component } from "react";
import LeftContent from '../components/LeftContent/LeftContent.jsx';
import RightContent from '../components/RightContent/RightContent.jsx';
import Loader from "../components/Loader.jsx";

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectQuery,
  fetchDataIfNeeded
} from '../actions'


class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "tabIndex": 1,
      "user":[],
      "repos" : [],
      "filteredRepos" : [],
      "searchFilter":"",
      "typeFilter":"All",
      "languageFilter":"All",
      "filterOpen" : false
    }  
  }

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(selectQuery('user'))
    dispatch(fetchDataIfNeeded('user'))
    dispatch(selectQuery('repos'))
    dispatch(fetchDataIfNeeded('repos'))
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.dataByQuery['user'].items,
      repos: nextProps.dataByQuery['repos'].items,
      filteredRepos:nextProps.dataByQuery['repos'].items
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
        let filtering_array = this.props.dataByQuery['repos'].items;
        let filtered = false;
    
        if(this.state.searchFilter){
          filtering_array = filtering_array.filter((repo) =>{      
            let lowerRepoName = String(repo.name).toLowerCase();        
            let lowerSearchFilter = String(this.state.searchFilter).toLowerCase();
            filtered = (lowerRepoName.startsWith(lowerSearchFilter) ? true : false);
            return filtered;
          }) 
        }

        if(this.state.typeFilter !== 'All'){
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

        this.setState({filteredRepos: filtering_array});
      },0);
  }


  render() {
    const { isFetching } = this.props

    return (
      <div className="content-block">
        { isFetching ?
          <Loader showLoader={isFetching}/>
        :
        <div className="content">
          <LeftContent content={this.state.user} />
          
          <RightContent content={this} />
        </div>
        }
      </div>
    );
  }
}

ProfilePage.propTypes = {
  selectedQuery: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedQuery, dataByQuery } = state
  const {
    isFetching,
    items: data
  } = dataByQuery[selectedQuery] || {
      isFetching: true,
      items: []
    }

  return {
    selectedQuery,
    data,
    isFetching,
    dataByQuery
  }
}

export default connect(mapStateToProps)(ProfilePage);
