import React from 'react'
import PropTypes from 'prop-types'
import { BlogPostTemplate } from '../../templates/blog-post'

const BlogPostPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(['data', 'tags'])
  return (
    <BlogPostTemplate
      content={widgetFor('body')}
      description={entry.getIn(['data', 'description'])}
      tags={tags && tags.toJS()}
      title={entry.getIn(['data', 'title'])}
    />
  )
}

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BlogPostPreview

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