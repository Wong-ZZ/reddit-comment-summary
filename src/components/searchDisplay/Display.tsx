import React from 'react';
import { SubmissionInfo } from './Main';
import IndividualCard from './IndividualCard';
import { Card, CardDeck } from 'react-bootstrap';

interface DisplayProps {
  queries: SubmissionInfo[];
  handleDisplayQuery: (s: SubmissionInfo) => void;
  getDHMS: (date: number) => string;
}

class Display extends React.Component<DisplayProps, {}> {
  public constructor(props: DisplayProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <CardRows
        queries={this.props.queries}
        handleDisplayQuery={this.props.handleDisplayQuery}
        getDHMS={this.props.getDHMS}
      />
    );
  }
}

const CardRows: React.FC<DisplayProps> = (props: DisplayProps) => {
  const allCards = props.queries.map((query, index) => (
    <IndividualCard
      handleDisplayQuery={props.handleDisplayQuery}
      query={query}
      index={index.toString()}
      key={index}
      getDHMS={props.getDHMS}
    />
  ));
  const rowSize = 4;
  const allRows: JSX.Element[][] = [];
  const numRows = Math.ceil(allCards.length / rowSize);
  for (let i = 0; i < numRows; i++) {
    const start = i * rowSize;
    const end = start + rowSize;
    allRows[i] = allCards.slice(start, end);
    const rowLen = allRows[i].length;
    if (rowLen < rowSize) {
      for (let j = 0; j < rowSize - rowLen; j++) {
        allRows[i].push(<Card className="border-white" body={false} key={'padding' + j} />);
      }
    }
  }
  return (
    <div className="px-5">
      {allRows.map((row, index) => (
        <CardDeck className="py-3" key={index}>
          {row}
        </CardDeck>
      ))}
    </div>
  );
};

export default Display;
