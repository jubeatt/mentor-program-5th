import styled from "styled-components";
import defaultButton from "../components/commonStyle";
import React from "react";
import PropTypes from "prop-types";

const TodoHeaderWrapper = styled.div`
  margin-bottom: 30px;
`;

const TodoInputBlock = styled.form`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  margin-right: 20px;
  border-radius: 4px;
  border: 1px solid #c7c7c7;
  padding: 8px;

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }
`;

const BlueButton = styled.button`
  ${defaultButton}
  border-color: ${({ theme }) => theme.blue};
  color: ${({ theme }) => theme.blue};
  
  &:hover {
    background-color: ${({ theme }) => theme.blue};
    color: white;
  }
`;

export default class TodoHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
    };
  }

  handleInput = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { handleAddTodo } = this.props;
    if (this.state.inputValue) {
      handleAddTodo(this.state.inputValue);
      this.setState({
        inputValue: "",
      });
    }
  };

  render() {
    return (
      <TodoHeaderWrapper onSubmit={this.handleSubmit}>
        <TodoInputBlock>
          <Input
            value={this.state.inputValue}
            onChange={this.handleInput}
          ></Input>
          <BlueButton>送出</BlueButton>
        </TodoInputBlock>
      </TodoHeaderWrapper>
    );
  }
}

TodoHeader.propTypes = {
  handleAddTodo: PropTypes.func,
};
