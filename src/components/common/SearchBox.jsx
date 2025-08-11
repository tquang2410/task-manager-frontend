import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import styles from '../../styles/components/SearchBox.module.css';
import {SearchOutlined} from "@ant-design/icons";

const SearchBox = ({ searchTerm, onSearch }) => {
    const debouncedOnSearch = useRef(debounce((value) => {
        onSearch(value);
    }, 500)).current;
    return (
        <div className={styles.googleLikeSearchBox}>
            <SearchOutlined className={styles.searchIcon}/>
            <input
                className={styles.searchInput}
                type="text"
                placeholder="Input task's title to search"
                autoComplete="off"
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