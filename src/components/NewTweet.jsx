import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { addTweet as addTweetAction } from '../actions';
import Avatar from './Avatar';

const MAX_CHARS = 60; // TODO: Implement max for input

export class NewTweet extends Component {
  state = { text: '' }

  publishTweet() {
    const { addTweet } = this.props;
    const { text } = this.state;
    addTweet(text);
    this.setState({ text: '' });
  }

  render() {
    const { user } = this.props;
    if (!user || isEmpty(user)) {
      return null;
    }
    return (
      <div className="new-tweet">
        <Avatar src={user.avatar} />
        <input
          className="new-tweet-input"
          placeholder="What's happening?"
          data-testid="new-tweet-input"
          onChange={text => this.setState({ text })}
        />
        <button
          className="new-tweet-button"
          type="button"
          data-testid="new-tweet-button"
          onClick={this.publishTweet}
        >
          Tweet
        </button>
      </div>
    );
  }
}

NewTweet.propTypes = {
  user: PropTypes.object.isRequired,
  addTweet: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps, { addTweet: addTweetAction })(NewTweet);