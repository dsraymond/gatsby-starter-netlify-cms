import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import ProductPagePreview from './preview-templates/ProductPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('products', ProductPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)

CMS.registerPreviewStyle('https://unpkg.com/netlify-cms-yoast-seo@~1.0/dist/main.css');

CMS.registerPreviewTemplate('page', createClass({
    render: function () {
        const entry = this.props.entry
        const title = entry.getIn(['data', 'title']) || ''

        YOAST.setContent({
            title: title,
            description: entry.getIn(['data', 'description']) || '',
            keyword: entry.getIn(['data', 'yoast_keyword']) || '',
            text: entry.getIn(['data', 'body']) || '',
            titleWidth: title.split('').length * 5 // 5px is an average width of each character ;)
        })

        return h('div', {},
            this.props.widgetFor('body'),
            YOAST.getScoresAsHTML(h)
        );
    }
}));
