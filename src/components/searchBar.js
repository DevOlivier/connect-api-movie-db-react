import React , {Component} from 'react'

class SearchBar extends Component {
    constructor (props) {
        super(props);
        this.state = { searchText : "" }
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-8 input-group">
                    <input type="text" className="form-control input-lg" placeholder="Entrez le nom d'un film"  onChange={this.handleChange.bind(this)} />
                </div>
                <span className="input-group-btn">
                    <button type="button" className="btn btn-primary" onClick={this.handleClickSearchMovie.bind(this)}>Rechercher</button>
                </span>
            </div>
            
        )
    }
    
    handleChange (e) {
        this.setState( {searchText : e.target.value} )  
    }

    handleClickSearchMovie () {
        this.props.callBack(this.state.searchText)
    }

}

export default SearchBar;