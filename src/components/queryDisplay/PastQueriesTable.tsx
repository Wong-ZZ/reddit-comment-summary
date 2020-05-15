import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { PastQueryInfo } from '../searchDisplay/Main';

interface PastQueriesTableProps {
  pastQueries: PastQueryInfo[];
  currentDisplay: number;
  getDHMS: (date: number) => string;
}

class PastQueriesTable extends React.Component<PastQueriesTableProps,{}> {
  public constructor(props: PastQueriesTableProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <ListGroup className="sticky-top align-top float-right w-100">
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
      if (q.id === this.props.currentDisplay) hightlight = true;
      return (
        <ListGroup.Item active={hightlight} variant={bgColor} key={index}>
          {`Query ${DHMS}`}
        </ListGroup.Item>
      );
    });
  }
}
export default PastQueriesTable;