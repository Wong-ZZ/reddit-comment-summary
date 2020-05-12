import React from 'react';
import { Button, Form } from 'react-bootstrap'

interface IMainProps {}

interface IMainState {
  postID: string
}

class Main extends React.Component<IMainProps,IMainState> {
  public constructor(props: IMainProps) {
    super(props);
    this.state = {
      postID: ""
    }
  }

  public render() {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Reddit Post ID</Form.Label>
          <Form.Control placeholder="Enter a post ID" onChange={this.handleChange}/>
        </Form.Group>
        <Button variant="primary" onClick={this.handleClick}>
          Submit
        </Button>
      </Form>
    );
  }

  private handleClick = () => console.log("test")

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldValue = event.target.value;
    this.setState({postID: fieldValue});
    console.log(this.state.postID)
  }
};

export default Main;
