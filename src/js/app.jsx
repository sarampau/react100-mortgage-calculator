import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: '',
      rate: '',
      term: '',
      output: '',
      table: []
    };
    this.handleBalance = this.handleBalance.bind(this);
    this.handleRate = this.handleRate.bind(this);
    this.handleTerm = this.handleTerm.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleTable = this.handleTable.bind(this);
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

  handleTable() {
    let b = this.state.balance;
    const r = (this.state.rate * 0.01) / 12;
    const t = (this.state.term * 12);

    const numerator = (Math.pow(1 + r, t)) * r;
    const denominator = (Math.pow(1 + r, t)) - 1;
    let monthlyPayment = ((numerator / denominator) * b).toFixed(2);

    let table = this.state.table;
    table = [];

    for (let i = 1; i <= t; i++) {
      b = b - monthlyPayment;
      table.push([i, parseFloat(monthlyPayment).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','), parseFloat(b).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")]);
      monthlyPayment = (numerator / denominator) * b;
    }

    this.setState({
      table
    });
  }

  render() {
    const table = this.state.table;

    return (
      <div className='container'>
        <h1>Mortgage Calculator</h1>
        <div id='box'>
          <div id='form'>
            <input
              id='balance'
              name='balance'
              value={ this.state.balance }
              type='number'
              placeholder='balance'
              onChange={ this.handleBalance }
            />
            <input
              id='rate'
              name='rate'
              value={ this.state.rate }
              type='number' step='0.01'
              placeholder='rate%'
              onChange={ this.handleRate }
            />
            <select
              id='select'
              name='term'
              value={ this.state.term }
              onChange={ this.handleTerm }
            >
              <option value='' disabled='disabled'>term</option>
              <option value={ 15 }>15</option>
              <option value={ 30 }>30</option>
            </select>
            <button
              id='submit'
              name='submit'
              onClick={ () => { this.handleClick(); this.handleTable(); } }
            >Submit
            </button>
            <div
              id='output-container'
              name='output-container'
            >
              <div id='output'>
                <p>Your amount due this month</p>
                <p id='amount'>{`$${this.state.output}`}</p>
              </div>
            </div>
          </div>
          <table>
            <tr>
              <th>Payment</th>
              <th>Amount Due</th>
              <th>Remaining Balance</th>
            </tr>
            {
                table.map(i =>
                  <tr>
                    <td>{i[0]}</td>
                    <td>{`$${i[1]}`}</td>
                    <td>{`$${i[2]}`}</td>
                  </tr>
                )
              }
          </table>
        </div>
      </div>
    );
  }
}
