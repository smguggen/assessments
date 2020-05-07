import axios from 'axios';
const DATE_JSON_URL = 'https://jsonmock.hackerrank.com/datetime';

export default {
    getAPIResponse() {
        return axios.get(DATE_JSON_URL);
    }
};
/**    getAPIResponse() {
        let res = axios.get(DATE_JSON_URL);
        let date = new Date(res.data.date);
        let [day, month, year] = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
        let result = `Date APIDisplay DateDay: ${day}Month: ${month}Year: ${year}`;
        console.log(result);
    }
    */