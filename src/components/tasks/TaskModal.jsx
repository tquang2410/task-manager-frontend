// src/components/tasks/TaskModal.jsx
import useTask from "../../hooks/useTask.js";
import FormModal from '../common/FormModal';
import TaskForm from './TaskForm';

const TaskModal = () => {
    const {
        isModalOpen,
        closeModal,
        editingTask,
        isEditMode,
        createTask,
        updateTask,
    } = useTask();

    // Handle form submission
    const handleSubmit = (formData) => {
        if (isEditMode) {
            updateTask(editingTask.id, formData);
        } else {
            createTask(formData);
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