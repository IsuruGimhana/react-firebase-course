import './App.css';
import { Auth } from './components/auth';
import { db, auth } from './config/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

function App() {

  const [movies, setMovies] = useState([]);
  const moviesCollectionRef = collection(db, 'movies');

  //new movie states
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newMovieReleaseDate, setNewMovieReleaseDate] = useState(0);
  const [newMovieReceivedAnOscar, setNewMovieReceivedAnOscar] = useState(false);

  //update title states
  const [updateMovieTitle, setUpdateMovieTitle] = useState('');

  const getMovies = async () => {
    try {
      const moviesSnapshot = await getDocs(moviesCollectionRef);
      console.log(moviesSnapshot)
      // console.log(moviesSnapshot.docs.map(doc => (doc.data())))
      // ... --> spread operator {to create a copy of the object}
      const filteredMovies = moviesSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMovies(filteredMovies);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newMovieReleaseDate,
        receivedAnOscar: newMovieReceivedAnOscar,
        userId: auth?.currentUser?.uid
      });
      setNewMovieTitle('');
      setNewMovieReleaseDate(0);
      setNewMovieReceivedAnOscar(false);
      getMovies();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, 'movies', id);
      await deleteDoc(movieDoc);
      getMovies();
    } catch (err) {
      console.error(err);
    }
  }

  const updateMovie = async (id) => {
    try {
      const movieDoc = doc(db, 'movies', id);
      await updateDoc(movieDoc, {
        title: updateMovieTitle
      });
      setUpdateMovieTitle('');
      getMovies();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="App">
      <Auth />

      <div>
        <input 
        type='text' 
        placeholder='Movie Title' 
        value={newMovieTitle}
        onChange={(e) => setNewMovieTitle(e.target.value)} />
        <input 
        type='number' 
        placeholder='Release Date' 
        value={newMovieReleaseDate}
        onChange={(e) => setNewMovieReleaseDate(Number(e.target.value))} />
        <input 
        type="checkbox" 
        checked={newMovieReceivedAnOscar}
        onChange={(e) => setNewMovieReceivedAnOscar(e.target.checked)} />
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h2 style={{color: movie.receivedAnOscar ? 'green' : 'red'}}>{movie.title}</h2>
            <p>Date: {movie.releaseDate}</p>

            <button onClick={() => deleteMovie(movie.id)}>Delete</button>
            <input 
            placeholder='New Title' 
            onChange={(e) => setUpdateMovieTitle(e.target.value)} />
            <button onClick={() => updateMovie(movie.id)}
            >Update Title</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
