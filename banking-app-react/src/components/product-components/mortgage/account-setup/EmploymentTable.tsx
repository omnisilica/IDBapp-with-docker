import "./EmploymentTable.css"

const EmploymentTable = (props:any) => {
	const editEmployment= (employment:any) => {
		props.viewEditMode(employment);
	}

	const deleteEmployment= (employment:any) => {
		props.onDeleteEmployment(employment);
	}

	return <>
		<table className="table employment-table">
			<thead>
				<tr>
					<th scope="col"> Industry                </th>
					<th scope="col"> Occupation              </th>
					<th scope="col"> Industry <br/> years    </th>
					<th scope="col"> Employment <br/> type   </th>
					<th scope="col"> Employer <br/> name     </th>
					<th scope="col"> Time                    </th>
					<th scope="col"> Current <br/> workplace </th>
					<th scope="col"> Employer <br/> address  </th>
					<th scope="col"> Actions                 </th>
				</tr>
			</thead>
			<tbody>
				{props.employmentList.map((employment:any, index: number) => {
					return <tr key={index}>
						<td>{ employment.employmentIndustry }</td>
						<td>{ employment.occupation         }</td>
						<td>{ employment.yearsInIndustry    }</td>
						<td>{ employment.employmentType     }</td>
						<td>{ employment.employerName       }</td>
						<td>
							{ employment.employmentYears } year(s)
							<br/>
							{ employment.employmentMonths } month
						</td>
						<td>{ employment.isCurrentWorkplace? 'Yes' : 'No' }</td>
						<td>
							{ employment.employerUnit? 'Unit ' + employment.employerUnit + ', ' : ''} 
							{ employment.employerStreetNumber } { employment.employerStreetName } <br/>
							{ employment.employerCity },
							{ employment.employerProvince } { employment.employerCountry },
							{ employment.employerPostalCode }
						</td>
						<td>
							<button type="button" className="rounded-button mr-2" onClick={()=>editEmployment(employment)}>Edit</button>
							<button type="button" className="rounded-button" onClick={()=>deleteEmployment(employment.id)}>X</button>
						</td>
					</tr>
				})}
			</tbody>
		</table>
	</>
}

export default EmploymentTable;
