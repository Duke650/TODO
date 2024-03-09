import { useState } from "react";
import "./form.css";

interface Task {
  id: number;
  name: string;
  isSelected: boolean;
  isCompleted: boolean;
}

const Form = () => {
  const [task, setTask] = useState<Task>({
    id: 0,
    name: "",
    isSelected: false,
    isCompleted: false,
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [idCounter, setIdCounter] = useState<number>(1);
  const [showAll, setShowAll] = useState(true);
  const [showActive, setShowActive] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  console.log('tasks :>> ', tasks);


  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    setTasks((prev) => [task, ...prev]);
    setTask((prev) => ({ ...prev, id: idCounter }));
    setIdCounter((prev) => prev + 1);
  };

  const handleDelete = () => {
    const newTasks = tasks.filter((task) => task.isSelected !== true);
    setTasks(newTasks);
  };

  const handleCheckBox = (taskId: number) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isSelected: !task.isSelected };
        }
        return task;
      });
    });
  };

  const handleShowActive = () => {
    setShowActive(true);
    setShowAll(false);
    setShowCompleted(false);
    const updatedTasks = tasks.filter((task) => task.isCompleted !== true);
    setActiveTasks(updatedTasks);
  };

  const handleShowAll = () => {
    setShowAll(true);
    setShowActive(false);
    setShowCompleted(false);
  };

  const handleCompletedTasks = () => {
    setShowCompleted(true);
    setShowActive(false);
  };

  const handleCompleteTask = () => {
    setCompletedTasks(tasks.filter(task => task.isSelected === true))
  }

  return (
    <>
      <div className="my-form-container">
        <h1>MY TODOS</h1>
        <form>
          <input
            type="text"
            id="task"
            placeholder="do something..."
            onChange={(e) =>
              setTask((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <button
            type="submit"
            onClick={(e) => handleAddTask(e)}
            className="add-btn"
          >
            <strong>+</strong>
          </button>
        </form>

        {showActive && !showCompleted && (
          <div className="tasks">
            {activeTasks.map((task) => (
              <div className="task" key={task.id}>
                <p
                  className={task.isSelected ? "circle-filled" : "circle-empty"}
                  onClick={() => {
                    handleCheckBox(task.id);
                  }}
                ></p>
                <p>{task.name}</p>
              </div>
            ))}

            {activeTasks.find((task) => task.isSelected === true) && (
              <div>
                <button
                  onClick={() => {
                    handleDelete();
                  }}
                  className="delete-task"
                >
                  Delete
                </button>
                <button onClick={handleCompleteTask}>Mark as completed</button>
              </div>
            )}
            <div className="form-footer">
              <span>{tasks.length} tasks remaining</span>
              <div className="status">
                <span className="display" onClick={handleShowAll}>
                  All
                </span>
                <span className="display" onClick={handleShowActive}>
                  Active
                </span>
                <span className="display" onClick={handleCompletedTasks}>
                  completed
                </span>
              </div>
              <span>Clear Completed</span>
            </div>
          </div>
        ) }

        {showCompleted && (
          <div className="tasks">
            {completedTasks.map((task) => (
              <div className="task" key={task.id}>
                <p
                  className={task.isSelected ? "circle-filled" : "circle-empty"}
                  onClick={() => {
                    handleCheckBox(task.id);
                  }}
                ></p>
                <p>{task.name}</p>
              </div>
            ))}

            {completedTasks.find((task) => task.isSelected === true) && (
              <div>
                <button
                  onClick={() => {
                    handleDelete();
                  }}
                  className="delete-task"
                >
                  Delete
                </button>
                <button onClick={handleCompleteTask}>Mark as completed</button>
              </div>
            )}
            <div className="form-footer">
              <span>{tasks.length} tasks remaining</span>
              <div className="status">
                <span className="display" onClick={handleShowAll}>
                  All
                </span>
                <span className="display" onClick={handleShowActive}>
                  Active
                </span>
                <span className="display" onClick={handleCompletedTasks}>
                  completed
                </span>
              </div>
              <span>Clear Completed</span>
            </div>
          </div>
        )}

        {showAll && !showActive && !showCompleted && (
          <div className="tasks">
            {tasks.map((task) => (
              <div className="task" key={task.id}>
                <p
                  className={task.isSelected ? "circle-filled" : "circle-empty"}
                  onClick={() => {
                    handleCheckBox(task.id);
                  }}
                ></p>
                <p>{task.name}</p>
              </div>
            ))}

            {tasks.find((task) => task.isSelected === true) && (
              <div>
                <button
                  onClick={() => {
                    handleDelete();
                  }}
                  className="delete-task"
                >
                  Delete
                </button>
                <button onClick={handleCompleteTask}>Mark as completed</button>
              </div>
            )}
            <div className="form-footer">
              <span>{tasks.length} tasks remaining</span>
              <div className="status">
                <span className="display" onClick={handleShowAll}>
                  All
                </span>
                <span className="display" onClick={handleShowActive}>
                  Active
                </span>
                <span className="display" onClick={handleCompletedTasks}>
                  completed
                </span>
              </div>
              <span>Clear Completed</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Form;
