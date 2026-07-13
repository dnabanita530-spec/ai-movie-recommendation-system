import { useEffect, useState } from "react";

import {
  addMovieApi,
  deleteMovieApi,
  updateMovie
} from "../../services/adminMovieService";
import {
  getMovies
} from "../../services/movieService";
import "./AdminMovies.css";

function AdminMovies() {

  const [movies, setMovies] =
    useState([]);

  const [search, setSearch] =
    useState("");
    const [showModal, setShowModal] =
  useState(false);
const [showAddModal,
  setShowAddModal] =
    useState(false);


const [selectedMovie, setSelectedMovie] =
  useState(null);
  const [newMovie,
  setNewMovie] =
    useState({

      movieId: "",

      title: "",

      genres: ""

    });

  useEffect(() => {

    loadMovies();

  }, []);

  const loadMovies = async () => {

    try {

      const data =
        await getMovies();

      setMovies(data);

    } catch (error) {

      console.error(error);

    }

  };

  const deleteMovie = async (id) => {

  const confirmDelete =
    window.confirm(
      "Delete this movie?"
    );

  if (!confirmDelete)
    return;

  try {

    await deleteMovieApi(id);

    const updated =
      movies.filter(
        movie =>
          movie.movieId !== id
      );

    setMovies(updated);

    alert(
      "Movie Deleted"
    );

  } catch (error) {

    console.error(error);

  }

};

 const editMovie = (movie) => {

  setSelectedMovie(movie);

  setShowModal(true);

};
const handleChange = (e) => {

  setSelectedMovie({

    ...selectedMovie,

    [e.target.name]:
      e.target.value

  });

};
const saveMovie = async () => {

  try {

    await updateMovie(

      selectedMovie.movieId,

      {
        title:
          selectedMovie.title,

        genres:
          selectedMovie.genres,

        rating:
          selectedMovie.rating,

        language:
          selectedMovie.language,

        release_date:
          selectedMovie.release_date,

        overview:
          selectedMovie.overview
      }

    );

    const updatedMovies =
      movies.map(movie =>

        movie.movieId ===
        selectedMovie.movieId

          ? selectedMovie

          : movie

      );

    setMovies(updatedMovies);

    setShowModal(false);

    alert(
      "Movie Updated Successfully"
    );

  } catch (error) {

    console.error(error);

    alert(
      "Failed to update movie"
    );

  }

};

  const filteredMovies =
    movies.filter(movie =>
      movie.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );
    const addMovie = async () => {

  try {

    await addMovieApi(
      newMovie
    );

    setMovies([

      ...movies,

      newMovie

    ]);

    setShowAddModal(
      false
    );

    alert(
      "Movie Added"
    );

  } catch (error) {

    console.error(error);

  }

};

  return (

    <div className="adminMoviesPage">

<div className="adminHeader">

  <h1>
    🎬 Movie Management
  </h1>

  <div className="headerRight">

    <button
      className="addMovieBtn"
      onClick={() =>
        setShowAddModal(true)
      }
    >
      ➕ Add Movie
    </button>

    <input
      type="text"
      className="searchBar"
      placeholder="Search movies..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />

  </div>

</div>
      {/* <button
  className="addMovieBtn"
  onClick={() =>
    setShowAddModal(true)
  }
>

  + Add Movie

</button> */}

      <table className="moviesTable">

        <thead>

          <tr>

            <th>ID</th>

            <th>Movie Title</th>

            <th>Genres</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {filteredMovies.map(
            (movie) => (

              <tr
                key={
                  movie.movieId
                }
              >

                <td>
                  {movie.movieId}
                </td>

                <td>
                  {movie.title}
                </td>

                <td>
                  {movie.genres}
                </td>

                <td>

                  <button
                    className="editBtn"
                    onClick={() =>
                      editMovie(
                        movie
                      )
                    }
                  >
                    ✏ Edit
                  </button>

                  <button
                    className="deleteBtn"
                    onClick={() =>
                      deleteMovie(
                        movie.movieId
                      )
                    }
                  >
                    🗑 Delete
                  </button>

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>
      {showModal && selectedMovie && (

  <div className="modalOverlay">

    <div className="modalBox">

      <h2>
        Edit Movie
      </h2>

      <input
        name="title"
        value={
          selectedMovie.title
        }
        onChange={
          handleChange
        }
      />

      <input
        name="genres"
        value={
          selectedMovie.genres
        }
        onChange={
          handleChange
        }
      />

      <input
        name="rating"
        value={
          selectedMovie.rating || ""
        }
        onChange={
          handleChange
        }
      />

      <input
        name="language"
        value={
          selectedMovie.language || ""
        }
        onChange={
          handleChange
        }
      />

      <input
        name="release_date"
        value={
          selectedMovie.release_date || ""
        }
        onChange={
          handleChange
        }
      />

      <textarea
        name="overview"
        rows="5"
        value={
          selectedMovie.overview || ""
        }
        onChange={
          handleChange
        }
      />

      <div className="modalButtons">

        <button
          className="saveBtn"
          onClick={saveMovie}
        >
          Save Changes
        </button>

        <button
          className="cancelBtn"
          onClick={() =>
            setShowModal(false)
          }
        >
          Cancel
        </button>

      </div>

    </div>

  </div>

)}
{showAddModal && (

  <div className="modalOverlay">

    <div className="modalBox">

      <h2>
        Add Movie
      </h2>

      <input
        placeholder="Movie ID"
        onChange={(e)=>

          setNewMovie({

            ...newMovie,

            movieId:
              Number(
                e.target.value
              )

          })

        }
      />

      <input
        placeholder="Title"
        onChange={(e)=>

          setNewMovie({

            ...newMovie,

            title:
              e.target.value

          })

        }
      />

      <input
        placeholder="Genres"
        onChange={(e)=>

          setNewMovie({

            ...newMovie,

            genres:
              e.target.value

          })

        }
      />

      <div className="modalButtons">

        <button
          className="saveBtn"
          onClick={
            addMovie
          }
        >
          Save
        </button>

        <button
          className="cancelBtn"
          onClick={() =>
            setShowAddModal(false)
          }
        >
          Cancel
        </button>

      </div>

    </div>

  </div>

)}

    </div>

  );

}

export default AdminMovies;