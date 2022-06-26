import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./data-source";
import { UserResolver } from "./UserResolver";

AppDataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!");

        const app = express();
        app.get('/', (_req, res) => res.send("hello"));

        const apolloServer = new ApolloServer({
            schema: await buildSchema({
                resolvers: [UserResolver]
            })
        });

        await apolloServer.start();

        apolloServer.applyMiddleware({ app });

        app.listen(4000, () => {
            console.log("express server started");
        });

    })
    .catch((err) => {
        console.error("Error during Data Source initilization: ", err);
    })

/** Code init by tutorial */
// (async() => {

//     const app = express();
//     app.get('/', (_req, res) => res.send("hello"));

//     const apolloServer = new ApolloServer({
//         schema: await buildSchema({
//             resolvers: [UserResolver]
//         })
//     });

//     await AppDataSource.initialize();
//     await apolloServer.start();

//     apolloServer.applyMiddleware({ app });

//     app.listen(4000, () => {
//         console.log("express server started");
//     });

// })(
// );


/** Default code */
// AppDataSource.initialize().then(async () => {

//     console.log("Inserting a new user into the database...")
//     const user = new User()
//     user.firstName = "Timber"
//     user.lastName = "Saw"
//     user.age = 25
//     await AppDataSource.manager.save(user)
//     console.log("Saved a new user with id: " + user.id)

//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(User)
//     console.log("Loaded users: ", users)

//     console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))
