import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';

class ProfileActions extends Component {
  render() {
    const { profile } = this.props.profile;
  return (
    <div>
      <div className="btn-group mb-4" role="group">
        <Link to={`/profile/${profile.name}`} className="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1" />
          View Profile
        </Link>
      </div>
      <div className="btn-group mb-4" role="group">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-graduation-cap text-info mr-1" />
          Edit Profile
        </Link>
      </div> 
    </div>
  );
}
};

// export default ProfileActions;

ProfileActions.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
                        mapStateToProps, 
                        { getCurrentProfile }
                      )(ProfileActions);
