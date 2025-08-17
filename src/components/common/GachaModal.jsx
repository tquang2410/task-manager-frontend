import React from 'react';
import { Modal } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/components/GachaModal.module.css';

const GachaModal = ({ isOpen, onClose, tasks, onTaskSelect }) => {
    const cardVariants = {
        hidden: {
            opacity: 0,
            rotateY: 180,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            rotateY: 0,
            scale: 1,
            transition: {
                duration: 3,
                type: 'spring',
                stiffness: 80,
                damping: 10,
                mass: 0.5,
            }
        },
    };

    const exitVariants = {
        exit: {
            y: -300,
            opacity: 0,
            scale: 0.5,
            transition: {
                duration: 0.5,
                ease: 'easeOut'
            }
        },
    };

    const getCardColorClass = (priority) => {
        switch (priority) {
            case 'low':
                return styles.cardLow;
            case 'medium':
                return styles.cardMedium;
            case 'high':
                return styles.cardHigh;
            default:
                return '';
        }
    };

    const handleTaskClick = (task) => {
        onTaskSelect(task); // Truyền toàn bộ đối tượng task
        onClose();
    };

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            centered
            width={700}
        >
            <div className={styles.gachaModalContent}>
                <span className={styles.fireworkIconLeft}>🎉</span>
                <span className={styles.fireworkIconRight}>🎉</span>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className={styles.modalTitle}>🎉 Gacha Results! 🎉</h1>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className={styles.gachaContainer}>
                    <AnimatePresence>
                        {isOpen && tasks.map((task, index) => (
                            <motion.div
                                key={task.id}
                                className={`${styles.gachaCard} ${getCardColorClass(task.priority)}`}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                exit={exitVariants.exit}
                                transition={{
                                    ...cardVariants.visible.transition,
                                    delay: index * 0.4,
                                }}
                                onClick={() => handleTaskClick(task)}
                            >
                                <div className={styles.cardContent}>
                                    <h3 className={styles.taskTitle}>{task.title}</h3>
                                    <p className={styles.taskPriority}>
                                        Priority: {task.priority}
                                    </p>
                                    <p className={styles.taskStatus}>
                                        Status: {task.status}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </Modal>
    );
};

export default GachaModal;