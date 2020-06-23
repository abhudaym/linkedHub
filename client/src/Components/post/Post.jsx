import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { getPost } from '../../actions/post';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner';
import CommentForm from './CommentForm';
import { addComment, deleteComment } from '../../actions/post';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import auth from '../../reducers/auth';

const Post = ({ getPost, post: { post, loading }, match, deleteComment, auth }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <section className='container'>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <div className='post bg-white p-1 my-1'>
        <div>
          <Link to={`/profile/${post.user}`}>
            <img className='round-img' src={post.avatar} alt='' />
            <h4>{post.name}</h4>
          </Link>
        </div>
        <div>
          <p className='my-1'>{post.text}</p>
        </div>
      </div>
      
      <CommentForm postId={post._id} />

      {post.comments.map((comment) => (
        <div className='comments'>
          <div className='post bg-white p-1 my-1'>
            <div>
              <a href='profile.html'>
                <img
                  className='round-img'
                  src={comment.avatar}
                  alt=''
                />
                <h4>{comment.name}</h4>
              </a>
            </div>
            <div>
              <p className='my-1'>{comment.text}</p>
              <p className='post-date'>Posted on <Moment format='HH:MM DD/MM/YYYY'>{comment.date}</Moment></p>
              {!auth.loading && comment.user === auth.user._id && (
                <button onClick={e => deleteComment(post._id, comment._id)} className='btn btn-danger'>
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPost, deleteComment })(Post);
