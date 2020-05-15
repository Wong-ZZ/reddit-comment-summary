import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { PastQueryInfo } from '../searchDisplay/Main';

interface PastQueriesTableProps {
  pastQueries: PastQueryInfo[];
  currentDisplay: number;
  getDHMS: (date: number) => string;
  getPastQuery: (id: number) => void;
}

class PastQueriesTable extends React.Component<PastQueriesTableProps,{}> {
  public constructor(props: PastQueriesTableProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <ListGroup className="sticky-top align-top float-right w-100">
        <ListGroup.Item variant="info">
          Past Queries
        </ListGroup.Item>
        {this.listRows()}
      </ListGroup>
    );
  }

  private listRows: () => JSX.Element[] = () => {
    return this.props.pastQueries.reverse().map((q, index) => {
      let hightlight = false;
      const bgColor = index % 2 === 0 ? "light" : "secondary";
      const date = Date.parse(q.queried_at);
      const DHMS = this.props.getDHMS(date);
      const id = q.id;
      if (q.id === this.props.currentDisplay) hightlight = true;
      return (
        <ListGroup.Item active={hightlight} variant={bgColor} key={index} action={!hightlight} onClick={this.onClick(id)}>
          {`Query ${DHMS}`}
        </ListGroup.Item>
      );
    });
  }

  private onClick: (id: number) => () => void = (id) => {
    return () => this.props.getPastQuery(id);
  }
}
export default PastQueriesTable;