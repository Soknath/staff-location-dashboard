import React from "react";
import { DateRangePicker, DateRange } from "material-react-daterange-picker";

 
class App extends React.Component {
    state = {
        open: false,
        dateRange: {}
    };
    
    render() {
        return (
            <DateRangePicker
                open={this.state.open}
                onChange={range => this.setState({ dateRange: range })}
            />
        );
    }
}
 
export default App;