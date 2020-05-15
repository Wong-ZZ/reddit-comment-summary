import React from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import PastQueriesTable from './PastQueriesTable';
import { SubmissionInfo } from '../searchDisplay/Main';

interface QueryDisplayProps {
  toDisplay: SubmissionInfo | null;
  backToSearch: () => void;
  getDHMS: (date: number) => string;
}

class QueryDisplay extends React.Component<QueryDisplayProps, {}> {
  public constructor(props: QueryDisplayProps) {
    super(props);
  }

  public render(): JSX.Element {
    if (!this.props.toDisplay) return <div />;
    const query = this.props.toDisplay;
    const title = query.title;
    const poster = query.poster;
    const subreddit = query.subreddit;
    const queriedAt = Date.parse(query.queried_at);
    const date = new Date(queriedAt);
    const dhms = this.props.getDHMS(queriedAt);
    const commentCount = query.num_comments;
    return (
      <Row className="QueryDisplay w-100 mx-0 px-0">
        <Col className="back-btn ml-3 mr-0 px-0 mt-3">
          <Button
            variant="primary"
            onClick={this.props.backToSearch}
            className="align-top float-left sticky-top"
          >
            {"<"}
          </Button>
        </Col>
        <Col className="col-8 main-display mt-3 mx-0 px-0">
          <Container>
            <Card className="bg-light">
              <Card.Header>
                <h4>{title}</h4>
              </Card.Header>
              <p>{`Submitted by /u/${poster} on /r/${subreddit}`}</p>
              <p>{`${commentCount} comments`}</p>
              <h6>Wordcloud</h6>
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />
              <p />

              <Image
                className="my-1 col-6 mx-auto"
                src={this.props.toDisplay.wordcloud_url}
                fluid={true}
              />
              <Card.Footer>
                <p>{`Queried ${dhms} on ${date.toString()}`}</p>
              </Card.Footer>
            </Card>
          </Container>
        </Col>
        <Col className="col-3 past-display mt-3 ml-3 mr-0 px-0">
          <PastQueriesTable currentDisplay={this.props.toDisplay.id} pastQueries={this.props.toDisplay.past_queries} getDHMS={this.props.getDHMS}/>
        </Col>
        
      </Row>
    );
  }
}

export default QueryDisplay;
