import React, { Component } from 'react';
import { connect } from 'react-redux';
import { completeToDo } from '../actions';

class ListItem extends Component {
    completeClick = completeTodoId => {
        const { completeToDo } = this.props;
        completeToDo(completeTodoId);
    };

    render() {
        const { todoId, todo } = this.props;
        return (
            <div className="card m-1" style={{ width: '18rem', float: 'left' }}>
                <div className="card-header">
                    <h5 className="card-title">{todo.title}</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                </ul>
                <div className="card-footer text-muted">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => this.completeClick(todoId)}
                    >
                        Complete Task
                    </button>
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    { completeToDo }
)(ListItem);
