import { hash } from "bcryptjs";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "./entity/User";


@Resolver()
export class UserResolver {

    @Query(() => String)
    hello() {
        return 'hi!'
    }

    @Mutation(() => Boolean)
    async register(
        @Arg('email') email: string,
        @Arg('password') password: string

    ) {

        try {
            const hashedPassword = await hash(password, 12)
    
            await User.insert({
                email: email,
                password: hashedPassword
            });
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }
}