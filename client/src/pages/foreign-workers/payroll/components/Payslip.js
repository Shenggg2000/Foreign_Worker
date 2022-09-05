import React from 'react';
import { PDFViewer, Page, Text, Image, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  pdf: {
    width: "100%",
    height: "75vh",
  },
  doc: {
    width: "100%",
    height: "70vh",
  },
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  company: {
    marginTop: 40,
    width: "90%",
    alignItems: "center",
    flexDirection: "row"
  },
  companyLogo: {
    width: 100,
    height: 100,
    top: 0,
    left: 0,
  },
  companyText: {
    marginLeft: 20,
    flexGrow: 2,
  },
  companyName: {
    fontSize: 22,
    fontWeight: 600,
    marginBottom: 10,
  },
  companyAddress: {
    fontSize: 12,
  },
  payslipTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
  },
  employee: {
    marginTop: 20,
    width: "90%",
    borderColor: "#333",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 10,
    paddingBottom: 5,
  },
  textRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  textLabel: {
    flexGrow: 2,
    fontSize: 12,
    fontWeight: "bold",
  },
  textValue: {
    fontSize: 12,
    textAlign: "right"
  },
  earnDeductRow1: {
    marginTop: 20,
    flexDirection: "row",
    width: "90%",
    borderColor: "#333",
    borderWidth: 1,
    borderStyle: "solid",
  },
  earnDeductRow: {
    flexDirection: "row",
    width: "90%",
    borderColor: "#333",
    borderWidth: 1,
    borderStyle: "solid",
    borderTopWidth: 0
  },
  earnings: {
    flex: 1,
    padding: 10,
    paddingBottom: 5,
  },
  deductions: {
    flex: 1,
    padding: 10,
    paddingBottom: 5,
    borderLeftColor: "#333",
    borderLeftWidth: 1,
    borderLeftStyle: "solid",
  },
  netpayContainer: {
    marginTop: 20,
  },
  netpay: {
    fontSize: 12,
    textAlign: "left"
  },
  employer1: {
    marginTop: 20,
    width: "90%",
    borderColor: "#333",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 10,
    paddingBottom: 5,
    borderBottom: 0,
  },
  employer: {
    width: "90%",
    borderColor: "#333",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 10,
    paddingBottom: 5,
  },
});

// Create Document Component
const Payslip = (props) => {
  const { emp: employee, company, month, year } = props;

  const stateAbrToName = (abr) => {
    console.log(abr);
    switch (abr) {
      case "JHR":
        return "Johor"
      case "KDH":
        return "Kedah"
      case "KTN":
        return "Kelantan"
      case "MLK":
        return "Melaka"
      case "NSN":
        return "Negeri Sembilan"
      case "PHG":
        return "Pahang"
      case "PNG":
        return "Pulau Penang"
      case "PRK":
        return "Perak"
      case "PLS":
        return "Perlis"
      case "SBH":
        return "Sabah"
      case "SWK":
        return "Sarawal"
      case "SGR":
        return "Selangor"
      case "TRG":
        return "Terrenganu"
      case "KUL":
        return "Kuala Lumpur"
      case "LBN":
        return "Labuan"
      case "PJY":
        return "Putrajaya"
      default:
        return ""
    }
  }

  const detectIsNull = (str) => {
    if (!str) {
      return "";
    } else if (str === "null" || str === "NULL") {
      return "";
    }
    return str;
  }

  return (
    <PDFViewer style={styles.pdf}>
      <Document style={styles.doc}>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <View style={styles.company}>
              <Image src={() => "http://localhost:3001/uploads/c432351f04d3019b3a5a5140140268731662039541889.png"} style={styles.companyLogo} />
              <View style={styles.companyText}>
                <Text style={styles.companyName}>{company.employer_name}</Text>
                <Text style={styles.companyAddress}>
                  {company.address_street},
                </Text>
                <Text style={styles.companyAddress}>
                  {company.address_post_code},
                  {company.address_city},
                  {stateAbrToName(company.address_state)}.
                </Text>
                <Text style={styles.payslipTitle}>Payslip For the month of {month}, {year}</Text>
              </View>
            </View>
            <View style={styles.employee}>
              <View style={styles.textRow}>
                <Text style={styles.textLabel}>Name:</Text>
                <Text style={styles.textValue}>{employee.empName}</Text>
              </View>
              <View style={styles.textRow}>
                <Text style={styles.textLabel}>IC/Passport Number:</Text>
                <Text style={styles.textValue}>{detectIsNull(employee.ic) == "" ? employee.passport : employee.ic}</Text>
              </View>
              <View style={styles.textRow}>
                <Text style={styles.textLabel}>Contact Number:</Text>
                <Text style={styles.textValue}>{employee.contact_no}</Text>
              </View>
            </View>
            <View style={styles.earnDeductRow1}>
              <View style={styles.earnings}>
                <View style={styles.textRow}>
                  <Text style={styles.textLabel}>Earnings</Text>
                  <Text style={styles.textValue}>Amount</Text>
                </View>
              </View>
              <View style={styles.deductions}>
                <View style={styles.textRow}>
                  <Text style={styles.textLabel}>Deductions</Text>
                  <Text style={styles.textValue}>Amount</Text>
                </View>
              </View>
            </View>
            <View style={styles.earnDeductRow}>
              <View style={styles.earnings}>
                <View style={styles.textRow}>
                  <Text style={styles.textLabel}>Basic Salary (Monthly):</Text>
                  <Text style={styles.textValue}>RM {employee.basicSalary == 0 ? 0 : Number(employee.basicSalary).toFixed(2)}</Text>
                </View>
                {
                  employee.compensation.items.map((item) => {
                    return (
                      <View key={item.name} style={styles.textRow}>
                        <Text style={styles.textLabel}>{item.name}:</Text>
                        <Text style={styles.textValue}>RM {item.amount == 0 ? 0 : Number(item.amount).toFixed(2)}</Text>
                      </View>
                    )
                  })
                }
              </View>
              <View style={styles.deductions}>
                {
                  employee.deduction.items.map((item) => {
                    return (
                      <View key={item.name} style={styles.textRow}>
                        <Text style={styles.textLabel}>{item.name}:</Text>
                        <Text style={styles.textValue}>RM {item.amount == 0 ? 0 : Number(item.amount).toFixed(2)}</Text>
                      </View>
                    )
                  })
                }
                {
                  employee.contribution.items.map((item) => {
                    if(item.amount){
                      return (
                        <View key={item.name} style={styles.textRow}>
                          <Text style={styles.textLabel}>{item.name}:</Text>
                          <Text style={styles.textValue}>RM {item.amount == 0 ? 0 : Number(item.amount).toFixed(2)}</Text>
                        </View>
                      )
                    }
                  })
                }
              </View>
            </View>
            <View style={styles.earnDeductRow}>
              <View style={styles.earnings}>
                <View style={styles.textRow}>
                  <Text style={styles.textLabel}>Total Earnings</Text>
                  <Text style={styles.textValue}>RM {employee.compensation.totalAmount + employee.basicSalary == 0 ? 0 : Number(employee.compensation.totalAmount + employee.basicSalary).toFixed(2)}</Text>
                </View>
              </View>
              <View style={styles.deductions}>
                <View style={styles.textRow}>
                  <Text style={styles.textLabel}>Total Deductions</Text>
                  <Text style={styles.textValue}>RM {employee.deduction.totalAmount + employee.contribution.totalAmount == 0 ? 0 : Number(employee.deduction.totalAmount + employee.contribution.totalAmount).toFixed(2)}</Text>
                </View>
              </View>
            </View>
            <View style={styles.netpayContainer}>
              <Text style={styles.netpay}>Net Salary for the month: RM {employee.netSalary == 0 ? 0 : Number(employee.netSalary).toFixed(2)}</Text>
            </View>
            <View style={styles.employer1}>
              <View style={styles.textRow}>
                <Text style={styles.textLabel}>Employer Contribution</Text>
                <Text style={styles.textValue}>Amount</Text>
              </View>
            </View>
            <View style={styles.employer}>
              {
                employee.employerCost.items.map((item) => {
                  return (
                    <View key={item.name} style={styles.textRow}>
                      <Text style={styles.textLabel}>{item.name}:</Text>
                      <Text style={styles.textValue}>RM {item.amount == 0 ? 0 : Number(item.amount).toFixed(2)}</Text>
                    </View>
                  )
                })
              }
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}


export { Payslip };