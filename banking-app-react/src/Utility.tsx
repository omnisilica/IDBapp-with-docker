const currencyFormat = new Intl.NumberFormat("en-CA", {
	style: "currency",
	currency: "CAD",
	maximumFractionDigits: 2,
});

export function currencyString(value: number) :string {
	return currencyFormat.format(value);
}

export function censorAccountNumber(num: number) :string {
  return "* * * " + num.toString().substring(12,16);
}

export function getToken() {
  const tokenJson = localStorage.getItem("token");
  return tokenJson || "";
}

export function dateString(date: Date) :string {
	return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
}

export function accountTypeToString(accountType: String) :string {
    if(accountType == "savings")
        return "Savings Account";
    else if(accountType == "chequing")
        return "Chequing Account";
    else if(accountType == "business")
        return "Business Account";
    else
        return "Banking Account";

}

export function phoneNumberToString(phoneNumber: string) :string {
    if(phoneNumber.length == 12) {
        return `(${phoneNumber.substring(2, 5)}) ${phoneNumber.substring(5, 8)}-${phoneNumber.substring(8, 12)}`;
    } else if (phoneNumber.length == 11) {
        return `(${phoneNumber.substring(1, 4)}) ${phoneNumber.substring(4, 7)}-${phoneNumber.substring(7, 11)}`;
    } else if(phoneNumber.length == 10) {
        return `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6, 10)}`;
    }
    return phoneNumber;
}
