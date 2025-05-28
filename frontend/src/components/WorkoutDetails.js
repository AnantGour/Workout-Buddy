import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()

  const handleClick = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{workout.createdAt}</p>

      {/* Display the image if it exists */}
      {workout.tutorialImageUrl && (
        <img 
          src={workout.tutorialImageUrl} 
          alt="Workout tutorial" 
          style={{ maxWidth: '100%', marginTop: '10px', borderRadius: '10px' }} 
        />
      )}

      <span onClick={handleClick} style={{ color: 'red', cursor: 'pointer' }}>delete</span>
    </div>
  )
}

export default WorkoutDetails
