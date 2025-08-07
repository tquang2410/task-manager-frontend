import React from 'react';
import PropTypes from 'prop-types';


const SearchBox = ({ searchTerm, onSearch }) => {
    return (
        <div className="search-box">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm} // Gán giá trị từ Redux
                onChange={(e) => onSearch(e.target.value)} // Cập nhật giá trị lên Redux
            />
            <button type="submit">Search</button>
        </div>
    );
}
SearchBox.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
}
export default SearchBox;