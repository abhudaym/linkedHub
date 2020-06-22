import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPost } from '../../actions/post';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner';

const Post = ({getPost, post, match}) => {
    useEffect(()=> {
        getPost(match.params.id)
    } , [getPost] );

    console.log(post)
  return <div>Post</div>;
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    post: state.post,
})

export default connect(mapStateToProps, {getPost})(Post);
