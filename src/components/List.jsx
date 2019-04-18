import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';
import ListItem from './ListItem';

class List extends Component {
    state = {
        showForm: false,
        formValue: ''
    };

    inputChange = event => {
        this.setState({ formValue: event.target.value });
    };

    formSubmit = event => {
        const { formValue } = this.state;
        const { addToDo } = this.props;
        event.preventDefault();
        addToDo({ title: formValue });
        this.setState({ formValue: '' });
    };

    renderForm = () => {
        const { showForm, formValue } = this.state;
        if (showForm) {
            return (
                <main role="main" className="flex-shrink-0">
                    <form onSubmit={this.formSubmit}>
                        <div className="input-group flex-nowrap">
                            <div className="input-group-prepend">
                                <span
                                    className="input-group-text"
                                    id="addon-wrapping"
                                >
                                    #
                                </span>
                            </div>

                            <input
                                value={formValue}
                                onChange={this.inputChange}
                                id="toDoNext"
                                type="text"
                                className="form-control"
                                placeholder="Task"
                                aria-label="Task"
                                aria-describedby="addon-wrapping"
                            />
                            <label htmlFor="toDoNext">What Next?</label>
                            <button type="button" className="btn btn-primary">
                                Add
                            </button>
                        </div>
                    </form>
                </main>
            );
        }
    };

    renderToDo() {
        const { data } = this.props;
        const toDos = _.map(data, (value, key) => {
            return <ListItem key={key} todoId={key} todo={value} />;
        });
        if (!_.isEmpty(toDos)) {
            return toDos;
        }
        return (
            <div className="col s10 offset-s1 center-align">
                <h4>You have no more things ToDo!</h4>
            </div>
        );
    }

    componentWillMount() {
        this.props.fetchToDos();
    }

    render() {
        const { showForm } = this.state;
        return (
            <main role="main" className="flex-shrink-0">
                <div className="container">
                    <div className="fixed-action-btn">
                        <button
                            type="button"
                            onClick={() =>
                                this.setState({ showForm: !showForm })
                            }
                            className="btn-floating btn-large black darken-4"
                        >
                            {showForm ? (
                                <button
                                    type="button"
                                    className="large material-icons"
                                >
                                    -
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="large material-icons"
                                >
                                    +
                                </button>
                            )}
                        </button>
                    </div>
                    <div className="container">
                        {this.renderForm()}
                        {this.renderToDo()}
                    </div>
                </div>
            </main>
        );
    }
}

const mapStateToProps = ({ data }) => {
    return {
        data
    };
};

export default connect(
    mapStateToProps,
    actions
)(List);
