import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import Display from './Display';
import QueryDisplay from '../queryDisplay/QueryDisplay';
import { getPastQueries, postQuery } from '../../requests/request';

export interface SubmissionInfo {
  id: number;
  num_comments: number;
  poster: string;
  queried_at: string;
  submission_id: string;
  subreddit: string;
  title: string;
  wordcloud_url: string;
  past_queries: PastQueryInfo[];
}

export interface PastQueryInfo {
  id: number;
  queried_at: string;
}

interface MainState {
  submissionID: string;
  searchQueries: SubmissionInfo[];
  showIndividualQuery: boolean;
  queryToDisplay: SubmissionInfo | null;
  isLoading: boolean;
}

class Main extends React.Component<{}, MainState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      submissionID: '',
      searchQueries: [],
      showIndividualQuery: false,
      queryToDisplay: null,
      isLoading: false
    };
    this.handleDisplayQuery = this.handleDisplayQuery.bind(this);
    this.backToSearch = this.backToSearch.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div className="w-100">
        {!this.state.showIndividualQuery && (
          <div>
            <InputGroup className="w-50 my-5 mx-auto">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Submission ID</InputGroup.Text>
            </InputGroup.Prepend>
              <Form.Control
                onKeyDown={this.handleEnter}
                placeholder="Enter a submission ID"
                onChange={this.handleChange}
              />
            </InputGroup>
            <Button variant="primary" onClick={this.handleClick} disabled={this.state.isLoading}>
              {this.state.isLoading ? "Loading..." : "Submit"}
            </Button>
            <Display
              queries={this.state.searchQueries}
              handleDisplayQuery={this.handleDisplayQuery}
              getDHMS={this.getDHMS}
            />
          </div>
        )}
        {this.state.showIndividualQuery && (
          <QueryDisplay
            toDisplay={this.state.queryToDisplay}
            backToSearch={this.backToSearch}
            getDHMS={this.getDHMS}
          />
        )}
      </div>
    );
  }

  private handleClick: () => void = () => {
    const submissionID = this.state.submissionID;
    if (submissionID === "" || this.state.isLoading) {
      return;
    }
    this.setState({ isLoading: true })
    postQuery(submissionID)
      .then((query) => {
        if (!query) {
          this.setState({ isLoading: false })
          return;
        }
        this.setState({ queryToDisplay: query, showIndividualQuery: true, isLoading: false });
      });
  };

  private handleEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void = event => {
    if (event.key === "Enter") {
      this.handleClick();
    }
  }

  private handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void = event => {
    const fieldValue = event.target.value;
    this.setState({ submissionID: fieldValue });
    if (fieldValue === "") {
      return;
    }
    getPastQueries(fieldValue).then((submissionsInfo) => this.setState({ searchQueries: submissionsInfo }));
  };

  private backToSearch: () => void = () => {
    this.setState({ showIndividualQuery: false });
  };

  private handleDisplayQuery: (submission: SubmissionInfo) => void = submission => {
    this.setState({ showIndividualQuery: true, queryToDisplay: submission });
  };

  private getDHMS: (date: number) => string = date => {
    let duration = '';
    let seconds = Math.ceil((Date.now() - date) / 1000);
    const days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    const hrs = Math.floor(seconds / 3600);
    seconds -= hrs * 3600;
    const mnts = Math.floor(seconds / 60);
    seconds -= mnts * 60;
    if (days) {
      duration = `${days} `;
      duration += days === 1 ? 'day ' : 'days ';
    } else if (hrs) {
      duration = `${hrs} `;
      duration += hrs === 1 ? 'hour ' : 'hours ';
    } else if (mnts) {
      duration = `${mnts} `;
      duration += mnts === 1 ? 'minute ' : 'minutes ';
    } else {
      duration = `${seconds} `;
      duration += seconds === 1 ? 'second ' : 'seconds ';
    }
    return `${duration} ago`;
  }
}
export default Main;
