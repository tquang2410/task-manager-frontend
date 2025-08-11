import PropTypes from "prop-types";
import styles from "../../styles/components/SearchSuggestions.module.css";
import {ClockCircleOutlined} from "@ant-design/icons";

const statusColors = {
    'in-progress': 'rgb(230, 244, 255)',
    'completed': 'rgb(246, 255, 237)',
    'pending': 'rgb(255, 247, 230)',
};
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
                    style={{ backgroundColor: statusColors[task.status] }}
                >
                    <ClockCircleOutlined className={styles.suggestionIcon}/>
                    {task.title && task.title.length > 50
                        ? `${task.title.substring(0, 50)}...`
                        : task.title
                    }
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