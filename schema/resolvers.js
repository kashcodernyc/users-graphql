import { userList } from "../fakeData.js";
import { movieList } from "../fakeData.js";
import _ from 'lodash';

export const resolvers = {
    Query: {
        users: () => {
            if(userList) return { users: userList };
            return { message: "there was error fetching data"}
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
    },
    Mutation: {
        createUser: (parent, args) => {
            const user = args.input;
            const lastId = userList[userList.length - 1].id;
            user.id = lastId+1;
            userList.push(user);
            return user;
        },
        updateUsername: (parent, args) => {
            const { id, newUsername } = args.input;
            const updateUser = userList.find((user) => user.id === Number(id));
            updateUser.username = newUsername;
            return updateUser;
        },
        deleteUser: (parent, args) => {
            const id = args.id
            _.remove(userList, (user) => user.id === Number(id))
            return null;
        }
    },
    UsersResult: {
        __resolveType(obj){
            if(obj.users){
                return "UserSuccessfulResult"
            }
            if(obj.message){
                return "UsersErrorResult"
            }

            return null;

        },
    },
};

