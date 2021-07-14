import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { FilterContainer } from './components/filter-container/filter-container';
import { WorkoutCard } from './components/workout-card';


const workoutTest = {
        "id":"5c0fc25241403b024ad988aa",
        "name":"Tricep Kickbacks",
        "transcript":"<ol><li style=\"text-align: left;\">Place your right or left arm and leg along a flat bench and bend your torso forwards so it's parallel to the floor.</li><li style=\"text-align: left;\">In your free hand, hold a dumbbell up by your side. Your upper arm should be alongside your upper body with your lower arm pointing down to the floor. <b>First Position</b>.</li><li style=\"text-align: left;\">Contract your tricep and push the dumbbell back and up, until your arm is fully extended. Keep your upper arm in a fixed position throughout.<b> Second Position</b>.</li><li style=\"text-align: left;\">Slow and controlled, lower the dumbbell back into <b>First Position</b>.</li><li style=\"text-align: left;\">Finish your reps.</li><li style=\"text-align: left;\">Repeat for your other arm.</li></ol><p style=\"text-align: left;\">There's no place for egos in the gym. Always lift with a weight that's comfortable and controllable. If you experience any pain, put your safety first and stop.</p>",
        "female":{
            "image":"https://cdni.gs.lightning-e.com/media/5c0e6814ee0147fd16ef61d2-femalesinglearmkickbacksthumbnail.jpg"
        },
        "male":{
            "image":"https://cdni.gs.lightning-e.com/media/5c0e516f72fc52b810eb7f57-malesinglearmkickbackthumbnail.jpg"
        },
        "bodyAreas":[
            "Arms",
            "Triceps"
        ]
    }
function App() {
  return (
   <div className="app-container">
     <div className="title-bar">
       <h1 className="title is-1">Workout.</h1>
     </div>
     <div className="content-container">
         <FilterContainer/>
         <WorkoutCard workout={workoutTest} gender="male"/>
     </div>
   </div>
  );
}

export default App;
