import React from 'react'

const searchBox = props => {
return (<div className="searchBox">
    <input type="text" placeholder={props.placeholder}/>
    <div className="searchIcon"><i class="fas fa-search h4 text-body"></i></div>
    </div>);
};
export default searchBox;