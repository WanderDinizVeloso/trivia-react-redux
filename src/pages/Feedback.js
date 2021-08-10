import React from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Button from '../components/Button';

const ASSERTION_AVERAGE = 3;

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.handleRanking = this.handleRanking.bind(this);
    this.handleClickRanking = this.handleClickRanking.bind(this);

    this.state = {
      redirectRanking: false,
    };
  }

  componentDidMount() {
    this.handleRanking();
  }

  handleClickRanking() {
    this.setState((state) => ({
      ...state,
      redirectRanking: true,
    }));
  }

  handleRanking() {
    const storedRank = localStorage.getItem('ranking');
    const state = JSON.parse(localStorage.getItem('state'));
    const { player: { name, score, gravatarEmail } } = state;
    if (!storedRank) {
      const updateRank = [{
        name,
        score,
        picture: gravatarEmail,
      }];
      localStorage.setItem('ranking', JSON.stringify(updateRank));
    } else {
      const ranking = JSON.parse(storedRank);
      const updateRank = [...ranking, {
        name,
        score,
        picture: gravatarEmail,
      }];
      localStorage.setItem('ranking', JSON.stringify(updateRank));
    }
  }

  render() {
    const { handleClickRanking, state: { redirectRanking } } = this;
    const stateLocalStorage = JSON.parse(localStorage.getItem('state'));
    const { player: { score, assertions } } = stateLocalStorage;

    return (
      <>
        { redirectRanking && <Redirect to="/ranking" />}
        <Header score={ score } />
        <Button
          name="Ver Ranking"
          testId="btn-ranking"
          handleClick={ handleClickRanking }
        />
        <h2 data-testid="feedback-text">
          {
            (assertions < ASSERTION_AVERAGE ? 'Podia ser melhor...' : 'Mandou bem!')
          }
        </h2>
        <p data-testid="feedback-total-score">
          {score}
        </p>
        <p data-testid="feedback-total-question">
          {assertions}
        </p>
      </>
    );
  }
}

export default Feedback;
