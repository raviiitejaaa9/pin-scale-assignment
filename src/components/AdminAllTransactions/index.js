import {Component} from "react" 

class AdminAllTransactions extends Component {
    state = {
        allTransactions : [],
    }Ì

    async componentDidMount() {
        console.log("component mounted")

        const adminApiTransactionsUrl = ""
    }

    render(){
        const {allTransactions} = this.state 

        return(
            <div className = "admin-all-transactions-sec">
                 <h1> All Transactions </h1>
            </div>
        )
    }

}