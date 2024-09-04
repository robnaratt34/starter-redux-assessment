import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSuggestion,
  selectError,
  selectLoading,
  selectSuggestion, // Task 18: Import the `selectSuggestion()` selector from the suggestion slice
} from './suggestion.slice';
import './suggestion.css';

export default function Suggestion() {
  const suggestion = useSelector(selectSuggestion); // Task 19: Call useSelector() with the selectSuggestion() selector
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadSuggestion() {
      dispatch(fetchSuggestion()); // Task 20: Dispatch the fetchSuggestion() action creator
    }
    loadSuggestion();
  }, [dispatch]);

  let render;
  if (loading) {
    render = <h3>Loading...</h3>;
  } else if (error) {
    render = <h3>Sorry, we're having trouble loading the suggestion.</h3>;
  } else if (suggestion) { // Added a check for `suggestion` to handle cases where it's undefined
    const { imageUrl, caption } = suggestion; // Destructure the suggestion object
    render = (
        <>
          <img alt={caption} src={imageUrl} /> {/* Task 21: Enable the two JSX lines needed to display the suggestion on the page */}
          <p>{caption}</p>
        </>
    );
  } else {
    render = <p>No suggestion available.</p>; // Handling case when no suggestion is available
  }

  return (
      <section className="suggestion-container">
        <h2>Suggestion of the Day</h2>
        {render}
      </section>
  );
}
