import { currencyString } from "../../Utility.tsx";
import "./Transaction.css";

/**
 * Component for displaying popups with transaction information.
 * 
 * props	-	All properties passed to the component
 * 	transaction	-	The transaction object containing all information that must be displayed
 * 	unmountMe		- Callback function created by the parent to close the popup.
 */
export function TransactionPopup(props) {
  return (
  	<div className="overlay">
	  	<div className="popup">
	  		<header className="flex-row">
	  			<h1>{ props.transaction ? props.transaction.name : "Unnamed Transaction" }</h1>
	  			<button title="Close transaction details" onClick={ () => props.unmountMe() }>X</button>
	  		</header>
	  		<article className="transaction-info">
	  			<p className="balance xl avengers-orange">{ props.transaction ? currencyString(props.transaction.amount) : "Err" }</p>
	  			<table> { /* -- For later, when we have categories
	  				<thead>
	  					<tr><th>Transaction Category</th><td>{props.transaction ? props.transaction.category : "Uncategorized"}</td></tr>
	  				</thead> */ }
	  				<tbody>
	  					<tr><th>Transaction Type</th><td className="capitalize">{ props.transaction ? props.transaction.transactionType : "Unknown Type" }</td></tr>
	  					<tr><th>Transaction Date</th><td>{ props.transaction ? props.transaction.date : "Unknown Date" }</td></tr>
	  				</tbody>
	  			</table>
	  		</article>
  		</div>
  	</div>
  );
}