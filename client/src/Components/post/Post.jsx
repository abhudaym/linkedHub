import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { getPost } from '../../actions/post';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner';
import CommentForm from './CommentForm';
import { addComment } from '../../actions/post';

const Post = ({ getPost, post: { post, loading }, match, addComment }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  const [text, setText] = useState('');

  return loading || post === null ? (
    <Spinner />
  ) : (
    <section className='container'>
      <a href='posts.html' className='btn'>
        Back To Posts
      </a>
      <div className='post bg-white p-1 my-1'>
        <div>
          <a href='profile.html'>
            <img className='round-img' src={post.avatar} alt='' />
            <h4>{post.name}</h4>
          </a>
        </div>
        <div>
          <p className='my-1'>{post.text}</p>
        </div>
      </div>

      <div className='post-form'>
        <div className='bg-primary p'>
          <h3>Leave a Comment</h3>
        </div>
        <form
          className='form my-1'
          onSubmit={(e) => {
            e.preventDefault();
            addComment(post._id, { text });
            setText('');
          }}>
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Create a post'
            value={text}
            onChange={(e) => setText(e.target.value)}
            required></textarea>
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
        </form>
      </div>

      {post.comments.map((comment) => (
        <div className='comments'>
          <div className='post bg-white p-1 my-1'>
            <div>
              <a href='profile.html'>
                <img
                  className='round-img'
                  src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
                  alt=''
                />
                <h4>John Doe</h4>
              </a>
            </div>
            <div>
              <p className='my-1'>{comment.text}</p>
              <p className='post-date'>Posted on 04/16/2019</p>
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
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost, addComment })(Post);
