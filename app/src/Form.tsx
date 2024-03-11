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

  console.log('completedTasks :>> ', completedTasks);

  console.log('tasks :>> ', tasks);



  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    setTasks((prev) => [task, ...prev]);
    setTask((prev) => ({ ...prev, id: idCounter }));
    setIdCounter((prev) => prev + 1);
  };

  const handleDelete = () => {
    if (showActive) {
      const newTasks = activeTasks.filter(task => task.isSelected !== true)
      setActiveTasks(newTasks)
    } else {
      const newTasks = tasks.filter((task) => task.isSelected !== true);
      setTasks(newTasks);
    }
    
  };

  const handleCheckBox = (taskId: number) => {
    if (showCompleted) {
      setCompletedTasks((prevTasks) => {
        return prevTasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, isSelected: !task.isSelected };
          }
          return task;
        });
      });
    } else if (showActive) {
      setActiveTasks((prevTasks) => {
        return prevTasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, isSelected: !task.isSelected };
          }
          return task;
        });
      });
    } else {
      setTasks((prevTasks) => {
        return prevTasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, isSelected: !task.isSelected };
          }
          return task;
        });
      });
    }
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

  const handleShowCompleted = () => {
    setShowCompleted(true);
    setShowActive(false);
  };

  const handleCompleteTask = (taskId: number) => {
    setCompletedTasks((prev) => [
      ...prev,
      ...tasks.filter((task) => task.isSelected === true),
    ]);

    const isCompleted = tasks.map(task => {
      if (task.isSelected) {
        return {...task, isCompleted: true}
      } else {
        return task
      }
      
    })
    setTasks(isCompleted)
  };


  const handleClearCompleted = () => {
    const newTasks = tasks.filter(task => !task.isSelected)
    setTasks(newTasks)
    setCompletedTasks([])
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
              <div className="btn-container">
                
                <button onClick={() => handleCompleteTask(task.id)} className="mark-completed">Mark as completed</button>
                <button
                  onClick={() => {
                    handleDelete();
                  }}
                  className="delete-task"
                >
                  Delete
                </button>
              </div>
            )}
            <div className="form-footer">
              <span>{activeTasks.length} task(s) remaining</span>
              <div className="status">
                <span className="display" onClick={handleShowAll}>
                  All
                </span>
                <span className="display" onClick={handleShowActive}>
                  Active
                </span>
                <span className="display" onClick={handleShowCompleted}>
                  completed
                </span>
              </div>
              <span onClick={handleClearCompleted} className="clear">Clear Completed</span>
            </div>
          </div>
        )}

        {showCompleted && (
          <div className="tasks">
            {completedTasks.map((task) => (
              <div className="task completed-tasks" key={task.id}>
              
                <p>{task.name}</p>
              </div>
            ))}
            <div className="form-footer">
              <span>{completedTasks.length} task(s) completed</span>
              <div className="status">
                <span className="display" onClick={handleShowAll}>
                  All
                </span>
                <span className="display" onClick={handleShowActive}>
                  Active
                </span>
                <span className="display" onClick={handleShowCompleted}>
                  completed
                </span>
              </div>
              <span onClick={handleClearCompleted} className="clear">Clear Completed</span>
            </div>
          </div>
        )}

        {showAll && !showActive && !showCompleted && (
          <div className="tasks">
            {tasks.map((task) => (
              <div className={`task ${task.isCompleted ? "completed": ""}`} key={task.id}>
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
              <div className="btn-container">
                
                <button onClick={() => handleCompleteTask(task.id)} className="mark-completed">Mark as completed</button>
                <button
                  onClick={() => {
                    handleDelete();
                  }}
                  className="delete-task"
                >
                  Delete
                </button>
              </div>
            )}
            <div className="form-footer">
              <span>{tasks.length} task(s) remaining</span>
              <div className="status">
                <span className="display" onClick={handleShowAll}>
                  All
                </span>
                <span className="display" onClick={handleShowActive}>
                  Active
                </span>
                <span className="display" onClick={handleShowCompleted}>
                  completed
                </span>
              </div>
              <span onClick={handleClearCompleted} className="clear">Clear Completed</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Form;
