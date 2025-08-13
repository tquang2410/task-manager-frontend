import React, { useState } from 'react';
import { Button, Spin, message } from 'antd';
import { FireOutlined } from '@ant-design/icons';
import useGacha from '../../hooks/useGacha';
import styles from '../../styles/components/GachaButton.module.css';

const GachaButton = () => {
    const [isRolling, setIsRolling] = useState(false);
    const { isGachaReady, rollGacha } = useGacha();

    const handleGachaRoll = () => {
        setIsRolling(true);
        setTimeout(() => {
            setIsRolling(false);
            if (isGachaReady) {
                rollGacha();
                message.success('Gacha roll successful!');
            } else {
                message.info('Not enough tasks to roll!');
            }
        }, 2000);
    };

    return (
        <Button
            className={styles.gachaButton}
            type="dashed"
            icon={isRolling ? <Spin indicator={<FireOutlined spin />} /> : <FireOutlined />}
            onClick={handleGachaRoll}
            disabled={isRolling || !isGachaReady}
        >
            {isRolling ? 'Rolling...' : 'Gacha'}
        </Button>
    );
};

export default GachaButton;