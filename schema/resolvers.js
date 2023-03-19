import { userList } from "../fakeData.js";
import { movieList } from "../fakeData.js";

export const resolvers = {
    Query: {
        users: () => {
            return userList;
        },
        user: (parent, args) => {
            const id = args.id;
            return userList.find((user) => user.id === Number(id));
        },
        movies:  () => {
            return movieList;

        },
        movie: (parent, args) => {
            const movieName = args.name;
            return movieList.find((movie) => movie.name === movieName);
        }
    },
    User: {
        favoriteMovies: () => {
            return movieList.filter((movie) => movie.isInTheaters === true)
        }
    }
};

