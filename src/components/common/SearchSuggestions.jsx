import PropTypes from "prop-types";
import styles from "../../styles/components/SearchSuggestions.module.css";

const SearchSuggestions = ({ suggestions, onSelect }) => {
    // Check if suggestions are provided and not empty
    if (!suggestions || suggestions.length === 0) {
        return null;
    }
    return (
        <ul className={styles.suggestionsList}>
            {suggestions.map((task)=>(
                <li key={task.id}
                    className={styles.suggestionItem}
                    onClick={() => onSelect(task.title)}
                >
                    {task.title}
                </li>
            ))}
        </ul>
    );
};
// PropTypes for type checking
SearchSuggestions.propTypes = {
    suggestions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
    onSelect: PropTypes.func.isRequired,
};
export default SearchSuggestions;