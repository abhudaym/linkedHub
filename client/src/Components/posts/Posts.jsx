import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../Layout/Spinner';
import Moment from 'react-moment';
import { addLike, removeLike, deletePost } from '../../actions/post';
import PostForm from './PostForm';

const Posts = ({
  getPosts,
  post: { posts, loading },
  auth,
  addLike,
  removeLike,
  deletePost,
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className='posts'>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Posts</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Welcome to the community
          </p>
          <PostForm />
          <div className='posts'>
            {posts.map((post) => (
              <div className='post bg-white p-1 my-1' key={post._id}>
                <div>
                  <a href='profile.html'>
                    <img className='round-img' src={post.avatar} alt='' />
                    <h4>{post.name}</h4>
                  </a>
                </div>
                <div>
                  <p className='my-1'>{post.text}</p>
                  <p className='post-date'>
                    Posted on <Moment format='DD/MM/YYYY'>{post.date}</Moment>
                  </p>
                  <button
                    onClick={(e) => addLike(post._id)}
                    type='button'
                    className='btn btn-light'>
                    <i className='fas fa-thumbs-up'></i>
                    <span> {post.likes.length}</span>
                  </button>
                  <button
                    onClick={(e) => removeLike(post._id)}
                    type='button'
                    className='btn btn-light'>
                    <i className='fas fa-thumbs-down'></i>
                  </button>
                  <a href={`/post/${post._id}`} className='btn btn-primary'>
                    Discussion{' '}
                    <span className='comment-count'>
                      {post.comments.length}
                    </span>
                  </a>
                  {!auth.loading && post.user === auth.user._id && (
                    <button
                      onClick={(e) => deletePost(post._id)}
                      type='button'
                      className='btn btn-danger'>
                      <i className='fas fa-times'></i>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getPosts,
  addLike,
  removeLike,
  deletePost,
})(Posts);
