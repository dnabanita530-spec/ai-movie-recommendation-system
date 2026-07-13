import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MovieCard from "../../components/MovieCard/MovieCard";
import { getMovies } from "../../services/movieService";

import "./BrowseMovies.css";

function BrowseMovies() {


const [movies, setMovies] = useState([]);

const [searchTerm, setSearchTerm] = useState("");

const [genre, setGenre] = useState("");

// const [language, setLanguage] = useState("");

const [ratingRange, setRatingRange] = useState([0,10]);

const [yearRange, setYearRange] = useState([1995,2026]);

const [sortBy, setSortBy] = useState("Popularity");
const [currentPage, setCurrentPage] = useState(1);

const moviesPerPage = 20;
  useEffect(() => {

    loadMovies();

  }, []);

  const loadMovies = async () => {

    try {

      const data = await getMovies();

      setMovies(data);
     
console.log("Data is:",data);
    } catch (error) {

      console.error(error);

    }

  };

const filteredMovies = movies
.filter((movie)=>{

  

const movieYear =
movie.release_date
? Number(movie.release_date.split("-")[0])
:1995;

const movieRating =
Number(movie.rating)||0;

return (

movie.title
.toLowerCase()
.includes(searchTerm.toLowerCase())

&&

(!genre ||
movie.genres.includes(genre))

&&

movieRating>=ratingRange[0]

&&

movieRating<=ratingRange[1]

&&

movieYear>=yearRange[0]

&&

movieYear<=yearRange[1]

);

})
.sort((a,b)=>{

switch(sortBy){

case "Rating":

return (b.rating||0)-(a.rating||0);

case "Newest":

return new Date(b.release_date)-new Date(a.release_date);

case "A-Z":

return a.title.localeCompare(b.title);

case "Popularity":
return (b.rating || 0) - (a.rating || 0);

default:
return 0;

}

});

const indexOfLastMovie = currentPage * moviesPerPage;

const indexOfFirstMovie =
  indexOfLastMovie - moviesPerPage;

const currentMovies =
  filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

const totalPages = Math.ceil(
  filteredMovies.length / moviesPerPage
);
const genres = [
  ...new Set(
    movies.flatMap(movie =>
      movie?.genres
        ? movie.genres.split("|")
        : []
    )
  )
].sort();
// const languageMap = {
//   en: "English",
//   fr: "French",
//   it: "Italian",
//   hu: "Hungarian"
// };
// const languageMap = {
//   en: "English",
//   hi: "Hindi",
//   bn: "Bengali",
//   ta: "Tamil",
//   te: "Telugu",
//   ml: "Malayalam",
//   kn: "Kannada",
//   mr: "Marathi",
//   gu: "Gujarati",
//   pa: "Punjabi",
//   ur: "Urdu",
//   es: "Spanish",
//   fr: "French",
//   de: "German",
//   it: "Italian",
//   ja: "Japanese",
//   ko: "Korean",
//   zh: "Chinese",
//   ru: "Russian",
//   pt: "Portuguese",
//   ar: "Arabic",
//   tr: "Turkish",
//   nl: "Dutch",
//   sv: "Swedish",
//   pl: "Polish",
//   th: "Thai",
//   id: "Indonesian",
//   vi: "Vietnamese"
// };

// const languages = [
//   ...new Set(
//     movies
//       .filter(movie => movie.language)
//       .map(movie => movie.language)
//   )
// ];
useEffect(() => {

  // eslint-disable-next-line react-hooks/set-state-in-effect
  setCurrentPage(1);

}, [
  searchTerm,
  genre,
  ratingRange,
  yearRange,
  sortBy
]);
  return (

    <div className="browsePage">

<div className="filters">

  <h2>Filters</h2>

  {/* Genre */}

  <div className="filterGroup">

    <h3>Genres</h3>

    <select
      value={genre}
      onChange={(e) =>
        setGenre(e.target.value)
      }
    >
      <option value="">
        All Genres
      </option>

      {genres.map(g => (

        <option
          key={g}
          value={g}
        >
          {g}
        </option>

      ))}

    </select>

  </div>

  {/* Year */}

  <div className="filterGroup">

    <h3>Year</h3>

    <input
  type="range"
  min="1995"
  max="2026"
  value={yearRange[1]}
  onChange={(e)=>
    setYearRange([
      1995,
      Number(e.target.value)
    ])
  }
/>

<p>
1995 - {yearRange[1]}
</p>

  </div>

  {/* Rating */}

  <div className="filterGroup">

    <h3>Rating</h3>

   <input
type="range"
min="0"
max="10"
step="0.1"
value={ratingRange[1]}
onChange={(e)=>
setRatingRange([
0,
Number(e.target.value)
])
}
/>

<p>
0 ⭐ - {ratingRange[1].toFixed(1)} ⭐
</p>

  </div>

  {/* Language */}

  {/* <div className="filterGroup">

    <h3>Language</h3>

    <select
      value={language}
      onChange={(e) =>
        setLanguage(e.target.value)
      }
    >
      <option value="">
        All Languages
      </option>

      {languages.map(lang => (

        <option
          key={lang}
          value={lang}
        >
          {languageMap[lang] || lang}
        </option>

      ))}

    </select>

  </div> */}

</div>
      {/* <div className="filterGroup">

  <h3>Language</h3>

  <select
    value={language}
    onChange={(e) => setLanguage(e.target.value)}
  >
    <option value="">
      All Languages
    </option>

    <option value="English">
      English
    </option>

    <option value="Hindi">
      Hindi
    </option>

    <option value="Bengali">
      Bengali
    </option>

  </select>

</div> */}


      <div className="moviesContainer">

        <div className="moviesHeader">

  <h1>Browse Movies</h1>
  <input
  type="text"
  placeholder="Search movies..."
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm(e.target.value)
  }
/>

 <select
value={sortBy}
onChange={(e)=>
setSortBy(e.target.value)
}
>

<option value="Popularity">
Popularity
</option>

<option value="Rating">
Rating
</option>

<option value="Newest">
Newest
</option>

<option value="A-Z">
A-Z
</option>

</select>

</div>

        <div className="movieGrid">

          {currentMovies.map((movie) => (

            <Link
              key={movie.movieId}
              to={`/movies/${movie.movieId}`}
              className="movieLink"
            >

              <MovieCard movie={movie} />

            </Link>

          ))}

        </div>
        <div className="pagination">

  <button
    disabled={currentPage === 1}
    onClick={() =>
      setCurrentPage(currentPage - 1)
    }
  >
    ← Previous
  </button>

  <span className="pageInfo">

    Page {currentPage} of {totalPages}

  </span>

  <button
    disabled={currentPage === totalPages}
    onClick={() =>
      setCurrentPage(currentPage + 1)
    }
  >
    Next →
  </button>

</div>

      </div>

    </div>

  );
}

export default BrowseMovies;
















// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";

// import MovieCard from "../../components/MovieCard/MovieCard";
// import { getMovies } from "../../services/movieService";

// import "./BrowseMovies.css";

// function BrowseMovies() {

//   const [movies, setMovies] = useState([]);

//   const [searchTerm, setSearchTerm] = useState("");

//   const [genre, setGenre] = useState("");

//   const [language, setLanguage] = useState("");

//   const [rating, setRating] = useState(0);

//   const [year, setYear] = useState(2026);

//   const [sortBy, setSortBy] = useState("Popularity");

//   useEffect(() => {

//     loadMovies();

//   }, []);

//   const loadMovies = async () => {

//     try {

//       const data = await getMovies();

//       setMovies(data);

//     } catch (err) {

//       console.log(err);

//     }

//   };

//   const genres = [

//     ...new Set(

//       movies.flatMap(movie =>

//         movie.genres

//           ? movie.genres.split("|")

//           : []

//       )

//     )

//   ].sort();

//   const languageMap = {

//     en:"English",

//     hi:"Hindi",

//     bn:"Bengali",

//     ta:"Tamil",

//     te:"Telugu",

//     ml:"Malayalam",

//     kn:"Kannada",

//     mr:"Marathi",

//     gu:"Gujarati",

//     pa:"Punjabi",

//     ur:"Urdu",

//     fr:"French",

//     es:"Spanish",

//     de:"German",

//     it:"Italian",

//     ja:"Japanese",

//     ko:"Korean",

//     zh:"Chinese",

//     ru:"Russian",

//     pt:"Portuguese",

//     ar:"Arabic",

//     tr:"Turkish",

//     nl:"Dutch",

//     sv:"Swedish",

//     pl:"Polish",

//     th:"Thai",

//     id:"Indonesian",

//     vi:"Vietnamese"

//   };

//   const languages = Object.keys(languageMap);

//   const filteredMovies = useMemo(() => {

//     let filtered = [...movies];

//     filtered = filtered.filter(movie => {

//       const movieYear =

//         movie.release_date

//           ? Number(movie.release_date.split("-")[0])

//           : 0;

//       return (

//         movie.title

//           .toLowerCase()

//           .includes(searchTerm.toLowerCase())

//         &&

//         (!genre ||

//           movie.genres.includes(genre))

//         &&

//         (!language ||

//           movie.language === language)

//         &&

//         (Number(movie.rating || 0) >= rating)

//         &&

//         (movieYear <= year)

//       );

//     });

//     switch(sortBy){

//       case "Rating":

//         filtered.sort(

//           (a,b)=>

//           (b.rating||0)-(a.rating||0)

//         );

//         break;

//       case "Newest":

//         filtered.sort(

//           (a,b)=>

//           new Date(b.release_date)-

//           new Date(a.release_date)

//         );

//         break;

//       case "A-Z":

//         filtered.sort(

//           (a,b)=>

//           a.title.localeCompare(b.title)

//         );

//         break;

//       default:

//         break;

//     }

//     return filtered;

//   },[

//     movies,

//     searchTerm,

//     genre,

//     language,

//     rating,

//     year,

//     sortBy

//   ]);

//   return (

//     <div className="browsePage">

//       {/* Filters */}

//       <div className="filters">

//         <h2>🎬 Filters</h2>

//         <div className="filterGroup">

//           <h3>Genre</h3>

//           <select
//             value={genre}
//             onChange={(e)=>setGenre(e.target.value)}
//           >

//             <option value="">All Genres</option>

//             {genres.map(g=>(

//               <option
//                 key={g}
//                 value={g}
//               >
//                 {g}
//               </option>

//             ))}

//           </select>

//         </div>

//         <div className="filterGroup">

//           <h3>Minimum Rating</h3>

//           <select
//             value={rating}
//             onChange={(e)=>setRating(Number(e.target.value))}
//           >

//             <option value="0">All</option>

//             <option value="9">9+</option>

//             <option value="8">8+</option>

//             <option value="7">7+</option>

//             <option value="6">6+</option>

//           </select>

//         </div>

//         <div className="filterGroup">

//           <h3>Release Year</h3>

//           <input

//             type="range"

//             min="1990"

//             max="2026"

//             value={year}

//             onChange={(e)=>

//               setYear(Number(e.target.value))

//             }

//           />

//           <p>{year}</p>

//         </div>

//         <div className="filterGroup">

//           <h3>Language</h3>

//           <div className="languageChips">

//             <button

//               className={!language ? "active" : ""}

//               onClick={()=>setLanguage("")}

//             >

//               All

//             </button>

//             {languages.map(lang=>(

//               <button

//                 key={lang}

//                 className={

//                   language===lang

//                   ? "active"

//                   : ""

//                 }

//                 onClick={()=>setLanguage(lang)}

//               >

//                 {languageMap[lang]}

//               </button>

//             ))}

//           </div>

//         </div>

//       </div>

//       {/* Movies */}

//       <div className="moviesContainer">

//         <div className="moviesHeader">

//           <h1>Browse Movies</h1>

//           <input

//             type="text"

//             placeholder="🔍 Search movies..."

//             value={searchTerm}

//             onChange={(e)=>

//               setSearchTerm(e.target.value)

//             }

//           />

//           <select

//             value={sortBy}

//             onChange={(e)=>

//               setSortBy(e.target.value)

//             }

//           >

//             <option>Popularity</option>

//             <option>Rating</option>

//             <option>Newest</option>

//             <option>A-Z</option>

//           </select>

//         </div>

//         <div className="movieGrid">

//           {filteredMovies.length===0 ? (

//             <h2>

//               No movies found 😔

//             </h2>

//           ) : (

//             filteredMovies.map(movie=>(

//               <Link

//                 key={movie.movieId}

//                 to={`/movies/${movie.movieId}`}

//                 className="movieLink"

//               >

//                 <MovieCard movie={movie}/>

//               </Link>

//             ))

//           )}

//         </div>

//       </div>

//     </div>

//   );

// }

// export default BrowseMovies;