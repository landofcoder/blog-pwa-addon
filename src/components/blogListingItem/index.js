import React from 'react';
import { Link } from '@magento/venia-drivers';
import RichText from '@landofcoder/yume-ui/src/components/RichText'

const BlogListingItem = props => {
    const { classes, item, simiBlogConfiguration } = props;
    const {
        title,
        identifier,
        short_content,
        image
    } = item;
    const imageExtensions = [
        "jpg",
        "png",
        "jpeg",
        "gif"
    ]
    const base_media_url = props.base_media_url!==undefined?props.base_media_url:"https://magento2.landofcoder.com/media/"
    let linkColor = '#1ABC9C';
    if (simiBlogConfiguration && simiBlogConfiguration.general && simiBlogConfiguration.general.font_color) {
        linkColor = simiBlogConfiguration.general.font_color;
    }
    let displayStyle = 1;
    if (simiBlogConfiguration && simiBlogConfiguration.general && simiBlogConfiguration.general.display_style) {
        displayStyle = parseInt(simiBlogConfiguration.general.display_style);
    }
    return (
        <div className={`${classes.blogpostItem} ${displayStyle === 1 ? classes.blogpostItemList : classes.blogpostItemGrid}`}>
            {image ? <div className={classes.blogpostItemCol1} >
                <img onError={(event) => {
                    if (image) {
                        const extension = image.split('.').pop()
                        if (imageExtensions.indexOf(extension)> -1) {
                            event.target.src = `${base_media_url+image}`
                        }
                        else {
                            event.target.src = "https://via.placeholder.com/300"
                        }
                    }
                    else {
                        event.target.src = "https://via.placeholder.com/300"
                    }
                }} src={image} alt={title} />
            </div> : console.log("SRC", image)}
            <div className={classes.blogpostItemCol2} >
                <h2>
                    <Link to={`/blog/post/${identifier}.html`} style={{ color: linkColor }}>
                        {title}
                    </Link>
                </h2>
                {/* <BlogPostInfo item={item} classes={classes} /> */}
                <div className={classes.blogpostDescription}>
                    <RichText classes={{ root: classes.blogpostDescriptionRichtext }} content={short_content} />
                </div>
                <Link to={`/blog/post/${identifier}.html`}>
                    <div className={classes.readMore}>
                        {'Read More'}
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default BlogListingItem