import { Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { SignInUp } from "./Users/SignInUp";
import './App.css'
import { Error } from "./Error/Error";
import { Layout } from "./Layout/Layout";
import { useLocation } from 'react-router-dom';
import Verify from "./Auth/Verify";
import { TasksM } from "./TaskM/TaskM";
import { DailyTask } from "./TaskC/DailyTasks";
import { CalendarProvider } from "./CalendarContext";

const App = () => {
  const location = useLocation();

  return (
    <CalendarProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<SignInUp type={'login'} />} />
            <Route path="register" element={<SignInUp type={'register'} />} />
            <Route path="createTaskM" element={<TasksM />} />
            <Route path="createDailyTask" element={<DailyTask />} />
            <Route path="*" element={<Error message={location.pathname} />} />
          </Route>
        </Routes>
      </div>
    </CalendarProvider>
  );
}

export default App;
