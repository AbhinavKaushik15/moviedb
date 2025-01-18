import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDY5MzkyNTBlMjU5MDUzZGJjYWFmY2JlZjg3ZGFjZSIsIm5iZiI6MTczMDAwMzA4NC4xNzU1NzUsInN1YiI6IjY2Y2MxY2I0YWNjYTQ2OGFhZjBlYzU4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OlHgVFtYGkUwWfhj41yIXxdguDpxkF_yTt0EBLtyv4Y'
      },
})

export default instance;