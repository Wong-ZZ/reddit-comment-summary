import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { PostInfo } from './Main';

interface IndividualCardProps {
  query: PostInfo;
  index: string;
}

class IndividualCard extends React.Component<IndividualCardProps, {}> {
  public constructor(props: IndividualCardProps) {
    super(props);
  }

  public render(): JSX.Element {
    const query = this.props.query;
    const title = query['title'];
    const poster = query['poster'];
    const subreddit = query['subreddit'];
    const queriedAt = Date.parse(query['queried_at']);
    const date = new Date(queriedAt);
    const dhms = this.getDHMS(queriedAt);
    const commentCount = query['num_comments'];
    const wordcloudURL = query['wordcloud_url'];

    return (
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {`Submitted by /u/${poster} on /r/${subreddit}`}
            <br />
            {`Comment count: ${commentCount}`}
          </Card.Text>
          <Button variant="primary" href={wordcloudURL}>
            Wordcloud
          </Button>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{`Queried ${dhms} on ${date.toString()}`}</small>
        </Card.Footer>
      </Card>
    );
  }

  private getDHMS(date: number): string {
    let toReturn = '';
    let seconds = (Date.now() - date) / 1000;
    const days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    const hrs = Math.floor(seconds / 3600);
    seconds -= hrs * 3600;
    const mnts = Math.floor(seconds / 60);
    seconds -= mnts * 60;
    if (days) {
      toReturn = `${days} days ago`;
      if (days === 1) toReturn = toReturn.replace('s', '');
    } else if (hrs) {
      toReturn = `${hrs} hours ago`;
      if (hrs === 1) toReturn = toReturn.replace('s', '');
    } else if (mnts) {
      toReturn = `${mnts} minutes ago`;
      if (mnts === 1) toReturn = toReturn.replace('s', '');
    } else {
      toReturn = `${seconds} seconds ago`;
      if (seconds <= 1) toReturn = toReturn.replace('s', '');
    }
    return toReturn;
  }
}

export default IndividualCard;
