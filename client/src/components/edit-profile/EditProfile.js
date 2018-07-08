import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dateOfBirth: '',
      gender: '',
      location: '',
      education: '',
      skills: '',
      githubusername: '',
      bio: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      const skillsCSV = profile.skills.join(',');

      profile.name = !isEmpty(profile.name) ? profile.name : '';
      profile.dateOfBirth = !isEmpty(profile.dateOfBirth) ? profile.dateOfBirth : '';
      profile.gender = !isEmpty(profile.gender) ? profile.gender : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.education = !isEmpty(profile.education) ? profile.education : '';
      profile.skills = !isEmpty(profile.skills) ? profile.skills : '';
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';

      this.setState({
        name: profile.name,
        dateOfBirth: profile.dateOfBirth ,
        age: profile.age,
        gender: profile.gender,
        location: profile.location,
        education: profile.education,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      name: this.state.name,
      dateOfBirth: this.state.dateOfBirth,
      age: this.state.age,
      gender: this.state.gender,
      location: this.state.location,
      education: this.state.education,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Automobile Engineering', value: 'Automobile Engineering' },
      { label: 'Civil Engineering', value: 'Civil Engineering' },
      { label: 'Environmental Engineering', value: 'Environmental Engineering' },
      { label: 'Electronics & Communication Engg.', value: 'Electronics & Communication Engg.' },
      { label: 'Electricals & Electronics Engg.', value: 'Electricals & Electronics Engg.' },
      { label: 'Industrial Production Engg.', value: 'Industrial Production Engg.' },
      { label: 'Information Science & Engg.', value: 'Information Science & Engg.' },
      { label: 'Mechanical Engineering', value: 'Mechanical Engineering' },
      { label: 'Others', value: 'Others' }
    ];

    const genderOptions = [
      { label: '* Select your Gender', value: 0 },
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Transgender', value: 'transgender' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <h6>Profile Name: </h6>
                  <TextFieldGroup
                    placeholder="* Profile Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                    info="A unique name for your profile URL. Your full name."
                  />
                <h6>Date of Birth: </h6>
                  <TextFieldGroup
                    name="dateOfBirth"
                    type="date"
                    value={this.state.dateOfBirth}
                    onChange={this.onChange}
                    error={errors.dateOfBirth}
                  />
                <h6>Age: </h6>
                  <TextFieldGroup
                    placeholder="* Enter your age"
                    name="age"
                    value={this.state.age}
                    onChange={this.onChange}
                    error={errors.age}
                    info="Enter your age as number of years completed."
                  />
                  <h6>Select your Gender: </h6>
                    <SelectListGroup
                      placeholder="Select your gender"
                      name="gender"
                      value={this.state.gender}
                      onChange={this.onChange}
                      options={genderOptions}
                      error={errors.gender}
                      info="Provide your gender."
                    />
                <h6>Education Stream: </h6>
                  <SelectListGroup
                    placeholder="Education Qualification"
                    name="education"
                    value={this.state.education}
                    onChange={this.onChange}
                    options={options}
                    error={errors.education}
                    info="Provide your field of study."
                  />
                <h6>Residence: </h6>
                  <TextFieldGroup
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error={errors.location}
                    info="City or city & state suggested (eg. Mysuru, KA)"
                  />
                <h6>Skills: </h6>
                  <TextFieldGroup
                    placeholder="* Enter your skills"
                    name="skills"
                    value={this.state.skills}
                    onChange={this.onChange}
                    error={errors.skills}
                    info="Please use comma separated values (eg.
                      HTML, Auto CADD, CATIA, etc.)"
                  />
                <h6>Github Username: </h6>
                  <TextFieldGroup
                    placeholder="Github Username"
                    name="githubusername"
                    value={this.state.githubusername}
                    onChange={this.onChange}
                    error={errors.githubusername}
                    info="If you have a Github link, include your username"
                  />
                <h6>Bio: </h6>
                  <TextAreaFieldGroup
                    placeholder="Short Bio"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.onChange}
                    error={errors.bio}
                    info="Tell us a little about yourself and your interests."
                  />
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-info btn-block mt-4"
                  />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
