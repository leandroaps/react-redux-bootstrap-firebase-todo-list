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

    componentWillMount() {
        this.props.fetchToDos();
    }

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
                        <label htmlFor="toDoNext">
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
                        </label>
                        <button type="button" className="btn btn-primary">
                            Add
                        </button>
                    </div>
                </form>
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
            <main role="main" className="flex-shrink-0">
                <h4>You have no more things ToDo!</h4>
            </main>
        );
    }

    render() {
        const { showForm } = this.state;
        return (
            <main role="main" className="flex-shrink-0">
                <div className="py-5 text-center">
                    <h1 className="display-4">Fluid To-Do</h1>
                    <p className="lead">
                        This is a modified jumbotron that occupies the entire
                        horizontal space of its parent.
                    </p>
                </div>
                <div className="py-5 text-center">
                    <button
                        type="button"
                        onClick={() => this.setState({ showForm: !showForm })}
                        className="btn btn-primary btn-lg"
                    >
                        {showForm ? (
                            <span>Hide form</span>
                        ) : (
                            <span>Show form</span>
                        )}
                    </button>
                    {this.renderForm()}
                </div>

                <div className="container">
                    <div className="container">{this.renderToDo()}</div>
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
