import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import  {openGachaModal}  from "../store/slices/taskSlice.js";

const useGacha = () => {
    const dispatch = useDispatch();
    // Get tasks from Redux store
    const allTasks = useSelector(state => state.tasks.tasks);

    // Local state to store tasks that are not completed
    const [rollableTasks, setRollableTasks] = useState([]);

    // Update rollable tasks whenever allTasks changes
    useEffect(() => {
        const filtered = allTasks.filter(
            task => task.status === 'pending' || task.status === 'in-progress'
        );
        setRollableTasks(filtered); // Store tasks that are not completed
    }, [allTasks]);

    // Logic to randomly select 3 tasks
    const rollGacha = () => {
        if (rollableTasks.length < 3) {
            return;
        }
        const tasksToRoll = [...rollableTasks];
        const selected = [];
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * tasksToRoll.length);
            selected.push(tasksToRoll[randomIndex]);
            tasksToRoll.splice(randomIndex, 1);
        }
        // Dispatch action to open Gacha modal with selected tasks
        dispatch(openGachaModal(selected));
    };
    // Check if there are 3 tasks to roll
    const isGachaReady = rollableTasks.length >= 3;
    return {
        isGachaReady,
        rollGacha,

    }
}
export default useGacha;