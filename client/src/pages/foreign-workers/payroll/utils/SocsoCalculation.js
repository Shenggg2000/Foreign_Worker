export function calculateSocso(basicSalary, isSocsoCategory1) {
  if (isSocsoCategory1) {
    switch (true) {
      case basicSalary <= 30:
        return { employerSocso: 0.4, employeeSocso: 0.1 }
      case basicSalary > 30 && basicSalary <= 50:
        return { employerSocso: 0.7, employeeSocso: 0.2 }
      case basicSalary > 50 && basicSalary <= 70:
        return { employerSocso: 1.1, employeeSocso: 0.3 }
      case basicSalary > 70 && basicSalary <= 100:
        return { employerSocso: 1.5, employeeSocso: 0.4 }
      case basicSalary > 100 && basicSalary <= 140:
        return { employerSocso: 2.1, employeeSocso: 0.6 }
      case basicSalary > 140 && basicSalary <= 200:
        return { employerSocso: 2.95, employeeSocso: 0.85 }
      case basicSalary > 200 && basicSalary <= 300:
        return { employerSocso: 4.35, employeeSocso: 1.25 }
      case basicSalary > 300 && basicSalary <= 400:
        return { employerSocso: 6.15, employeeSocso: 1.75 }
      case basicSalary > 400 && basicSalary <= 500:
        return { employerSocso: 7.85, employeeSocso: 2.25 }
      case basicSalary > 500 && basicSalary <= 600:
        return { employerSocso: 9.65, employeeSocso: 2.75 }
      case basicSalary > 600 && basicSalary <= 700:
        return { employerSocso: 11.35, employeeSocso: 3.25 }
      case basicSalary > 700 && basicSalary <= 800:
        return { employerSocso: 13.15, employeeSocso: 3.75 }
      case basicSalary > 800 && basicSalary <= 900:
        return { employerSocso: 14.85, employeeSocso: 4.25 }
      case basicSalary > 900 && basicSalary <= 1000:
        return { employerSocso: 16.65, employeeSocso: 4.75 }
      case basicSalary > 1000 && basicSalary <= 1100:
        return { employerSocso: 18.35, employeeSocso: 5.25 }
      case basicSalary > 1100 && basicSalary <= 1200:
        return { employerSocso: 20.15, employeeSocso: 5.75 }
      case basicSalary > 1200 && basicSalary <= 1300:
        return { employerSocso: 21.85, employeeSocso: 6.25 }
      case basicSalary > 1300 && basicSalary <= 1400:
        return { employerSocso: 23.65, employeeSocso: 6.75 }
      case basicSalary > 1400 && basicSalary <= 1500:
        return { employerSocso: 25.35, employeeSocso: 7.25 }
      case basicSalary > 1500 && basicSalary <= 1600:
        return { employerSocso: 27.15, employeeSocso: 7.75 }
      case basicSalary > 1600 && basicSalary <= 1700:
        return { employerSocso: 28.85, employeeSocso: 8.25 }
      case basicSalary > 1700 && basicSalary <= 1800:
        return { employerSocso: 30.65, employeeSocso: 8.75 }
      case basicSalary > 1800 && basicSalary <= 1900:
        return { employerSocso: 32.35, employeeSocso: 9.25 }
      case basicSalary > 1900 && basicSalary <= 2000:
        return { employerSocso: 34.15, employeeSocso: 9.75 }
      case basicSalary > 2000 && basicSalary <= 2100:
        return { employerSocso: 35.85, employeeSocso: 10.25 }
      case basicSalary > 2100 && basicSalary <= 2200:
        return { employerSocso: 37.65, employeeSocso: 10.75 }
      case basicSalary > 2200 && basicSalary <= 2300:
        return { employerSocso: 39.35, employeeSocso: 11.25 }
      case basicSalary > 2300 && basicSalary <= 2400:
        return { employerSocso: 41.15, employeeSocso: 11.75 }
      case basicSalary > 2400 && basicSalary <= 2500:
        return { employerSocso: 42.85, employeeSocso: 12.25 }
      case basicSalary > 2500 && basicSalary <= 2600:
        return { employerSocso: 44.65, employeeSocso: 12.75 }
      case basicSalary > 2600 && basicSalary <= 2700:
        return { employerSocso: 46.35, employeeSocso: 13.25 }
      case basicSalary > 2700 && basicSalary <= 2800:
        return { employerSocso: 48.15, employeeSocso: 13.75 }
      case basicSalary > 2800 && basicSalary <= 2900:
        return { employerSocso: 49.85, employeeSocso: 14.25 }
      case basicSalary > 2900 && basicSalary <= 3000:
        return { employerSocso: 51.65, employeeSocso: 14.75 }
      case basicSalary > 3000 && basicSalary <= 3100:
        return { employerSocso: 53.35, employeeSocso: 15.25 }
      case basicSalary > 3100 && basicSalary <= 3200:
        return { employerSocso: 55.15, employeeSocso: 15.75 }
      case basicSalary > 3200 && basicSalary <= 3300:
        return { employerSocso: 56.85, employeeSocso: 16.25 }
      case basicSalary > 3300 && basicSalary <= 3400:
        return { employerSocso: 58.65, employeeSocso: 16.75 }
      case basicSalary > 3400 && basicSalary <= 3500:
        return { employerSocso: 60.35, employeeSocso: 17.25 }
      case basicSalary > 3500 && basicSalary <= 3600:
        return { employerSocso: 62.15, employeeSocso: 17.75 }
      case basicSalary > 3600 && basicSalary <= 3700:
        return { employerSocso: 63.85, employeeSocso: 18.25 }
      case basicSalary > 3700 && basicSalary <= 3800:
        return { employerSocso: 65.65, employeeSocso: 18.75 }
      case basicSalary > 3800 && basicSalary <= 3900:
        return { employerSocso: 67.35, employeeSocso: 19.25 }
      case basicSalary > 3900 && basicSalary <= 4000:
        return { employerSocso: 69.05, employeeSocso: 19.75 }
      case basicSalary > 4000:
        return { employerSocso: 69.05, employeeSocso: 19.75 }
      default:
        return { employerSocso: 0, employeeSocso: 0 };
    }
  } else {
    switch (true) {
      case basicSalary <= 30:
        return { employerSocso: 0.3, employeeSocso: 0 }
      case basicSalary > 30 && basicSalary <= 50:
        return { employerSocso: 0.5, employeeSocso: 0 }
      case basicSalary > 50 && basicSalary <= 70:
        return { employerSocso: 0.8, employeeSocso: 0 }
      case basicSalary > 70 && basicSalary <= 100:
        return { employerSocso: 1.1, employeeSocso: 0 }
      case basicSalary > 100 && basicSalary <= 140:
        return { employerSocso: 1.5, employeeSocso: 0 }
      case basicSalary > 140 && basicSalary <= 200:
        return { employerSocso: 2.1, employeeSocso: 0 }
      case basicSalary > 200 && basicSalary <= 300:
        return { employerSocso: 3.1, employeeSocso: 0 }
      case basicSalary > 300 && basicSalary <= 400:
        return { employerSocso: 4.4, employeeSocso: 0 }
      case basicSalary > 400 && basicSalary <= 500:
        return { employerSocso: 5.6, employeeSocso: 0 }
      case basicSalary > 500 && basicSalary <= 600:
        return { employerSocso: 6.9, employeeSocso: 0 }
      case basicSalary > 600 && basicSalary <= 700:
        return { employerSocso: 8.1, employeeSocso: 0 }
      case basicSalary > 700 && basicSalary <= 800:
        return { employerSocso: 9.4, employeeSocso: 0 }
      case basicSalary > 800 && basicSalary <= 900:
        return { employerSocso: 10.6, employeeSocso: 0 }
      case basicSalary > 900 && basicSalary <= 1000:
        return { employerSocso: 11.9, employeeSocso: 0 }
      case basicSalary > 1000 && basicSalary <= 1100:
        return { employerSocso: 13.1, employeeSocso: 0 }
      case basicSalary > 1100 && basicSalary <= 1200:
        return { employerSocso: 14.4, employeeSocso: 0 }
      case basicSalary > 1200 && basicSalary <= 1300:
        return { employerSocso: 15.6, employeeSocso: 0 }
      case basicSalary > 1300 && basicSalary <= 1400:
        return { employerSocso: 16.9, employeeSocso: 0 }
      case basicSalary > 1400 && basicSalary <= 1500:
        return { employerSocso: 18.1, employeeSocso: 0 }
      case basicSalary > 1500 && basicSalary <= 1600:
        return { employerSocso: 19.4, employeeSocso: 0 }
      case basicSalary > 1600 && basicSalary <= 1700:
        return { employerSocso: 20.6, employeeSocso: 0 }
      case basicSalary > 1700 && basicSalary <= 1800:
        return { employerSocso: 21.9, employeeSocso: 0 }
      case basicSalary > 1800 && basicSalary <= 1900:
        return { employerSocso: 23.1, employeeSocso: 0 }
      case basicSalary > 1900 && basicSalary <= 2000:
        return { employerSocso: 24.4, employeeSocso: 0 }
      case basicSalary > 2000 && basicSalary <= 2100:
        return { employerSocso: 25.6, employeeSocso: 0 }
      case basicSalary > 2100 && basicSalary <= 2200:
        return { employerSocso: 26.9, employeeSocso: 0 }
      case basicSalary > 2200 && basicSalary <= 2300:
        return { employerSocso: 28.1, employeeSocso: 0 }
      case basicSalary > 2300 && basicSalary <= 2400:
        return { employerSocso: 29.4, employeeSocso: 0 }
      case basicSalary > 2400 && basicSalary <= 2500:
        return { employerSocso: 30.6, employeeSocso: 0 }
      case basicSalary > 2500 && basicSalary <= 2600:
        return { employerSocso: 31.9, employeeSocso: 0 }
      case basicSalary > 2600 && basicSalary <= 2700:
        return { employerSocso: 33.1, employeeSocso: 0 }
      case basicSalary > 2700 && basicSalary <= 2800:
        return { employerSocso: 34.4, employeeSocso: 0 }
      case basicSalary > 2800 && basicSalary <= 2900:
        return { employerSocso: 35.6, employeeSocso: 0 }
      case basicSalary > 2900 && basicSalary <= 3000:
        return { employerSocso: 36.9, employeeSocso: 0 }
      case basicSalary > 3000 && basicSalary <= 3100:
        return { employerSocso: 38.1, employeeSocso: 0 }
      case basicSalary > 3100 && basicSalary <= 3200:
        return { employerSocso: 39.4, employeeSocso: 0 }
      case basicSalary > 3200 && basicSalary <= 3300:
        return { employerSocso: 40.6, employeeSocso: 0 }
      case basicSalary > 3300 && basicSalary <= 3400:
        return { employerSocso: 41.9, employeeSocso: 0 }
      case basicSalary > 3400 && basicSalary <= 3500:
        return { employerSocso: 43.1, employeeSocso: 0 }
      case basicSalary > 3500 && basicSalary <= 3600:
        return { employerSocso: 44.4, employeeSocso: 0 }
      case basicSalary > 3600 && basicSalary <= 3700:
        return { employerSocso: 45.6, employeeSocso: 0 }
      case basicSalary > 3700 && basicSalary <= 3800:
        return { employerSocso: 46.9, employeeSocso: 0 }
      case basicSalary > 3800 && basicSalary <= 3900:
        return { employerSocso: 48.1, employeeSocso: 0 }
      case basicSalary > 3900 && basicSalary <= 4000:
        return { employerSocso: 49.4, employeeSocso: 0 }
      case basicSalary > 4000:
        return { employerSocso: 49.4, employeeSocso: 0 }
      default:
        return { employerSocso: 0, employeeSocso: 0 };
    }
  }
}