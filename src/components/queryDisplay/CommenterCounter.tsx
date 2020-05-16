import React from 'react';
import { Container, Table } from 'react-bootstrap';

interface CommenterCounterProps {
  commenterCount: object;
}

class CommenterCounter extends React.Component<CommenterCounterProps,{}> {
  public constructor(props: CommenterCounterProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Container>
        <h6>Number of comments by user</h6>
        <p/>
        <Table className="w-50 mx-auto" variant="secondary" striped={true}>
            <thead>
            <tr>
                <th>Username</th>
                <th>Number of comments</th>
            </tr>
            </thead>
            {this.allCommenterCounts()}
        </Table>
      </Container>
    );
  }

  private allCommenterCounts: () => JSX.Element = () => {
    let commenterCountPairs: [string, number][] = Object.entries(this.props.commenterCount);
    commenterCountPairs = commenterCountPairs.sort((x, y) => {
      const count1: number = x[1];
      const count2: number = y[1];
      if (count1 === count2) {
        const username1: string = x[0];
        const username2: string = y[0];
        return username1 > username2 ? 1 : -1;
      } else {
        return count1 > count2 ? -1 : 1;
      }
    });

    const commenterCountRows = commenterCountPairs.map((x, index) => {
      const username = x[0];
      const count = x[1];
      return (
        <tr key={index} className="my-0">
          <td>{`/u/${username}`}</td>
          <td>{count}</td>
        </tr>
      );
    });
    return (
      <tbody>
        {commenterCountRows.slice(0, 20)}
      </tbody>
    );
  }
}
export default CommenterCounter;