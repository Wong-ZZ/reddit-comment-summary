import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Display from './Display';
import { getPastQueries } from './requests/request';

export interface PostInfo {
  id: number;
  num_comments: number;
  poster: string;
  queried_at: string;
  submission_id: string;
  subreddit: string;
  title: string;
  wordcloud_url: string;
}

interface MainState {
  postID: string;
  display: PostInfo[];
}

class Main extends React.Component<{}, MainState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      postID: '',
      display: [],
    };
  }

  public render(): JSX.Element {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Reddit Post ID</Form.Label>
          <Row>
            <Col />
            <Col>
              <Form.Control placeholder="Enter a post ID" onChange={this.handleChange} />
            </Col>
            <Col />
          </Row>
        </Form.Group>
        <Button variant="primary" onClick={this.handleClick}>
          Submit
        </Button>
        <Display queries={this.state.display} />
      </Form>
    );
  }

  private handleClick: () => void = () => {
    // const postsInfo = postQuery(this.state.postID);
  };

  private handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
    const fieldValue = event.target.value;
    getPastQueries(fieldValue).then((postsInfo) => this.setState({ display: postsInfo }));
    this.setState({ postID: fieldValue });
  };
}

export default Main;
