import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { SubmissionInfo } from './Main';

interface IndividualCardProps {
  query: SubmissionInfo;
  index: string;
  handleDisplayQuery: (s: SubmissionInfo) => void;
  getDHMS: (date: number) => string;
}

class IndividualCard extends React.Component<IndividualCardProps, {}> {
  public constructor(props: IndividualCardProps) {
    super(props);
  }

  public render(): JSX.Element {
    const query = this.props.query;
    const title = query.title;
    const poster = query.poster;
    const subreddit = query.subreddit;
    const queriedAt = Date.parse(query.queried_at);
    const date = new Date(queriedAt);
    const dhms = this.props.getDHMS(queriedAt);
    const commentCount = query.num_comments;

    return (
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {`Submitted by /u/${poster} on /r/${subreddit}`}
            <br />
            {`Comment count: ${commentCount}`}
          </Card.Text>
          <Button variant="primary" onClick={this.onClick}>
            Summary
          </Button>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{`Queried ${dhms} on ${date.toString()}`}</small>
        </Card.Footer>
      </Card>
    );
  }

  private onClick: () => void = () => {
    this.props.handleDisplayQuery(this.props.query);
  };
}

export default IndividualCard;
