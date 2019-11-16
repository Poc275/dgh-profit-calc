import React, { Component } from 'react';

class ProfitForm extends Component {
    state = {
        originalPrice: 0,
        agreedPrice: 0,
        boxCost: 0,
        importTax: 0,
        boxPacking: 0,
        boxPostage: 0,
        vat: 0,
        paypal: 0,
        totalCost: 0,
        profit: 0,
        profitPercentage: 0,
        profitIndicator: '😐'
    };

    onOriginalPriceChanged = (e) => {
        this.setState({
            originalPrice: e.target.value,
            importTax: (e.target.value * 0.2).toFixed(2)
        }, () => {
            this.calculateTotalCost();
        });
    }

    onAgreedPriceChanged = (e) => {
        this.setState({
            agreedPrice: e.target.value,
            vat: (e.target.value * 0.16666).toFixed(2),
            paypal: (e.target.value * 0.034 + 0.2).toFixed(2)
        }, () => {
            this.calculateTotalCost();
        });
    }

    onBoxSizeChange = (e) => {
        let boxPacking = 0;
        let boxPostage = 0;
        let boxCost = 0;

        switch(e.target.value) {
            case 'small':
                boxPacking = 0.2;
                boxPostage = 2;
                boxCost = 1;
                break;

            case 'medium':
                boxPacking = 0.5;
                boxPostage = 3.5;
                boxCost = 2.5;
                break;

            case 'large':
                boxPacking = 1;
                boxPostage = 5;
                boxCost = 3.5;
                break;

            default:
                boxPacking = 0;
                boxPostage = 0;
                boxCost = 0;
        }

        this.setState({
            boxPacking: boxPacking.toFixed(2),
            boxPostage: boxPostage.toFixed(2),
            boxCost: boxCost
        }, () => {
            this.calculateTotalCost();
        });
    };

    calculateTotalCost = () => {
        const totalCost = (parseFloat(this.state.vat) + parseFloat(this.state.paypal) + parseFloat(this.state.boxPostage) + 
            parseFloat(this.state.boxPacking) + parseFloat(this.state.boxCost) + parseFloat(this.state.originalPrice) + 
            parseFloat(this.state.importTax));

        const profit = this.state.agreedPrice - totalCost;
        const profitPercentage = (this.state.agreedPrice - totalCost) / totalCost * 100;

        let profitIndicator = '😐';
        if(profitPercentage < -50) {
            profitIndicator = '😬';
        } else if(profitPercentage < 0) {
            profitIndicator = '🙁';
        } else if(profitPercentage < 10) {
            profitIndicator = '🙂';
        } else if(profitPercentage < 25) {
            profitIndicator = '😎';
        } else {
            profitIndicator = '🤑';
        }

        this.setState({
            totalCost: totalCost.toFixed(2),
            profit: profit.toFixed(2),
            profitPercentage: Math.round(profitPercentage),
            profitIndicator: profitIndicator
        });
    }

    render() {
        return (
            <form>
                <datalist id="defaultPrices">
                    <option value="1" />
                    <option value="2" />
                    <option value="3" />
                    <option value="4" />
                    <option value="5" />
                    <option value="6" />
                    <option value="7" />
                    <option value="8" />
                    <option value="9" />
                    <option value="10" />
                </datalist>

                {/* 1. Enter item/ship price */}
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="originalPrice">1. Enter Item/Ship Price</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">£</span>
                                </div>
                                <input type="number" className="form-control" id="originalPrice" min="0" placeholder="Item/Ship Price" list="defaultPrices" 
                                    value={this.state.originalPrice} onChange={this.onOriginalPriceChanged} />
                            </div>
                        </div>
                    </div>

                    {/* 2. Enter box size */}
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="box-sizes">2. Pick a Box Size</label>
                            <select className="form-control" name="box-sizes" id="box-sizes" onChange={this.onBoxSizeChange}>
                                <option value="">Box size</option>
                                <option value="small">Small box (£1)</option>
                                <option value="medium">Medium box (£2.50)</option>
                                <option value="large">Large box (£3.50)</option>
                            </select>
                        </div>
                    </div>

                    {/* 3. Enter agreed price */}
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="agreed-price">3. Enter Agreed Price</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">£</span>
                                </div>
                                <input type="number" className="form-control" id="agreed-price" min="0" placeholder="Agreed price" list="defaultPrices" 
                                    value={this.state.agreedPrice} onChange={this.onAgreedPriceChanged} />
                            </div>
                        </div>
                    </div>
                </div>


                <hr />

                <div className="row">
                    <div className="col">
                        {/* Import tax */}
                        <div className="form-group">
                            <label htmlFor="import-tax">Import Tax</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">£</span>
                                </div>
                                <input type="number" readOnly className="form-control" id="import-tax" value={this.state.importTax} />
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        {/* Box postage */}
                        <div className="form-group">
                            <label htmlFor="box-postage">Box Postage</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">£</span>
                                </div>
                                <input type="number" readOnly className="form-control" id="box-postage" value={this.state.boxPostage} />
                            </div>
                        </div>

                        {/* Box packing */}
                        <div className="form-group">
                            <label htmlFor="box-packing">Box Packing</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">£</span>
                                </div>
                                <input type="number" readOnly className="form-control" id="box-packing" value={this.state.boxPacking} />
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        {/* VAT */}
                        <div className="form-group">
                            <label htmlFor="vat">VAT</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">£</span>
                                </div>
                                <input type="number" readOnly className="form-control" id="vat" value={this.state.vat} />
                            </div>
                        </div>

                        {/* PayPal */}
                        <div className="form-group">
                            <label htmlFor="paypal">PayPal</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">£</span>
                                </div>
                                <input type="number" readOnly className="form-control" id="paypal" value={this.state.paypal} />
                            </div>
                        </div>
                    </div>
                </div>

                <hr />

                <div className="row justify-content-center">
                    <div className="col-sm-6">
                        {/* Total costs */}
                        <div className="form-group">
                            <label htmlFor="total-costs">Total Costs</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">£</span>
                                </div>
                                <input type="number" readOnly className="form-control" id="total-costs" value={this.state.totalCost} />
                            </div>
                        </div>

                        {/* Profit */}
                        <div className="form-group">
                            <label htmlFor="profit">Profit</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">£</span>
                                </div>
                                <input type="number" readOnly className="form-control" id="profit" value={this.state.profit} />
                            </div>
                            <span className="profit-percentage">{this.state.profitPercentage}% Profit {this.state.profitIndicator}</span>
                        </div>
                    </div>
                </div>

            </form>
        );
    }
}

export default ProfitForm;