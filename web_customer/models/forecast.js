
class ForecastInfo {
    constructor(data) {
        this.fdata = data;
    }

    getHealth() {
        return `:) @' + ${this.fdata} `;
    }
}

module.exports = ForecastInfo;
