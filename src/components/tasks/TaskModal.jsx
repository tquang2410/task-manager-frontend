// src/components/tasks/TaskModal.jsx
import { useTaskContext } from '../../context/TaskContext';
import FormModal from '../common/FormModal';
import TaskForm from './TaskForm';

const TaskModal = () => {
    const {
        isModalOpen,
        closeModal,
        editingTask,
        isEditMode,
        addTask,
        updateTask,
    } = useTaskContext();

    // Handle form submission
    const handleSubmit = (formData) => {
        if (isEditMode) {
            updateTask(editingTask.id, formData);
        } else {
            addTask(formData);
        }
        closeModal();
    };

    return (
        <FormModal
            title={isEditMode ? "Edit Task" : "Create New Task"}
            open={isModalOpen}
            onCancel={closeModal}
            onSubmit={handleSubmit}
            initialData={editingTask}
            width={650}
        >
            <TaskForm
                onCancel={closeModal}
                isEditMode={isEditMode}
            />
        </FormModal>
    );
};

export default TaskModal;