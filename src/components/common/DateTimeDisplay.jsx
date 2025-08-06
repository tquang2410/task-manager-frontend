
import { Typography } from 'antd';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import PropTypes from 'prop-types';
import styles from '../../styles/components/DateTimeDisplay.module.css';

dayjs.extend(weekday);

const DateTimeDisplay = ({ showTime = true, showDate = true, showWeekday = true, className }) => {
    const [currentTime, setCurrentTime] = useState(dayjs());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(dayjs());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const renderDateTime = () => {
        if (showDate && showWeekday) {
            return `Today is ${currentTime.format('DD/MM/YYYY')}. Have a good ${currentTime.format('dddd')}`;
        }
        if (showTime) {
            return currentTime.format('HH:mm:ss');
        }
        return '';
    };

    return (
        <Typography.Text className={`${styles.dateTimeDisplay} ${className || ''}`}>
            {showTime && !showDate && (
                <div className={styles.timerBox}>
                    {renderDateTime()}
                </div>
            )}
            {(showDate || showWeekday) && (
                <div className={styles.dateWeekday}>
                    {renderDateTime()}
                </div>
            )}
        </Typography.Text>
    );
};

DateTimeDisplay.propTypes = {
    showTime: PropTypes.bool,
    showDate: PropTypes.bool,
    showWeekday: PropTypes.bool,
    className: PropTypes.string
};

DateTimeDisplay.defaultProps = {
    showTime: true,
    showDate: true,
    showWeekday: true,
    className: ''
};

export default DateTimeDisplay;
