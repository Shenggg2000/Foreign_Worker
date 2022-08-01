export function calculateEis(basicSalary) {
  switch (true) {
    case basicSalary > 1000 && basicSalary <= 1100:
      return 2.1
    case basicSalary > 1100 && basicSalary <= 1200:
      return 2.3
    case basicSalary > 1200 && basicSalary <= 1300:
      return 2.5
    case basicSalary > 1300 && basicSalary <= 1400:
      return 2.7
    case basicSalary > 1400 && basicSalary <= 1500:
      return 2.9
    case basicSalary > 1500 && basicSalary <= 1600:
      return 3.1
    case basicSalary > 1600 && basicSalary <= 1700:
      return 3.3
    case basicSalary > 1700 && basicSalary <= 1800:
      return 3.5
    case basicSalary > 1800 && basicSalary <= 1900:
      return 3.7
    case basicSalary > 1900 && basicSalary <= 2000:
      return 3.9
    case basicSalary > 2000 && basicSalary <= 2100:
      return 4.1
    case basicSalary > 2100 && basicSalary <= 2200:
      return 4.3
    case basicSalary > 2200 && basicSalary <= 2300:
      return 4.5
    case basicSalary > 2300 && basicSalary <= 2400:
      return 4.7
    case basicSalary > 2400 && basicSalary <= 2500:
      return 4.9
    case basicSalary > 2500 && basicSalary <= 2600:
      return 5.1
    case basicSalary > 2600 && basicSalary <= 2700:
      return 5.3
    case basicSalary > 2700 && basicSalary <= 2800:
      return 5.5
    case basicSalary > 2800 && basicSalary <= 2900:
      return 5.7
    case basicSalary > 2900 && basicSalary <= 3000:
      return 5.9
    case basicSalary > 3000 && basicSalary <= 3100:
      return 6.1
    case basicSalary > 3100 && basicSalary <= 3200:
      return 6.3
    case basicSalary > 3200 && basicSalary <= 3300:
      return 6.5
    case basicSalary > 3300 && basicSalary <= 3400:
      return 6.7
    case basicSalary > 3400 && basicSalary <= 3500:
      return 6.9
    case basicSalary > 3500 && basicSalary <= 3600:
      return 7.1
    case basicSalary > 3600 && basicSalary <= 3700:
      return 7.3
    case basicSalary > 3700 && basicSalary <= 3800:
      return 7.5
    case basicSalary > 3800 && basicSalary <= 3900:
      return 7.7
    case basicSalary > 3900 && basicSalary <= 4000:
      return 7.9
    case basicSalary > 4000:
      return 7.9
    default:
      return 0;
  }
}