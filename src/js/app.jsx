import React from 'react';
// import '../css/style.less';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: null,
      rate: null,
      term: 15,
      output: null
    };
    this.handleBalance = this.handleBalance.bind(this);
    this.handleRate = this.handleRate.bind(this);
    this.handleTerm = this.handleTerm.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleBalance(e) {
    this.setState({
      balance: e.target.value
    });
  }

  handleRate(e) {
    this.setState({
      rate: e.target.value
    });
  }

  handleTerm(e) {
    this.setState({
      term: e.target.value
    });
  }

  handleClick() {
    const b = this.state.balance;
    const r = (this.state.rate * 0.01) / 12;
    const t = (this.state.term * 12);

    const numerator = (Math.pow(1 + r, t)) * r;
    const denominator = (Math.pow(1 + r, t)) - 1;
    const monthlyPayment = ((numerator / denominator) * b).toFixed(2);
    this.setState({
      output: monthlyPayment
    });
  }

  render() {
    return (
      <div className='container'>
        <h1>Mortgage Calculator</h1>
        <input
          name='balance'
          value={ this.state.balance }
          type='number' placeholder='0'
          onChange={ this.handleBalance }
        />
        <input
          name='rate'
          value={ this.state.rate }
          type='number' step='0.01'
          placeholder='0'
          onChange={ this.handleRate }
        />
        <select
          name='term'
          value={ this.state.term }
          onChange={ this.handleTerm }
        >
          <option value={ 15 }>15</option>
          <option value={ 30 }>30</option>
        </select>
        <button name='submit' onClick={ this.handleClick } >Submit</button>
        <div name='output' id='output'>{`$${this.state.output} is your amount due this month.`}</div>
      </div>
    );
  }
}
