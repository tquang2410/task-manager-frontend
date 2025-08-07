import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

const SearchBox = ({ searchTerm, onSearch }) => {
    const debouncedOnSearch = useRef(debounce((value) => {
        onSearch(value);
    }, 500)).current;
    return (
        <div className="search-box">
            <input
                type="text"
                placeholder="Search..."
                defaultValue={searchTerm} // Gán giá trị từ Redux
                onChange={(e) => debouncedOnSearch(e.target.value)} // Cập nhật giá trị lên Redux
            />
        </div>
    );
}
SearchBox.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
}
export default SearchBox;