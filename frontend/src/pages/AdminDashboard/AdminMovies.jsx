
import { useEffect, useState } from "react";
import { deleteMovie, getAdminMovies, updateMovie } from "../../services/adminService";
import "./AdminMovies.css";


function AdminMovies() {

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);

const [pages, setPages] = useState(1);

const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);

const [selectedMovie, setSelectedMovie] = useState({

  movieId: "",

  title: "",

  genres: ""

});

 

    const loadMovies = async () => {

    const data = await getAdminMovies(

        page,

        search

    );

    setMovies(data.movies);

    setPages(data.pages);

};
 useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMovies();

}, [page]);
const handleEdit = (movie) => {

    setSelectedMovie(movie);

    setShowModal(true);

};

const handleSave = async () => {

    await updateMovie(

        selectedMovie.movieId,

        {

            title: selectedMovie.title,

            genres: selectedMovie.genres

        }

    );

    setShowModal(false);

    loadMovies();

};
    return (

        <div className="moviesPage">

            <h1>🎬 Movie Management</h1>
            <div className="searchBar">

<input

type="text"

placeholder="Search movie..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

<button

onClick={() => {

setPage(1);

loadMovies();

}}

>

Search

</button>

</div>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>

                        {/* <th>Poster</th> */}

                        <th>Title</th>

                        <th>Genres</th>

                        <th>⭐ Rating</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {movies.map(movie=>(

                        <tr key={movie.movieId}>

                            <td>{movie.movieId}</td>

                            {/* <td>

                                <img

                                  src={
                                    movie.poster ||
                                    "https://via.placeholder.com/70x100"
                                  }

                                  alt="poster"

                                  className="poster"

                                />

                            </td> */}

                            <td>{movie.title}</td>

                            <td>{movie.genres}</td>

                            <td>⭐ {movie.rating}</td>

                            <td>
  <div className="actionButtons">

    <button
      className="editBtn"
      onClick={() => handleEdit(movie)}
      title="Edit"
    >
      ✏️
    </button>

    <button
      className="deleteBtn"
      onClick={async () => {
        if (window.confirm("Delete this movie?")) {
          await deleteMovie(movie.movieId);
          loadMovies();
        }
      }}
      title="Delete"
    >
      🗑️
    </button>

  </div>
</td>

                        </tr>

                    ))}

                </tbody>

            </table>
            <div className="pagination">

<button

disabled={page===1}

onClick={()=>setPage(page-1)}

>

Previous

</button>

<span>

Page {page} of {pages}

</span>

<button

disabled={page===pages}

onClick={()=>setPage(page+1)}

>

Next

</button>

</div>
            {

showModal && (

<div className="modalOverlay">

<div className="modal">

<h2>Edit Movie</h2>

<label>Movie Title</label>

<input

value={selectedMovie.title}

onChange={(e)=>

setSelectedMovie({

...selectedMovie,

title:e.target.value

})

}

/>

<label>Genres</label>

<input

value={selectedMovie.genres}

onChange={(e)=>

setSelectedMovie({

...selectedMovie,

genres:e.target.value

})

}

/>

<div className="modalButtons">

<button

className="saveBtn"

onClick={handleSave}

>

Save

</button>

<button

className="cancelBtn"

onClick={()=>setShowModal(false)}

>

Cancel

</button>

</div>

</div>

</div>

)

}

        </div>

    );

}

export default AdminMovies;