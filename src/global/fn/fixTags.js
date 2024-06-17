export const fixTags = (tags)=>{
        tags=tags?tags.trim():""
        if(tags == "null" || tags=="")
            return "No Tags"
        return tags
    }  