import {IBlogApp} from "src/model/blog/BlogApp";
import {Reaction} from "src/model/blog/types";
import {ClassMiddleware, Controller, Delete, Get, Post} from "@overnightjs/core";
import {Endpoint, injectHelpers} from "src/middleware/injectHelpers";
import {DeleteReactionViewModel} from "src/viewModel/blogViewModels";
import {httpStatusCode} from "src/constants";

export const blogRoute = "api/blog";
export const reactionRoute = `reaction`;

@Controller(blogRoute)
@ClassMiddleware(injectHelpers)
export class BlogController {
    
    constructor(private app: IBlogApp){};
    
    @Post(reactionRoute)
    public insertReaction: Endpoint = (req, {unwrap}) => {
        const {type, idArticle, idUser} = req.body;
        
        const result = this.app.createReaction({type, idArticle, idUser} as Reaction);
        return unwrap(result);
    };
    
    @Get(`${reactionRoute}/:idUser`)
    public listReactions: Endpoint = (req, {unwrap}) => {
        const {idUser} = req.params;
        
        const result = this.app.listReactionsByUser(idUser);
        return unwrap(result);
    };
    
    @Delete(reactionRoute)
    public removeReaction: Endpoint = (req, {unwrap}) => {
        const {idArticle, idUser} = req.body as DeleteReactionViewModel;
        
        const result = this.app.deleteReaction(idUser, idArticle);
        return unwrap(result, httpStatusCode.success);
    };
}
